export function clone(x){return JSON.parse(JSON.stringify(x))}

export function parseKeys(text){const s=text.trim();if(!s)return [];const a=s.split(/[\s,;]+/);if(a.length>120||a.some(x=>!/^[-+]?\d+$/.test(x)||!Number.isSafeInteger(Number(x))||Math.abs(Number(x))>999999))throw Error("Enter at most 120 integers from −999999 to 999999.");return a.map(Number)}

export function seeded(n,seed=42){let s=seed>>>0;const a=Array.from({length:n},(_,i)=>i+1);for(let i=n-1;i>0;i--){s=(Math.imul(s,1664525)+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}

export function createTree(t){if(!Number.isInteger(t)||t<2||t>32)throw Error("Minimum degree must be 2–32.");return {t,root:null,next:1,size:0,splits:0,moves:0}}

export function search(tree,key,mode="binary",capture=true){let n=tree.root,comparisons=0;const path=[],frames=[];while(n){path.push(n.id);let i=0;if(mode==="linear"){while(i<n.keys.length){comparisons++;if(n.keys[i]>=key)break;i++}}else{let hi=n.keys.length;while(i<hi){const mid=(i+hi)>>1;comparisons++;if(n.keys[mid]<key)i=mid+1;else hi=mid}}
let found=false;if(i<n.keys.length){comparisons++;found=n.keys[i]===key}if(capture)frames.push({root:clone(tree.root),active:n.id,slot:i,visits:path.length,comparisons,message:`Inspect [${n.keys.join(" | ")}]: ${found?"exact match; stop":n.children.length?"follow child "+i+" (zero-based)":"leaf reached; absent"}.`});if(found)return {found,path,comparisons,frames};n=n.children[i]}return {found:false,path,comparisons,frames}}

export function insert(tree,key,capture=true){if(!Number.isSafeInteger(key))throw Error("Integer key required.");const frames=[];const snap=(message,active=null,slot=null)=>{if(capture)frames.push({root:clone(tree.root),active,slot,message,splits:tree.splits,moves:tree.moves})};
snap("Request insert "+key+". Check membership before mutation.");if(search(tree,key,"binary",false).found){snap("Duplicate: no changes to keys, size or shape.");return {inserted:false,frames}}
const t=tree.t,newNode=()=>({id:tree.next++,keys:[],children:[]});if(!tree.root){tree.root=newNode()}
function split(parent,i){const left=parent.children[i],right=newNode(),median=left.keys[t-1];snap(`Full child [${left.keys.join(" | ")}]. Predict median at index ${t-1}.`,left.id,t-1);right.keys=left.keys.slice(t);left.keys=left.keys.slice(0,t-1);if(left.children.length){right.children=left.children.splice(t);tree.moves+=right.children.length}tree.moves+=right.keys.length+1+(parent.keys.length-i)+(parent.children.length-i-1);parent.keys.splice(i,0,median);parent.children.splice(i+1,0,right);tree.splits++;snap(`Promote ${median}; left and right retain ${t-1} keys${right.children.length?"; each retains "+t+" children":""}.`,parent.id,i)}
if(tree.root.keys.length===2*t-1){const old=tree.root;tree.root=newNode();tree.root.children.push(old);split(tree.root,0)}
let n=tree.root;while(n.children.length){let i=0;while(i<n.keys.length&&key>n.keys[i])i++;snap(`At [${n.keys.join(" | ")}], choose child ${i}.`,n.id,i);if(n.children[i].keys.length===2*t-1){split(n,i);if(key>n.keys[i])i++;snap(`Re-evaluate separator; descend into child ${i}.`,n.id,i)}n=n.children[i]}
let i=0;while(i<n.keys.length&&n.keys[i]<key)i++;tree.moves+=n.keys.length-i;n.keys.splice(i,0,key);tree.size++;snap(`Insert ${key} at leaf position ${i}. Completed insertion.`,n.id,i);return {inserted:true,frames}}

export function build(t,keys){const tree=createTree(t);for(const k of keys)insert(tree,k,false);return tree}

export function inorder(node){if(!node)return [];const out=[];for(let i=0;i<node.keys.length;i++){out.push(...inorder(node.children[i]),node.keys[i])}out.push(...inorder(node.children[node.keys.length]));return out}

export function validate(tree){const errors=[],depths=new Set(),seen=new Set(),ids=new Set();let count=0;const t=tree.t;function visit(n,lo,hi,depth,root){if(!n||!Array.isArray(n.keys)||!Array.isArray(n.children)){errors.push("Missing or malformed node");return}if(ids.has(n.id)){errors.push("Repeated node identity");return}ids.add(n.id);const k=n.keys.length;if(k>2*t-1||k<(root?1:t-1))errors.push("Occupancy at node "+n.id);for(let i=0;i<k;i++){const x=n.keys[i];count++;if(!Number.isSafeInteger(x)||x<=lo||x>=hi)errors.push("Separator interval at node "+n.id);if(i&&n.keys[i-1]>=x)errors.push("Ordering at node "+n.id);if(seen.has(x))errors.push("Duplicate key "+x);seen.add(x)}if(!n.children.length)depths.add(depth);else{if(n.children.length!==k+1)errors.push("Child count at node "+n.id);n.children.forEach((c,i)=>visit(c,i===0?lo:n.keys[i-1]??lo,i===k?hi:n.keys[i]??hi,depth+1,false))}}if(tree.root)visit(tree.root,-Infinity,Infinity,1,true);if(depths.size>1)errors.push("Unequal leaf depths");if(count!==tree.size)errors.push("Size mismatch");return errors}

export function metrics(tree){let nodes=0,leaves=0,keys=0,height=0;function walk(n,d){if(!n)return;nodes++;keys+=n.keys.length;height=Math.max(height,d);if(!n.children.length)leaves++;n.children.forEach(c=>walk(c,d+1))}walk(tree.root,1);return {size:tree.size,nodes,leaves,height,occupancy:nodes?keys/(nodes*(2*tree.t-1)):0,splits:tree.splits,moves:tree.moves}}

export function experiment(keys,queries,t){const tree=build(t,keys),m=metrics(tree);let visits=0,max=0,comparisons=0;for(const k of queries){const s=search(tree,k,"binary",false);visits+=s.path.length;max=Math.max(max,s.path.length);comparisons+=s.comparisons}return {...m,t,mean:queries.length?visits/queries.length:0,max,comparisons:queries.length?comparisons/queries.length:0}}

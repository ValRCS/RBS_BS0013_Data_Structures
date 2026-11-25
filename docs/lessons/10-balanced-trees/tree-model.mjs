// Pure snapshot model. Costs exclude cloning and rendering.
export function height(n){return n?.h??0}

export function bf(n){return n?height(n.l)-height(n.r):0}

export function copy(n){return n?{k:n.k,h:n.h,l:copy(n.l),r:copy(n.r)}:null}

export function inorder(n){return n?[...inorder(n.l),n.k,...inorder(n.r)]:[]}

export function check(root,size){const seen=new Set(),issues=[];function walk(n,lo,hi){if(!n)return 0;if(seen.has(n)){issues.push(["structure",n.k]);return 0}seen.add(n);if(!Number.isInteger(n.k)||n.k<=lo||n.k>=hi)issues.push(["ordering",n.k]);const l=walk(n.l,lo,n.k),r=walk(n.r,n.k,hi),h=1+Math.max(l,r);if(h!==n.h)issues.push(["height",n.k]);if(Math.abs(l-r)>1)issues.push(["balance",n.k]);return h}const h=walk(root,-Infinity,Infinity);if(size!==undefined&&size!==seen.size)issues.push(["size",null]);return {h,size:seen.size,issues}}

export function insert(root,k,avl=true,trace=true){
 if(!Number.isInteger(k)||k< -2147483648||k>2147483647)throw Error("Enter a signed 32-bit integer.");
 const holder={root:copy(root)},frames=[],stack=[],cost={comparisons:0,rotations:0,updates:0};let added=false;
 const emit=(msg,active=null,phase="",middle=null)=>{if(trace)frames.push({root:copy(holder.root),msg,active,phase,middle,stack:[...stack],cost:{...cost}})};
 function refresh(n){n.h=1+Math.max(height(n.l),height(n.r));cost.updates++;emit("Refresh "+n.k+": h="+n.h,n.k,"height")}
 function rotate(p,s,dir){const x=p[s],a=dir==="left"?"r":"l",b=dir==="left"?"l":"r",y=x[a],m=y[b];emit("Rotate "+dir+" at "+x.k+"; preserve middle subtree "+(m?.k??"∅"),x.k,"before",m?.k??null);x[a]=m;y[b]=x;p[s]=y;cost.rotations++;emit("Rewire and replace owning link; heights temporarily stale.",y.k,"rewire",m?.k??null);refresh(x);refresh(y)}
 function visit(p,s){const n=p[s];if(!n){p[s]={k,h:1,l:null,r:null};added=true;emit("Insert leaf "+k,k,"leaf");return}stack.push(n.k);cost.comparisons++;emit("Compare "+k+" with "+n.k,n.k,"compare");if(k===n.k){emit("Duplicate rejected; no mutation.",n.k,"duplicate");stack.pop();return}visit(n,k<n.k?"l":"r");if(added){refresh(n);const b=bf(n);emit("BF("+n.k+") = "+b,n.k,"balance");if(avl&&b>1){const inner=bf(n.l)<0;emit(inner?"LR: left then right":"LL: right",n.k,inner?"LR":"LL");if(inner)rotate(n,"l","left");rotate(p,s,"right")}else if(avl&&b< -1){const inner=bf(n.r)>0;emit(inner?"RL: right then left":"RR: left",n.k,inner?"RL":"RR");if(inner)rotate(n,"r","right");rotate(p,s,"left")}}stack.pop()}
 emit("Start inserting "+k);visit(holder,"root");emit("Insertion complete.",null,"complete");return {root:holder.root,frames,cost,added}
}

export function build(keys,avl=true){let root=null,cost={comparisons:0,rotations:0,updates:0};for(const k of keys){const x=insert(root,k,avl,false);root=x.root;for(const c of Object.keys(cost))cost[c]+=x.cost[c]}return {root,cost}}

export function search(root,k){const path=[];while(root){path.push(root.k);if(root.k===k)return {found:true,path};root=k<root.k?root.l:root.r}return {found:false,path}}

export function maxHeight(n){let a=0,b=1,h=0;while(b<=n){h++;[a,b]=[b,1+a+b]}return h}

export function sequence(kind,n,seed=42){const a=Array.from({length:n},(_,i)=>i+1);if(kind==="descending")return a.reverse();if(kind==="median"){const out=[];function go(l,r){if(l>r)return;const m=Math.floor((l+r)/2);out.push(m);go(l,m-1);go(m+1,r)}go(1,n);return out}if(kind==="alternating"){const out=[];let l=1,r=n;while(l<=r){out.push(l++);if(l<=r)out.push(r--)}return out}if(kind==="random"){let s=seed>>>0;for(let i=n-1;i>0;i--){s=(Math.imul(s,1664525)+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}}return a}

export function parse(s,max=31){const a=s.trim()?s.trim().split(/[\s,]+/):[];if(a.length>max||a.some(x=>!/^[-+]?\d+$/.test(x)||Number(x)<-2147483648||Number(x)>2147483647))throw Error("Enter up to "+max+" signed 32-bit integers separated by spaces or commas.");return a.map(Number)}

export function rotationDemo(dir){const x=build(dir==="right"?[50,30,70,20,40]:[30,10,50,40,70],false).root,a=dir==="left"?"r":"l",b=dir==="left"?"l":"r",y=x[a],m=y[b],frames=[];const emit=(root,msg,active,phase,rotations,updates)=>frames.push({root:copy(root),msg,active,phase,middle:m.k,stack:[],cost:{comparisons:0,rotations,updates}});emit(x,"Identify pivot "+y.k+" and middle subtree "+m.k,x.k,"before",0,0);x[a]=m;y[b]=x;emit(y,"Transfer middle subtree and replace root link; heights stale.",y.k,"rewire",1,0);x.h=1+Math.max(height(x.l),height(x.r));emit(y,"Refresh former root first.",x.k,"height",1,1);y.h=1+Math.max(height(y.l),height(y.r));emit(y,"Refresh pivot; inorder unchanged.",y.k,"complete",1,2);return frames}

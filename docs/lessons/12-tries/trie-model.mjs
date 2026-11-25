const abc="abcdefghijklmnopqrstuvwxyz";
function node(){return {terminal:false,children:Object.create(null)}}

function valid(k,empty){if(typeof k!=="string"||(!empty&&!k.length)||/[^a-z]/.test(k))throw new Error("Use lowercase ASCII a–z; inserted keys must be nonempty.")}

function snapshot(t){const rows=[];function visit(n,p){const children=Object.keys(n.children).sort();rows.push({prefix:p,terminal:n.terminal,children});for(const c of children)visit(n.children[c],p+c)}visit(t.root,"");return {rows,size:t.size}}

function createTrie(words=[]){const t={root:node(),size:0};for(const w of words)operate(t,"insert",w,false);return t}

function operate(t,op,k,record=true){
if(!["insert","contains","prefix","complete","erase"].includes(op))throw new Error("Unknown operation");valid(k,op!=="insert");
let n=t.root,p="",path=[],frames=[],stats={lookups:0,allocations:0,terminalChanges:0,pruned:0,slots:0,visited:0,emitted:0};
const emit=(message,active=p,processed=p.length,phase="walk")=>{if(record)frames.push({message,active,processed,phase,stats:{...stats},...snapshot(t)})};
const finish=(result,message)=>{emit(message,p,k.length,"done");return {result,frames,stats}};
emit("Start at the permanent root.");
if(!k&&(op==="contains"||op==="erase"))return finish(false,"Empty string is not a stored key.");
for(const c of k){stats.lookups++;if(!n.children[c]){if(op!=="insert"){emit("Missing child "+c+": stop.",p,p.length,"miss");return {result:op==="complete"?[]:false,frames,stats}}n.children[c]=node();stats.allocations++;path.push([n,c,p]);n=n.children[c];p+=c;emit("Allocate child "+c+".",p,p.length,"allocate")}else{path.push([n,c,p]);n=n.children[c];p+=c;emit("Follow existing child "+c+".")}}
if(op==="insert"){if(n.terminal)return finish(false,"Duplicate key: size unchanged.");n.terminal=true;t.size++;stats.terminalChanges++;return finish(true,"Set terminal; increment distinct key count.")}
if(op==="contains")return finish(n.terminal,n.terminal?"Terminal: exact key found.":"Path exists but is not terminal.");
if(op==="prefix")return finish(true,"Prefix path exists.");
if(op==="complete"){const out=[];function dfs(v,s){stats.visited++;emit("Visit "+(s||"ε"),s,k.length,"visit");if(v.terminal){out.push(s);stats.emitted+=s.length;emit("Emit "+s,s,k.length,"output")}for(const c of abc){stats.slots++;if(v.children[c])dfs(v.children[c],s+c)}}dfs(n,p);return finish(out,"Completion: "+(out.join(", ")||"no keys"))}
if(!n.terminal)return finish(false,"Missing key: nothing changes.");n.terminal=false;t.size--;stats.terminalChanges++;emit("Clear terminal; decrement size.");
for(let i=path.length-1;i>=0;i--){const [parent,c,q]=path[i],child=parent.children[c];if(child.terminal){emit("Stop: terminal node remains.",q+c,k.length,"retain");break}let has=false;for(const letter of abc){stats.slots++;if(child.children[letter]){has=true;break}}if(has){emit("Stop: child still needs this node.",q+c,k.length,"retain");break}delete parent.children[c];stats.pruned++;p=q;emit("Prune unused leaf "+q+c+".",q,k.length,"prune")}
return finish(true,"Deletion complete; root remains.")
}

function memory(m,a,p){if(![m,a,p].every(x=>Number.isSafeInteger(x)&&x>0)||!Number.isSafeInteger(m*a*p))throw new Error("Positive safe integer inputs required");return {slots:m*a,used:m-1,unused:m*a-m+1,dense:m*a*p,payload:(m-1)*p,utilization:(m-1)/(m*a)}}

function compress(t){const edges=[];function walk(n,p){for(const c of Object.keys(n.children).sort()){let v=n.children[c],label=c;while(!v.terminal&&Object.keys(v.children).length===1){const next=Object.keys(v.children)[0];label+=next;v=v.children[next]}const end=p+label;edges.push({from:p,to:end,label,terminal:v.terminal});walk(v,end)}}walk(t.root,"");return edges}

function seeded(seed,count=12){let s=Number(seed)>>>0,out=[];for(let i=0;i<count;i++){let w="";for(let j=0;j<3+i%4;j++){s=(Math.imul(s,1664525)+1013904223)>>>0;w+=abc[(s>>>16)%26]}out.push(w)}return out}

function checkRepair(rows,size,expected){const clean=a=>[...a].sort((x,y)=>x.prefix.localeCompare(y.prefix)).map(x=>({prefix:x.prefix,terminal:x.terminal}));const wanted=snapshot(createTrie(expected));return size===wanted.size&&JSON.stringify(clean(rows))===JSON.stringify(clean(wanted.rows))}
export {createTrie,operate,snapshot,memory,compress,seeded,checkRepair};

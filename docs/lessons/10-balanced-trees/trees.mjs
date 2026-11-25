import {height,bf,inorder,check,insert,build,search,maxHeight,sequence,parse,rotationDemo} from "./tree-model.mjs";
import {presets} from "./tree-presets.mjs";
import {questions} from "./questions.mjs";
import {renderTree} from "../../assets/js/core/tree-renderer.mjs";
import {player} from "../../assets/js/core/playback.mjs";
const $=id=>document.getElementById(id),say=(id,t)=>{$(id).textContent=t},draw=(id,r,o={})=>renderTree($(id),r,o);
const safe=(id,fn)=>{try{fn()}catch(e){say(id,e.message)}};
const zero=()=>({comparisons:0,rotations:0,updates:0});
let keys=[],pos=0,bst=null,avl=null,bc=zero(),ac=zero(),expected=new Set();
function inspect(k){let n=avl;while(n&&n.k!==k)n=k<n.k?n.l:n.r;if(n)say("node-info","Key "+k+": left height "+height(n.l)+", right height "+height(n.r)+", cached height "+n.h+", BF "+bf(n))}
function show(a=[],b=[]){draw("bst-svg",bst,{path:a,metadata:$("metadata").checked});draw("avl-svg",avl,{path:b,metadata:$("metadata").checked,onSelect:inspect});for(const [id,r,c] of [["bst-metrics",bst,bc],["avl-metrics",avl,ac]])say(id,"Height "+height(r)+" · keys "+inorder(r).length+" · comparisons "+c.comparisons+" · rotations "+c.rotations+" · refreshes "+c.updates);const v=check(avl,expected.size);say("invariants",["ordering","height","balance","structure","size"].map(x=>x+": "+(v.issues.some(y=>y[0]===x)?"invalid":"valid")).join(" · ")+" · inorder: "+inorder(avl).join(", "));$("next-key").disabled=pos>=keys.length}
for(const k of [...Object.keys(presets),"random","custom"]){const o=document.createElement("option");o.value=k;o.textContent=k;$("preset").append(o)}
function preset(){const p=$("preset").value;if(p!=="custom")$("sequence").value=(p==="random"?sequence("random",12,Number($("seed").value)):presets[p]).join(", ")}
function reset(){keys=parse($("sequence").value);pos=0;bst=avl=null;bc=zero();ac=zero();expected=new Set();show();say("compare-status","Ready: "+keys.length+" input keys.");say("node-info","Select an AVL node to inspect.")}
function step(){if(pos>=keys.length)return;const k=keys[pos++],a=insert(bst,k,false,false),b=insert(avl,k,true,false);bst=a.root;avl=b.root;expected.add(k);for(const c of Object.keys(bc)){bc[c]+=a.cost[c];ac[c]+=b.cost[c]}show();say("compare-status",(b.added?"Inserted ":"Duplicate rejected: ")+k+" · "+pos+"/"+keys.length)}
$("preset").onchange=()=>{preset();safe("compare-status",reset)};$("seed").onchange=()=>{if($("preset").value==="random"){preset();safe("compare-status",reset)}};$("sequence").oninput=()=>{$("preset").value="custom";say("compare-status","Edited sequence; click Load / reset before inserting.")};$("reset").onclick=()=>safe("compare-status",reset);$("next-key").onclick=step;$("all-keys").onclick=()=>{while(pos<keys.length)step()};$("metadata").onchange=()=>show();
$("search").onclick=()=>safe("compare-status",()=>{const k=parse($("search-key").value,1)[0];if(k===undefined)throw Error("Enter a key.");const a=search(bst,k),b=search(avl,k);show(a.path,b.path);say("compare-status",(b.found?"Found ":"Not found: ")+k+" · BST "+a.path.length+" vs AVL "+b.path.length+" comparisons")});
preset();reset();while(pos<keys.length)step();
function workspace(id){const p=player((f,i,n)=>{draw(id+"-svg",f.root,{active:f.active,middle:f.middle});say(id+"-message",f.msg);say(id+"-state","Step "+(i+1)+"/"+n+" · stack "+(f.stack.join(" → ")||"∅")+" · comparisons "+f.cost.comparisons+" · rotations "+f.cost.rotations+" · refreshes "+f.cost.updates+" · inorder "+inorder(f.root).join(", "));$(id+"-timeline").value=i},(i,n,playing)=>{$(id+"-timeline").max=Math.max(0,n-1);$(id+"-play").textContent=playing?"Pause":"Play";$(id+"-prev").disabled=i===0;$(id+"-next").disabled=i>=n-1});$(id+"-prev").onclick=()=>p.step(-1);$(id+"-next").onclick=()=>p.step(1);$(id+"-play").onclick=()=>p.toggle();$(id+"-restart").onclick=()=>p.seek(0);$(id+"-speed").onchange=e=>p.speed(Number(e.target.value));$(id+"-timeline").oninput=e=>p.seek(Number(e.target.value));return fs=>p.load(fs)}
const rotation=workspace("rotation"),insertion=workspace("insertion");$("direction").onchange=()=>rotation(rotationDemo($("direction").value));rotation(rotationDemo("right"));
$("case-preset").onchange=()=>{$("trace-sequence").value=presets[$("case-preset").value].join(", ");say("prediction","Predict before tracing.")};
$("predict").onclick=()=>say("prediction",$("case-preset").value==="middle"?"Trace to discover the case.":$("case-preset").value===$("case-answer").value?"Correct.":"Review the heavy path.");
function trace(){const ks=parse($("trace-sequence").value);if(!ks.length)throw Error("Enter a key sequence.");insertion(insert(build(ks.slice(0,-1)).root,ks.at(-1)).frames)}
$("trace").onclick=()=>safe("insertion-message",trace);trace();
const bugs=[
["Global ancestral ordering",[40,20,60,10,30,50,70],r=>{r.l.r.k=45},"ordering","45 is in the left subtree of 40, so it violates the ancestor bound."],
["Stale cached height",[40,20,60,10],r=>{r.l.h=1},"height","Node 20 has true height 2."],
["Unbalanced chain",[10,20,30],()=>{},"balance","Root 10 has BF −2."],
["Lost middle subtree",[40,20,60,10,30],r=>{r.l.r=null},"size","Key 30 disappeared; compare expected count and key set."],
["Owning link not replaced",[40,20,60,10,30],r=>{r.l=r.l.r},"size","Nodes 20 and 10 are unreachable."],
["Duplicate",[40,20,60],r=>{r.r.k=40},"ordering","Strict key bounds reject duplicates."],
["Wrong recorded size",[40,20,60],()=>{},"size","Recorded size 4, reachable size 3."]
];let bug,broken,expectedSize;
for(const [i,b] of bugs.entries()){const o=document.createElement("option");o.value=i;o.textContent="Case "+(i+1);$("bug-case").append(o)}
function loadBug(){const i=Number($("bug-case").value);bug=bugs[i];broken=build(bug[1],i!==2).root;bug[2](broken);expectedSize=bug[1].length+Number(i===6);draw("bug-svg",broken,{onSelect:k=>say("bug-selected","Selected node "+k)});say("bug-selected","Select a node.");say("bug-result","Expected size "+expectedSize+"; original keys "+bug[1].slice().sort((a,b)=>a-b).join(", ")+". Diagnose the primary violation.")}
$("bug-case").onchange=loadBug;$("bug-check").onclick=()=>say("bug-result",($("bug-answer").value===bug[3]?"Correct. ":"Review. ")+bug[4]+" Validator: "+check(broken,expectedSize).issues.map(x=>x[0]+(x[1]===null?"":" at "+x[1])).join("; "));$("bug-repair").onclick=()=>{draw("bug-svg",build(bug[1]).root);say("bug-result","Valid reference tree: "+bug[4])};loadBug();
function experiment(){const n=Number($("experiment-n").value);if(!Number.isInteger(n)||n<1||n>256)throw Error("Use 1–256 distinct keys.");$("experiment-rows").replaceChildren();for(const kind of ["ascending","descending","median","random","alternating"]){const ks=sequence(kind,n,Number($("experiment-seed").value)),a=build(ks,false),b=build(ks,true),tr=document.createElement("tr");for(const v of [kind,height(a.root),height(b.root),a.cost.comparisons,b.cost.comparisons,b.cost.rotations,b.cost.updates]){const td=document.createElement("td");td.textContent=v;tr.append(td)}$("experiment-rows").append(tr)}say("experiment-status","Same "+n+" distinct keys in each workload.")}
$("run-experiment").onclick=()=>safe("experiment-status",experiment);experiment();
function bounds(){const n=Number($("bound-n").value);say("bound-count",n);[Math.ceil(Math.log2(n+1)),maxHeight(n),n].forEach((v,i)=>{say("bound-"+i,v);$("bar-"+i).style.width=100*v/n+"%"})}
$("bound-n").oninput=bounds;bounds();
questions.forEach(([q,opts,correct,why],i)=>{const f=document.createElement("fieldset");f.className="tree-question";const l=document.createElement("legend");l.textContent=(i+1)+". "+q;f.append(l);opts.forEach((o,j)=>{const a=document.createElement("label"),r=document.createElement("input");r.type="radio";r.name="q"+i;r.value=j;a.append(r," "+o);f.append(a)});const b=document.createElement("button"),s=document.createElement("p");b.type="button";b.textContent="Check answer";s.setAttribute("role","status");b.onclick=()=>{const x=f.querySelector("input:checked");s.textContent=x?(Number(x.value)===correct?"Correct. ":"Review. ")+why:"Choose an answer."};f.append(b,s);$("questions").append(f)});

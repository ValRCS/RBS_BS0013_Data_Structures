
import {createTrie,operate,snapshot,memory,compress,seeded,checkRepair} from "./trie-model.mjs";
import {presets} from "./trie-presets.mjs";
import {questions} from "./questions.mjs";
import {draw} from "./trie-renderer.mjs";
import {player} from "../../assets/js/core/playback.mjs";
const $=id=>document.getElementById(id),initial=["car","cart","cat","dog"],alphabet="abcdefghijklmnopqrstuvwxyz";
const text=(id,v)=>{$(id).textContent=v},make=(tag,s)=>{const x=document.createElement(tag);if(s!==undefined)x.textContent=s;return x};
const listen=(id,event,fn)=>$(id).addEventListener(event,fn);
const stats=(id,obj)=>$(id).replaceChildren(...Object.entries(obj).map(([k,v])=>make("span",k+": "+v)));
const all=t=>operate(t,"complete","",false).result;
function bounds(t){if(t.size>20||snapshot(t).rows.length>120)throw Error("Visual limit: 20 distinct keys and 120 nodes.");return t}
function boundedWords(words){if(words.some(w=>w.length>12))throw Error("Visual limit: 12 letters per key.");return bounds(createTrie(words))}
let main=createTrie(initial),traceWords=["car"],traceInput="cart";
function renderMain(active=""){
 const s=snapshot(main),inspect=$("inspect"),prior=active||inspect.value;
 inspect.replaceChildren(...s.rows.map(r=>{const o=make("option",r.prefix||"ε (root)");o.value=r.prefix;return o}));
 inspect.value=s.rows.some(r=>r.prefix===prior)?prior:"";
 stats("metrics",{Keys:s.size,Nodes:s.rows.length,Edges:s.rows.length-1});renderInspect();renderAuto();
}
function renderInspect(){const s=snapshot(main),r=s.rows.find(x=>x.prefix===$("inspect").value)||s.rows[0];
 draw($("main-tree"),s.rows,r.prefix,$("key").value);
 text("inspect-info","Prefix "+(r.prefix||"ε")+" · depth "+r.prefix.length+" · terminal "+r.terminal+" · children "+(r.children.join(", ")||"none")+" · prune eligible "+Boolean(r.prefix&&!r.terminal&&!r.children.length));
 $("slots").replaceChildren(...[...alphabet].map(c=>{const e=make("span",c+": "+(r.children.includes(c)?"child":"∅"));if(r.children.includes(c))e.className="used";return e}))
}
function load(words){try{main=boundedWords(words);$("dictionary").value=all(main).join(" ");text("main-status","Dictionary loaded: "+main.size+" distinct keys.");renderMain()}catch(e){text("main-status",e.message)}}
presets.forEach(([name],i)=>{const o=make("option",name);o.value=i;$("preset").append(o)});$("preset").value="8";
listen("load-preset","click",()=>{const i=Number($("preset").value);load(i===11?seeded($("seed").value):presets[i][1])});
listen("generate","click",()=>load(seeded($("seed").value)));listen("clear","click",()=>load([]));listen("load-dictionary","click",()=>load($("dictionary").value.trim().split(/\s+/).filter(Boolean)));
listen("inspect","change",renderInspect);listen("key","input",renderInspect);
document.querySelectorAll("[data-op]").forEach(b=>b.addEventListener("click",()=>{const op=b.dataset.op,k=$("key").value;try{const copy=createTrie(all(main)),r=operate(copy,op,k,false);bounds(copy);if(op==="insert"||op==="erase")main=copy;text("main-status",op+"("+JSON.stringify(k)+") = "+(Array.isArray(r.result)?r.result.join(", ")||"[]":r.result));$("dictionary").value=all(main).join(" ");renderMain(k)}catch(e){text("main-status",e.message)}}));
const playback=player((f,i,n)=>{
 draw($("trace-tree"),f.rows,f.active,traceInput.slice(0,f.processed));
 $("trace-chars").replaceChildren(...[...traceInput].map((c,j)=>{const e=make("span",c);e.className=j<f.processed?"used":j===f.processed&&f.phase!=="done"?"current":"";return e}));
 text("trace-message",f.message);stats("trace-stats",f.stats);
},(i,n,playing)=>{$("timeline").max=Math.max(0,n-1);$("timeline").value=i;text("position",n?"Step "+(i+1)+" / "+n:"No trace");$("play").textContent=playing?"Pause":"Play";$("first").disabled=$("prev").disabled=!n||i===0;$("last").disabled=$("next").disabled=!n||i===n-1;$("play").disabled=!n});
function trace(){try{traceInput=$("trace-key").value;const copy=createTrie(traceWords),r=operate(copy,$("trace-op").value,traceInput);bounds(copy);text("trace-source","Independent source: "+(traceWords.join(", ")||"empty"));playback.load(r.frames)}catch(e){playback.clear();$("trace-tree").replaceChildren();$("trace-chars").replaceChildren();$("trace-stats").replaceChildren();text("trace-message",e.message)}}
listen("trace-run","click",trace);listen("trace-reset","click",()=>{traceWords=["car"];$("trace-op").value="insert";$("trace-key").value="cart";trace()});
listen("import","click",()=>{traceWords=all(main);$("trace-key").value=$("key").value;trace();location.hash="operations"});
listen("first","click",()=>playback.seek(0));listen("last","click",()=>playback.seek(Number($("timeline").max)));listen("prev","click",()=>playback.step(-1));listen("next","click",()=>playback.step(1));listen("play","click",()=>playback.toggle());listen("timeline","input",()=>playback.seek(Number($("timeline").value)));listen("speed","change",()=>playback.speed(Number($("speed").value)));
function renderAuto(){const k=$("auto-prefix").value;try{const c=operate(main,"contains",k,false),p=operate(main,"prefix",k,false),r=operate(main,"complete",k,false);text("auto-result","Exact: "+c.result+" · Prefix: "+p.result+" · Matches: "+(r.result.join(", ")||"none"));stats("auto-stats",r.stats);draw($("auto-tree"),snapshot(main).rows,p.result?k:"",k)}catch(e){text("auto-result",e.message);$("auto-stats").replaceChildren();$("auto-tree").replaceChildren()}}
listen("auto-prefix","input",renderAuto);listen("auto-trace","click",()=>{traceWords=all(main);$("trace-op").value="complete";$("trace-key").value=$("auto-prefix").value;trace();location.hash="operations"});
let del=createTrie(initial),di=0;
function showDeletion(){const s=snapshot(del);draw($("delete-tree"),s.rows);text("delete-prompt",di<initial.length?"Next key: "+initial[di]:"Sequence finished. Root remains.");stats("delete-stats",{Keys:s.size,Nodes:s.rows.length});$("delete-next").disabled=di>=initial.length}
listen("delete-next","click",()=>{const pred=Number($("delete-predict").value);if(!Number.isInteger(pred)||pred<0){text("delete-result","Enter a nonnegative integer prediction.");return}const r=operate(del,"erase",initial[di++],false);text("delete-result",(pred===r.stats.pruned?"Correct. ":"Prediction differs. ")+"Pruned "+r.stats.pruned+" node(s). "+(r.stats.pruned===0?"The shared path remains.":"Only unused nonterminal leaves were removed."));showDeletion()});
listen("delete-reset","click",()=>{del=createTrie(initial);di=0;text("delete-result","");showDeletion()});
const cases=[
["Missing terminal",["car","cart"],r=>r.find(x=>x.prefix==="car").terminal=false,2],
["False terminal",["car","cart"],r=>r.find(x=>x.prefix==="ca").terminal=true,2],
["Incorrect size",["cat"],()=>{},2],
["Wrong child index",["cat"],r=>r.find(x=>x.prefix==="cat").prefix="caz",1],
["Excessive pruning",["cart"],r=>r.splice(r.findIndex(x=>x.prefix==="car"),2),1],
["Insufficient pruning",["cat"],r=>r.push({prefix:"cab",terminal:false}),1],
["Duplicate insertion count",["car"],()=>{},2],
["Invalid partial mutation",["dog"],r=>r.push({prefix:"c",terminal:false},{prefix:"ca",terminal:false}),1]
];let repair=[],caseIndex=0;
cases.forEach((c,i)=>{const o=make("option",c[0]);o.value=i;$("bug-case").append(o)});
function showRepair(){const body=$("bug-rows");body.replaceChildren();repair.forEach((r,i)=>{const tr=make("tr"),p=make("td"),term=make("td"),action=make("td"),input=make("input"),check=make("input"),button=make("button","Remove");input.value=r.prefix;input.placeholder="ε (root)";input.setAttribute("aria-label","Prefix row "+(i+1));input.addEventListener("input",()=>{r.prefix=input.value;text("bug-result","")});check.type="checkbox";check.checked=r.terminal;check.setAttribute("aria-label","Terminal row "+(i+1));check.addEventListener("change",()=>{r.terminal=check.checked;text("bug-result","")});button.addEventListener("click",()=>{repair.splice(i,1);showRepair();text("bug-result","")});p.append(input);term.append(check);action.append(button);tr.append(p,term,action);body.append(tr)})}
function loadBug(){caseIndex=Number($("bug-case").value);const [title,expected,corrupt,size]=cases[caseIndex];repair=snapshot(createTrie(expected)).rows.map(({prefix,terminal})=>({prefix,terminal}));corrupt(repair);$("bug-size").value=size;text("bug-prompt",title+" · Intended keys: "+expected.join(", "));text("bug-result","");showRepair()}
listen("bug-case","change",loadBug);listen("bug-reset","click",loadBug);listen("bug-add","click",()=>{if(repair.length<30){repair.push({prefix:"",terminal:false});showRepair()}});listen("bug-check","click",()=>text("bug-result",checkRepair(repair,Number($("bug-size").value),cases[caseIndex][1])?"Correct: intended paths, terminals and size restored.":"Not yet: compare every prefix, terminal flag and distinct key count."));
function showMemory(){try{const m=memory(Number($("mem-nodes").value),Number($("mem-alphabet").value),Number($("mem-pointer").value));text("memory-result","Dense: "+m.dense.toLocaleString()+" B · Non-null pointer payload: "+m.payload.toLocaleString()+" B · Unused slots: "+m.unused.toLocaleString()+" · Utilisation: "+(m.utilization*100).toFixed(2)+"%");$("memory-bar").style.width=(100*m.utilization)+"%"}catch(e){text("memory-result",e.message);$("memory-bar").style.width="0%"}}
for(const id of ["mem-nodes","mem-alphabet","mem-pointer"])listen(id,"input",showMemory);
listen("mem-current","click",()=>{$("mem-nodes").value=snapshot(main).rows.length;showMemory()});
function experiments(){const examples=[["Short keys",["ab","ac","ad"],"ab","a"],["Long keys",["abcdef","abcdeg","abcdeh"],"abcdef","a"],["Independent",["abc","def","ghi"],"abc",""],["Shared",["aaa","aab","aac"],"aaa",""],["Seeded",seeded($("seed").value),"missing",""]];$("experiment-rows").replaceChildren(...examples.map(([name,words,key,p])=>{const t=createTrie(words),r=operate(t,"contains",key,false),c=operate(t,"complete",p,false);const tr=make("tr");tr.append(...[name,t.size,snapshot(t).rows.length,r.stats.lookups,c.stats.visited].map(v=>make("td",v)));return tr}))}
listen("experiment-run","click",experiments);
let radixWords=["cart"];
function showRadix(){const t=createTrie(radixWords),s=snapshot(t),edges=compress(t),rows=[{prefix:"",terminal:false},...edges.map(e=>({prefix:e.to,terminal:e.terminal}))];draw($("radix-normal"),s.rows);draw($("radix-compressed"),rows,"","",edges);text("radix-info","Ordinary nodes: "+s.rows.length+" · compressed nodes: "+rows.length+" · Keys: "+radixWords.join(", "))}
listen("radix-current","click",()=>{radixWords=all(main);showRadix()});listen("radix-split","click",()=>{radixWords=["cart"];showRadix()});listen("radix-insert","click",()=>{radixWords=["cart","care"];showRadix()});
document.querySelectorAll("[data-choice]").forEach(b=>b.addEventListener("click",()=>{const q=$("choice").value,a={prefix:"trie",exact:"hash",sorted:"tree"}[q];text("choice-result",(a===b.dataset.choice?"Strong default. ":"Not the usual default. ")+{prefix:"A trie directly locates the prefix subtree.",exact:"A hash table is attractive when ordering is unnecessary; include hashing cost.",sorted:"A balanced BST supports ordered ranges over general comparable keys."}[q])}));
questions.forEach(([q,opts,right,why],i)=>{const f=make("fieldset"),l=make("legend",(i+1)+". "+q);f.append(l);opts.forEach((option,j)=>{const label=make("label"),r=make("input");r.type="radio";r.name="question-"+i;r.value=j;label.append(r,document.createTextNode(" "+option));f.append(label)});const b=make("button","Check answer"),out=make("output");out.setAttribute("aria-live","polite");b.addEventListener("click",()=>{const chosen=f.querySelector("input:checked");out.textContent=chosen?(Number(chosen.value)===right?"Correct. ":"Try again. ")+why:"Select an answer first."});f.append(b,out);$("questions").append(f)});
renderMain();trace();showDeletion();loadBug();showMemory();experiments();showRadix();

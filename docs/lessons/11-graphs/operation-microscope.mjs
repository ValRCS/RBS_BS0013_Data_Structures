import {graph,representations,operation,addEdge,removeEdge} from "../../assets/js/core/graph-model.mjs";
import {renderer} from "../../assets/js/core/graph-renderer.mjs";
import {player} from "../../assets/js/core/playback.mjs";
import {presets} from "./graph-presets.mjs";
import {el,button} from "./ui.mjs";
const copy=g=>graph(g.vertices,g.edges,g.directed,g.weighted);
const kinds=["matrix","list","edges"];
const titles={matrix:"Adjacency matrix",list:"Adjacency list",edges:"Edge list"};
const opNames={has:"has_edge",add:"add_edge",remove:"remove_edge",neighbors:"neighbors",count:"edge_count"};
// Read addresses are generated against the original storage, not a sorted copy.
export function scanAddresses(g,kind,op,u,v){
 if(op==="count")return ["counter"];
 const r=representations(g),i=r.index.get(u);
 if(i===undefined||!r.index.has(v)&&op!=="neighbors")throw Error("Choose valid vertex IDs.");
 if(kind==="matrix")return op==="neighbors"?r.ids.map(x=>"m:"+u+":"+x):["m:"+u+":"+v];
 if(kind==="list"){const scan=(a,b,all)=>{const out=[];for(const [j,[x]] of r.list[r.index.get(a)].entries()){out.push("l:"+a+":"+j);if(!all&&x===b)break}return out};const a=scan(u,v,op==="neighbors");if(op==="remove"&&!g.directed&&u!==v&&r.list[i].some(([x])=>x===v))a.push(...scan(v,u,false));return a}
 const a=[];for(const [j,e] of r.edges.entries()){a.push("e:"+j);if(op!=="neighbors"&&(g.directed?e[0]===u&&e[1]===v:e[0]===Math.min(u,v)&&e[1]===Math.max(u,v)))break}return a;
}
export function comparisonPlan(g,op,u,v,w=1){
 const before=copy(g),after=copy(g),results={};
 for(const kind of kinds){const z=operation(before,kind,op,u,v),addresses=scanAddresses(before,kind,op,u,v);if(addresses.length!==z.reads)throw Error("Trace and operation counts disagree.");results[kind]={...z,addresses}}
 if(op==="add")addEdge(after,u,v,w);if(op==="remove")removeEdge(after,u,v);
 const steps=Math.max(0,...kinds.map(k=>results[k].reads));
 return {before,after,results,steps,op,u,v};
}
function select(host,name,items,id){const l=el("label",name),s=el("select");if(id)s.id=id;for(const [v,t] of items){const o=el("option",t);o.value=v;s.append(o)}l.append(s);host.append(l);return s}
function svg(host){const s=document.createElementNS("http://www.w3.org/2000/svg","svg");host.append(s);return s}
function storage(host,g,kind,op,u,v,active,seen,mutated){
 host.replaceChildren();const r=representations(g),mark=(n,key,changed=false)=>{n.classList.add("storage-cell");if(seen.includes(key))n.classList.add("storage-read");if(key===active)n.classList.add("storage-active");if(changed)n.classList.add("storage-changed");return n};
 const relevant=(a,b)=>op!=="neighbors"&&op!=="count"&&(a===u&&b===v||!g.directed&&a===v&&b===u);
 if(op==="count"){host.append(mark(el("div","Logical edge count: "+g.edges.length,"chip"),"counter"));return}
 if(kind==="matrix"){
 const wrap=el("div",undefined,"scroll-table"),t=el("table",undefined,"data storage-matrix"),head=el("tr");head.append(el("th","u \\ v"));for(const x of r.ids){const th=el("th",x);th.scope="col";head.append(th)}t.append(head);
 for(const [i,a] of r.ids.entries()){const tr=el("tr"),th=el("th",a);th.scope="row";tr.append(th);for(const [j,b] of r.ids.entries()){const w=r.matrix[i][j];tr.append(mark(el("td",g.weighted?w??"∅":w===null?0:1),"m:"+a+":"+b,mutated&&relevant(a,b)))}t.append(tr)}wrap.append(t);host.append(wrap)
 }else if(kind==="list"){for(const [i,a] of r.ids.entries()){const row=el("div",undefined,"storage-bucket");row.append(el("strong",a+" →"));if(!r.list[i].length)row.append(el("span","∅","status"));for(const [j,[b,w]] of r.list[i].entries())row.append(mark(el("span",b+(g.weighted?" ("+w+")":""),"chip"),"l:"+a+":"+j,mutated&&relevant(a,b)));host.append(row)}}
 else{const row=el("div",undefined,"chips");for(const [i,[a,b,w]] of r.edges.entries())row.append(mark(el("span","("+a+", "+b+(g.weighted?", "+w:"")+")","chip"),"e:"+i,mutated&&relevant(a,b)));if(!r.edges.length)row.append(el("span","No edge records","status"));host.append(row)}
}
export function operationMicroscope(host,getSnapshot,jumpToEditor){
 host.replaceChildren();host.classList.add("tool");host.append(el("h3","One operation, three storage representations"),el("p","Choose an example or import Section 3. Predict the number of reads, then use Next or Play. Amber marks the current read; outlined cells have already been inspected. The three representations advance one read per step until each finishes."));
 const c=el("div",undefined,"controls");host.append(c);
 const example=select(c,"Guided example",[["existing","Find an existing edge"],["missing","Search for a missing edge"],["remove","Remove an undirected edge"],["add","Insert an undirected edge"]]);
 const op=select(c,"Operation",Object.entries(opNames),"operation"),from=select(c,"Source u",[],"microscope-from"),to=select(c,"Destination v",[],"microscope-to");
 const l=el("label","New edge weight"),weight=el("input");weight.type="number";weight.value="1";weight.min="-1000000";weight.max="1000000";weight.step="any";l.append(weight);c.append(l);
 const jump=el("a","Construct or edit in Section 3");jump.href="#editor";jump.addEventListener("click",()=>jumpToEditor(host.id));c.append(jump,button("Import current graph from main editor",importGraph));
 const runButton=button("Run comparison",run);runButton.id="run-op";c.append(runButton);
 const status=el("p",undefined,"status"),message=el("p",undefined,"feedback"),sourceStatus=el("p",undefined,"status");message.setAttribute("aria-live","polite");host.append(sourceStatus,status,message);
 const diagrams=el("div",undefined,"tool-grid"),beforeBox=el("div"),afterBox=el("div");beforeBox.append(el("h4","Graph before operation"));afterBox.append(el("h4","Graph after operation (simulation only)"));const beforeView=renderer(svg(beforeBox)),afterView=renderer(svg(afterBox));diagrams.append(beforeBox,afterBox);host.append(diagrams);afterBox.hidden=true;
 const grid=el("div",undefined,"microscope-grid");grid.id="op-result";host.append(grid);const panels={};for(const k of kinds){const panel=el("article",undefined,"panel microscope-panel"),counter=el("p",undefined,"metric"),body=el("div"),result=el("p",undefined,"feedback"),old=el("details"),oldBody=el("div");old.append(el("summary","Before mutation"),oldBody);old.hidden=true;panel.append(el("h4",titles[k]),counter,body,result,old);grid.append(panel);panels[k]={counter,body,result,old,oldBody}}
 const controls=el("div",undefined,"controls");host.append(controls);const prev=button("Previous",()=>p.step(-1)),play=button("Play",()=>p.toggle()),next=button("Next",()=>p.step(1)),last=button("Last",()=>p.seek(frames.length-1)),reset=button("First",()=>p.seek(0));const seek=el("input");seek.type="range";seek.min=0;seek.value=0;seek.setAttribute("aria-label","Operation step");seek.addEventListener("input",()=>p.seek(Number(seek.value)));controls.append(reset,prev,play,next,last,seek);
 let g=presets.lecture.make(),positions=presets.lecture.positions,revision=null,name="Guided example",plan,frames=[];
 const p=player((f,i,n)=>{const end=f.final,changed=end&&["add","remove"].includes(plan.op)&&plan.results.matrix.result;status.textContent="Step "+(i+1)+" / "+n;message.textContent=end?"Same operation, same answer. Compare reads and conceptual storage writes below.":"Each representation advances independently by one read until its scan completes.";
 beforeView.draw(plan.before,{edge:[plan.u,plan.v],selected:plan.u});afterBox.hidden=!changed;if(changed)afterView.draw(plan.after,{edge:[plan.u,plan.v]});
 for(const k of kinds){const a=panels[k],z=plan.results[k],reads=Math.min(f.read,z.reads),seen=z.addresses.slice(0,reads),active=!end&&f.read>0&&f.read<=z.reads?z.addresses[f.read-1]:null;a.counter.textContent=reads+" read"+(reads===1?"":"s")+" · "+(end?z.writes:0)+" conceptual writes";storage(a.body,changed?plan.after:plan.before,k,plan.op,plan.u,plan.v,changed?null:active,changed?[]:seen,changed);a.old.hidden=!changed;if(changed)a.old.open=true;if(changed)storage(a.oldBody,plan.before,k,plan.op,plan.u,plan.v,null,seen,false);a.result.textContent=end?(plan.op==="neighbors"?"Sorted returned copy: ":"Result: ")+JSON.stringify(z.result)+(changed?" · logical edges "+plan.before.edges.length+" → "+plan.after.edges.length:""):active?z.steps[reads-1]??"Read storage position":reads===z.reads?"Scan complete":"Ready";}
 },(i,n,playing)=>{seek.max=Math.max(0,n-1);seek.value=i;play.textContent=playing?"Pause":"Play";prev.disabled=!n||i===0;next.disabled=!n||i===n-1;for(const b of [play,last,reset,seek])b.disabled=!n});
 function resetIds(u,v){for(const [s,preferred] of [[from,u],[to,v]]){s.replaceChildren();for(const x of g.vertices){const o=el("option",x);o.value=x;s.append(o)}if(g.vertices.includes(preferred))s.value=preferred}weight.disabled=!g.weighted}
 function refreshSource(){sourceStatus.textContent=name+" · "+g.vertices.length+" vertices · "+g.edges.length+" edges"+(revision!==null&&getSnapshot().revision!==revision?" · A newer main-editor graph is available; reimport to update.":"")+". Changes here never mutate the editor."}
 function run(){p.clear();try{if(!g.vertices.length&&op.value==="count"){plan={before:copy(g),after:copy(g),op:"count",u:null,v:null,steps:1,results:Object.fromEntries(kinds.map(k=>[k,{reads:1,writes:0,result:0,addresses:["counter"],steps:["Read maintained logical edge counter."]}]))}}else{if(!g.vertices.length)throw Error("Choose a graph with at least one vertex.");if(g.weighted&&op.value==="add"&&(!weight.value.trim()||!weight.checkValidity()))throw Error("Enter a valid weight.");plan=comparisonPlan(g,op.value,Number(from.value),Number(to.value),Number(weight.value))}beforeView.reset(positions);afterView.reset(positions);frames=[...Array.from({length:plan.steps+1},(_,read)=>({read,final:false})),{read:plan.steps,final:true}];p.load(frames)}catch(e){message.textContent=e.message;status.textContent="No active comparison.";afterBox.hidden=true;for(const a of Object.values(panels)){a.body.replaceChildren();a.counter.textContent="";a.result.textContent="";a.old.hidden=true}}refreshSource()}
 function guided(){const k=example.value;revision=null;name="Guided: "+example.selectedOptions[0].textContent;const preset=k==="remove"||k==="add"?presets.tree:presets.lecture;g=preset.make();positions=preset.positions;op.value=k==="remove"?"remove":k==="add"?"add":"has";resetIds(k==="existing"?2:k==="missing"?0:k==="remove"?0:3,k==="existing"?0:k==="missing"?2:k==="remove"?1:6);run()}
 function importGraph(){const s=getSnapshot();g=copy(s.graph);positions=s.positions;revision=s.revision;name="Imported main-editor snapshot";resetIds(g.vertices[0],g.vertices[1]??g.vertices[0]);run()}
 example.addEventListener("change",guided);for(const s of [op,from,to])s.addEventListener("change",run);guided();return {importGraph,refreshSource};
}

import {graph,addEdge,removeEdge,updateWeight,addVertex,removeVertex,representations,stats,operation,randomGraph,treeInfo} from "../../assets/js/core/graph-model.mjs";
import {renderer} from "../../assets/js/core/graph-renderer.mjs";
import {presets} from "./graph-presets.mjs";
import {$,el,on,put,clear,number,button,options,chips,metrics} from "./ui.mjs";
export function editor(changed){
 let g=presets.lecture.make(), selected=null, pair=null, next=0;
 const from=()=>Number($("from").value),to=()=>Number($("to").value);
 const label=e=>String(e[0])+(g.directed?" → ":" — ")+e[1]+(g.weighted?" ("+e[2]+")":"");
 const report=t=>put("graph-message",t);
 const guard=fn=>{try{fn()}catch(e){report(e.message)}};
 const mark=(u,v)=>pair&&(pair[0]===u&&pair[1]===v||!g.directed&&pair[0]===v&&pair[1]===u);
 function select(u,v){$("from").value=u;$("to").value=v;pair=[u,v];selected=null;draw()}
 const view=renderer($("graph-svg"),{onVertex(v){if(next===0){$("from").value=v;next=1}else{$("to").value=v;next=0}selected=v;pair=null;draw()},onEdge:select});
 function draw(){
  const r=representations(g),s=stats(g),t=treeInfo(g);
  view.draw(g,{selected,edge:pair});
  metrics("graph-metrics",[["Vertices",s.V],["Logical edges",s.E],["Adjacency entries",s.entries],["Self-loops",s.loops]]);
  put("graph-text",(g.directed?"Directed":"Undirected")+"; vertices: "+(g.vertices.join(", ")||"none")+"; edges: "+(g.edges.map(label).join("; ")||"none"));
  put("tree-state",t?"Components: "+t.components+"; cycle: "+(t.cycle?"yes":"no")+"; tree: "+(t.tree?"yes":"no"):"Tree test applies to undirected graphs.");
  const m=el("table",undefined,"data matrix"),head=el("thead"),hr=el("tr"),body=el("tbody"),flat=[];
  hr.append(el("th","u / v"));for(const v of r.ids){const h=el("th",v);h.scope="col";hr.append(h)}head.append(hr);m.append(head);
  for(const [i,u] of r.ids.entries()){
   const row=el("tr"),h=el("th");h.scope="row";h.append(button(String(u),()=>{selected=u;pair=null;draw()}));row.append(h);
   for(const [j,v] of r.ids.entries()){
    const w=r.matrix[i][j],value=g.weighted?(w??"∅"):(w===null?0:1),td=el("td");
    const c=button(String(value),()=>guard(()=>{if(w===null)addEdge(g,u,v,g.weighted?number("weight"):1);else removeEdge(g,u,v);pair=[u,v];selected=null;sync();report("Matrix cell toggled.")}),(w!==null?"present ":"")+(mark(u,v)||selected===u?"highlight":""));
    c.setAttribute("aria-label","Toggle edge "+u+" to "+v+", currently "+value);td.append(c);row.append(td);flat.push(String(i*r.ids.length+j)+":"+value);
   }body.append(row);
  }m.append(body);$("matrix").replaceChildren(m);chips("flat",flat);
  clear("list");for(const [i,u] of r.ids.entries()){const row=el("div",undefined,"bucket");row.append(button(u+" →",()=>{selected=u;pair=null;draw()}));for(const [v,w] of r.list[i]){const c=button(String(v)+(g.weighted?" ("+w+")":""),()=>select(u,v));if(mark(u,v)||selected===u)c.style.outline="2px solid #d97706";row.append(c)}if(!r.list[i].length)row.append(el("span","∅"));$("list").append(row)}
  $("edges").replaceChildren(...g.edges.map(e=>{const c=button(label(e),()=>select(e[0],e[1]));if(mark(e[0],e[1]))c.style.outline="2px solid #d97706";return c}));if(!g.edges.length)$("edges").append(el("span","∅"));
  if(selected!==null&&r.index.has(selected)){const i=r.index.get(selected),out=r.list[i].length,loops=r.list[i].filter(e=>e[0]===selected).length,indeg=r.matrix.reduce((n,row)=>n+(row[i]!==null?1:0),0);put("selection","Vertex "+selected+"; "+(g.directed?"out-degree "+out+", in-degree "+indeg:"degree "+(out+loops))+"; sorted neighbours: "+r.list[i].map(e=>e[0]).sort((a,b)=>a-b).join(", "))}else put("selection",pair?"Selected pair: "+pair.join(" → "):"Select an edge or vertex.");
 }
 function sync(reset=false){if(reset)view.reset();const ids=g.vertices.map(v=>[v,String(v)]);options("from",ids);options("to",ids);$("direction").value=g.directed?"directed":"undirected";$("weight-mode").value=g.weighted?"weighted":"plain";$("weight").disabled=!g.weighted;const lab=$("mode").value==="lab";$("weight-mode").disabled=lab;$("add-vertex").disabled=lab||g.vertices.length>=16;$("remove-vertex").disabled=lab||!g.vertices.length;$("update-weight").disabled=!g.weighted||!g.edges.length;for(const id of ["add-edge","remove-edge","run-op"])$(id).disabled=!g.vertices.length;if(selected!==null&&!g.vertices.includes(selected))selected=null;if(pair&&!pair.every(v=>g.vertices.includes(v)))pair=null;draw();clear("op-result");changed(g)}
 function load(name){let x=presets[name].make();if($("mode").value==="lab")x=graph(Array.from({length:g.vertices.length},(_,i)=>i),x.edges.filter(e=>e[0]<g.vertices.length&&e[1]<g.vertices.length).map(e=>e.slice(0,2)),x.directed);g=x;$("preset").value=name;selected=null;pair=null;sync(true);report("Loaded "+presets[name].label)}
 options("preset",Object.entries(presets).map(([k,v])=>[k,v.label]),"lecture");on("preset","change",()=>load($("preset").value));on("reset","click",()=>load($("preset").value));
 on("load-tree","click",()=>{$("mode").value="explore";load("tree")});
 on("mode","change",()=>{if($("mode").value==="lab"){if(!window.confirm("Start a fixed unweighted graph? Existing edges will be cleared.")){$("mode").value="explore";return}g=graph(Array.from({length:g.vertices.length},(_,i)=>i),[],g.directed);selected=null;pair=null}sync(true)});
 for(const id of ["direction","weight-mode"])on(id,"change",()=>{if(!window.confirm("Changing this setting clears all edges. Continue?")){sync();return}g=graph(g.vertices,[],$("direction").value==="directed",$("weight-mode").value==="weighted");selected=null;pair=null;sync()});
 on("from","change",()=>{selected=from();pair=null;draw()});on("to","change",()=>{selected=null;pair=[from(),to()];draw()});
 on("add-edge","click",()=>guard(()=>{const u=from(),v=to(),ok=addEdge(g,u,v,g.weighted?number("weight"):1);selected=null;pair=[u,v];sync();report(ok?"Inserted edge.":"Duplicate: no change.")}));
 on("update-weight","click",()=>guard(()=>{const u=from(),v=to();if(!updateWeight(g,u,v,number("weight")))throw Error("No such edge.");pair=[u,v];selected=null;sync();report("Weight updated.")}));
 on("remove-edge","click",()=>guard(()=>{const ok=removeEdge(g,from(),to());sync();report(ok?"Removed edge.":"Missing edge: no change.")}));
 on("add-vertex","click",()=>guard(()=>{selected=addVertex(g);pair=null;sync(true);report("Vertex added.")}));
 on("remove-vertex","click",()=>guard(()=>{removeVertex(g,from());selected=null;pair=null;sync(true);report("Vertex and incident edges removed.")}));
 on("random","click",()=>guard(()=>{const n=$("mode").value==="lab"?g.vertices.length:number("random-n");g=randomGraph(n,number("random-p"),g.directed,number("random-seed"));selected=null;pair=null;sync(true);report("Seeded unweighted graph generated.")}));
 on("export","click",()=>{$("graph-json").value=JSON.stringify({version:1,...g},null,2);report("Graph exported.")});
 on("import","click",()=>guard(()=>{if($("graph-json").value.length>40000)throw Error("JSON too large.");const d=JSON.parse($("graph-json").value);if(d.version!==1)throw Error("Expected version 1.");const x=graph(d.vertices,d.edges,d.directed,d.weighted);if($("mode").value==="lab"&&(x.weighted||x.vertices.length!==g.vertices.length||x.vertices.some((v,i)=>v!==i)))throw Error("Import must preserve fixed unweighted lab vertices.");g=x;selected=null;pair=null;sync(true);report("Valid graph imported.")}));
 on("run-op","click",()=>guard(()=>{clear("op-result");for(const [kind,title] of [["edges","Edge list"],["matrix","Matrix"],["list","Adjacency list"]]){const z=operation(g,kind,$("operation").value,from(),to()),p=el("article",undefined,"panel"),d=el("details"),list=el("ol");p.append(el("h4",title),el("p","Reads: "+z.reads+" · conceptual writes: "+z.writes),el("p","Result: "+JSON.stringify(z.result)));d.append(el("summary","Trace ("+z.steps.length+" events)"));for(const step of z.steps)list.append(el("li",step));d.append(list);p.append(d);$("op-result").append(p)}}));
 sync(true);
 return {get:()=>g};
}

import {trace,pathTo} from "../../assets/js/core/graph-model.mjs";
import {renderer} from "../../assets/js/core/graph-renderer.mjs";
import {player} from "../../assets/js/core/playback.mjs";
import {$,el,on,put,clear,options,chips,metrics,table} from "./ui.mjs";
export function traversal(){
 let g=null,frames=[],algorithm="bfs";
 const view=renderer($("algo-svg"));
 const lines={bfs:["Discover and enqueue root","Dequeue","Examine neighbour","Discover, set distance, enqueue","Finish vertex","Complete"],dfs:["Enter frame / discover","Resume frame","Examine next neighbour","Skip discovered","Finish and backtrack","Complete"],dijkstra:["Initialize heap","Pop minimum; settle or skip stale","Examine and relax","Improve and push pair","Finish vertex","Complete"]};
 function display(st,i,n){
  view.draw(g,st);put("event",st.message);put("step-label","Step "+(i+1)+" / "+n);
  put("algo-state","Discovered: "+st.seen.join(", ")+" · processed: "+st.done.join(", ")+" · order: "+st.visit.join(" → "));
  chips("frontier",st.frontier.map(x=>Array.isArray(x)?(algorithm==="dijkstra"?"("+x[0]+", "+x[1]+")":"("+x[0]+", next "+x[1]+")"):x));
  const l=lines[algorithm==="recursive"?"dfs":algorithm];$("pseudocode").replaceChildren(...l.map((t,j)=>el("li",t,j===st.line?"active-line":"")));
  metrics("algo-metrics",[["Scanned positions",st.scanned],["Edges examined",st.examined],["Maximum frontier",st.maxFrontier]]);
  table("algo-table",["Vertex",algorithm==="dfs"||algorithm==="recursive"?"Tree depth":"Distance","Parent","Entry","Exit"],g.vertices.map(v=>[v,st.dist[v]??"∞",st.parent[v]??"—",st.enter[v]??"—",st.exit[v]??"—"]));
  const target=$("target").value;if(target!==""&&st.seen.includes(Number(target))&&(algorithm!=="dijkstra"||st.done.includes(Number(target)))){const p=pathTo(st.parent,Number($("source").value),Number(target));if(p.length)$("algo-state").append(el("p","Parent path: "+p.join(" → ")))}
 }
 const playback=player(display,(i,n,playing)=>{const seek=$("seek");seek.max=Math.max(0,n-1);seek.value=i;put("play",playing?"Pause":"Play");for(const id of ["first","prev","play","next","last","seek"])$(id).disabled=!n;$("prev").disabled=!n||i===0;$("next").disabled=!n||i===n-1;if(!n)put("step-label","No active trace.")});
 function invalidate(){playback.clear();frames=[];view.reset();view.draw(g);for(const id of ["algo-table","algo-state","frontier","algo-metrics","pseudocode","comparison"])clear(id);put("event","Graph or controls changed. Run a new trace.")}
 function update(next){g=next;const ids=g.vertices.map(v=>[v,String(v)]);options("source",ids);options("target",[["","None"],...ids]);$("run").disabled=$("compare").disabled=!g.vertices.length;invalidate()}
 function run(){try{algorithm=$("algo").value;const target=$("target").value;frames=trace(g,{algorithm,kind:$("rep").value,source:Number($("source").value),target:target===""?null:Number(target),forest:$("forest").checked&&target==="",order:$("order").value});view.reset();playback.load(frames)}catch(e){invalidate();put("event",e.message)}}
 on("run","click",run);for(const id of ["algo","rep","source","target","order","forest"])on(id,"change",invalidate);
 on("first","click",()=>playback.seek(0));on("prev","click",()=>playback.step(-1));on("next","click",()=>playback.step(1));on("last","click",()=>playback.seek(frames.length-1));on("play","click",()=>playback.toggle());on("seek","input",()=>playback.seek(Number($("seek").value)));on("speed","change",()=>playback.speed(Number($("speed").value)));
 on("compare","click",()=>{try{const rows=[];for(const algorithm of ["bfs","dfs"])for(const kind of ["list","matrix"]){const a=trace(g,{algorithm,kind,source:Number($("source").value),forest:$("forest").checked,order:$("order").value}).at(-1);rows.push([algorithm.toUpperCase(),kind,a.visit.join(" → "),a.scanned,a.examined,a.maxFrontier])}table("comparison",["Algorithm","Storage","Order","Scans","Edges","Max frontier"],rows)}catch(e){put("comparison",e.message)}});
 return {update,run};
}

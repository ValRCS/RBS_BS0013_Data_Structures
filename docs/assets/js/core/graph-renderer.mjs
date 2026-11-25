const NS="http://www.w3.org/2000/svg";
let nextId=0;
function svgEl(name,attrs={},value){const e=document.createElementNS(NS,name);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));if(value!==undefined)e.textContent=value;return e}
export function renderer(svg,{onVertex=()=>{},onEdge=()=>{},onMove=()=>{}}={}){
 const marker="graph-arrow-"+(++nextId);let positions=new Map(),g,state={},drag=null;
 function reset(){positions=new Map()}
 function draw(graph,view={}){
  g=graph;state=view;const ids=g.vertices, n=ids.length;for(const [i,v] of ids.entries())if(!positions.has(v)){const a=-Math.PI/2+i*2*Math.PI/Math.max(n,1);positions.set(v,n===1?[240,145]:[240+175*Math.cos(a),145+105*Math.sin(a)])}
  for(const id of positions.keys())if(!ids.includes(id))positions.delete(id);
  svg.replaceChildren();svg.setAttribute("viewBox","0 0 480 290");svg.setAttribute("role","img");svg.setAttribute("aria-label",(g.directed?"Directed":"Undirected")+" graph; vertices "+ids.join(", ")+"; edges "+g.edges.map(e=>e[0]+" to "+e[1]+(g.weighted?", weight "+e[2]:"")).join("; "));
  const defs=svgEl("defs"),m=svgEl("marker",{id:marker,viewBox:"0 0 10 10",refX:9,refY:5,markerWidth:7,markerHeight:7,orient:"auto-start-reverse"});m.append(svgEl("path",{d:"M0 0 L10 5 L0 10 Z",class:"arrow-tip"}));defs.append(m);svg.append(defs);
  for(const [u,v,w] of g.edges){const [x,y]=positions.get(u),[a,b]=positions.get(v),active=view.edge&&(view.edge[0]===u&&view.edge[1]===v||!g.directed&&view.edge[0]===v&&view.edge[1]===u),pathEdge=view.path?.some((node,i,a)=>i>0&&(a[i-1]===u&&node===v||!g.directed&&a[i-1]===v&&node===u)),parent=view.parent&&(view.parent[v]===u||!g.directed&&view.parent[u]===v);let d,lx,ly;
   if(u===v){d="M "+(x-11)+" "+(y-13)+" C "+(x-43)+" "+(y-61)+" "+(x+43)+" "+(y-61)+" "+(x+11)+" "+(y-13);lx=x;ly=y-47}
   else{const dx=a-x,dy=b-y,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len,rev=g.directed&&g.edges.some(e=>e[0]===v&&e[1]===u),bend=rev?23:0;lx=(x+a)/2-uy*bend;ly=(y+b)/2+ux*bend;d="M "+(x+ux*17)+" "+(y+uy*17)+" Q "+lx+" "+ly+" "+(a-ux*22)+" "+(b-uy*22)}
   const p=svgEl("path",{d,class:"graph-edge"+(pathEdge?" final-path":active?" active":parent?" parent":""),...(g.directed?{"marker-end":"url(#"+marker+")"}:{})});svg.append(p);const hit=svgEl("path",{d,class:"edge-hit"});hit.addEventListener("click",()=>onEdge(u,v));svg.append(hit);if(g.weighted)svg.append(svgEl("text",{x:lx,y:ly-5,class:"edge-weight","text-anchor":"middle"},w));}
  for(const v of ids){const [x,y]=positions.get(v),status=view.current===v?"current":view.done?.includes(v)?"done":view.seen?.includes(v)?"seen":view.selected===v?"selected":"idle";const el=svgEl("g",{class:"graph-node "+status,"data-vertex":v});el.append(svgEl("circle",{cx:x,cy:y,r:17}),svgEl("text",{x,y:y+5,"text-anchor":"middle"},v));el.addEventListener("pointerdown",e=>{drag={v,x:e.clientX,y:e.clientY,moved:false};svg.setPointerCapture?.(e.pointerId)});svg.append(el);if(view.labels){svg.append(svgEl("text",{x,y:y+32,"text-anchor":"middle",class:"distance-label"},(view.labels[v]??"∞")));}}
  if(!ids.length)svg.append(svgEl("text",{x:240,y:145,"text-anchor":"middle",class:"edge-weight"},"Empty graph"));
 }
 svg.addEventListener("pointermove",e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>4)drag.moved=true;if(!drag.moved)return;const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(svg.getScreenCTM().inverse());positions.set(drag.v,[Math.max(42,Math.min(438,q.x)),Math.max(55,Math.min(262,q.y))]);draw(g,state);onMove(drag.v)});
 svg.addEventListener("pointerup",()=>{if(drag&&!drag.moved)onVertex(drag.v);drag=null});svg.addEventListener("pointercancel",()=>drag=null);
 return {draw,reset};
}

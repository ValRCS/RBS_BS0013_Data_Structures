// Stable allocation IDs; no AVL-specific warnings. Safe even for malformed challenge graphs.
const NS="http://www.w3.org/2000/svg";
function el(t,a={},s){const e=document.createElementNS(NS,t);for(const [k,v] of Object.entries(a))e.setAttribute(k,v);if(s!==undefined)e.textContent=s;return e}
export function draw(svg,s,{active=null,path=[],selected=null,excluded=null,onSelect=()=>{},nulls=false}={}){
 svg.replaceChildren();const positions=new Map(),edges=[],missing=[],seen=new Set();let i=0,depth=0;
 function walk(id,d){if(id===null||seen.has(id)||!s.nodes[id])return;seen.add(id);const n=s.nodes[id];walk(n.left,d+1);positions.set(id,{x:55+i++*108,y:42+d*84});depth=Math.max(depth,d);walk(n.right,d+1);for(const side of ["left","right"]){if(n[side]!==null)edges.push([id,n[side],side]);else if(nulls)missing.push([id,side])}}
 walk(s.root,0);for(const id of Object.keys(s.nodes))if(!positions.has(id))positions.set(id,{x:55+i++*108,y:42+(depth+1)*84});
 const w=Math.max(330,i*108+10),h=120+(depth+1)*84;svg.setAttribute("viewBox","0 0 "+w+" "+h);svg.style.minWidth=w+"px";svg.setAttribute("aria-label","Binary tree with "+Object.keys(s.nodes).length+" allocated nodes");
 if(!positions.size){svg.append(el("text",{x:165,y:45,"text-anchor":"middle",fill:"currentColor"},"Empty tree — root_ = nullptr"));return}
 for(const [a,b,side] of edges){const p=positions.get(a),q=positions.get(b);if(!q)continue;svg.append(el("line",{x1:p.x,y1:p.y,x2:q.x,y2:q.y,class:"bst-edge"+(path.includes(a)&&path.includes(b)?" visited":"")}));svg.append(el("text",{x:(p.x+q.x)/2+5,y:(p.y+q.y)/2-4,class:"bst-link-label"},side==="left"?"L":"R"))}
 for(const [id,side] of missing){const p=positions.get(id),x=p.x+(side==="left"?-22:22);svg.append(el("line",{x1:p.x,y1:p.y+20,x2:x,y2:p.y+38,class:"bst-null"}),el("text",{x,y:p.y+49,class:"bst-link-label","text-anchor":"middle"},"∅"))}
 const excludedIds=new Set();function mark(id){if(id===null||excludedIds.has(id)||!s.nodes[id])return;excludedIds.add(id);mark(s.nodes[id].left);mark(s.nodes[id].right)}mark(excluded);
 for(const [id,p] of positions){const n=s.nodes[id],g=el("g",{class:"bst-node"+(active===id||selected===id?" active":path.includes(id)?" visited":"")+(excludedIds.has(id)?" excluded":"")+(seen.has(id)?"":" detached"),tabindex:0,role:"button","aria-label":id+", key "+n.key});g.append(el("circle",{cx:p.x,cy:p.y,r:25}),el("text",{x:p.x,y:p.y+4,"text-anchor":"middle"},n.key),el("text",{x:p.x,y:p.y+34,"text-anchor":"middle",class:"bst-id"},id));g.onclick=()=>onSelect(id);g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelect(id)}};svg.append(g)}
}


export function renderTree(host,root,active=null,slot=null,linked=false){
 if(!root){host.textContent="Empty tree (height 0)";return}
 const NS="http://www.w3.org/2000/svg",items=[],edges=[],leaves=[];
 const width=n=>Math.max(64,n.keys.length*45+12);
 function place(n,depth,left){const w=width(n);let total=w,x=left+w/2;
 if(n.children.length){let p=left;const children=[];for(const c of n.children){const q=place(c,depth+1,p);children.push(q);p+=q.total+20}total=Math.max(w,p-left-20);x=left+total/2;for(let i=0;i<children.length;i++)edges.push({x:x-w/2+8+i*(w-16)/Math.max(1,children.length-1),y:depth*85+48,to:children[i].x,ty:(depth+1)*85+14})}else leaves.push({x,y:depth*85+31,w});
 items.push({n,x,y:depth*85+14,w});return {x,total}}
 const layout=place(root,0,12),maxX=Math.max(...items.map(a=>a.x+a.w/2))+12,h=Math.max(...items.map(a=>a.y))+55;
 const svg=document.createElementNS(NS,"svg");svg.setAttribute("viewBox","0 0 "+maxX+" "+h);svg.setAttribute("width",String(Math.max(340,maxX)));svg.setAttribute("role","img");svg.setAttribute("aria-label","Tree diagram with keys and child edges");
 const add=(tag,attrs,txt)=>{const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));if(txt!==undefined)e.textContent=txt;svg.append(e);return e};
 for(const e of edges)add("line",{x1:e.x,y1:e.y,x2:e.to,y2:e.ty,class:"bt-edge"});
 if(linked)for(let i=1;i<leaves.length;i++){const a=leaves[i-1],b=leaves[i];add("line",{x1:a.x+a.w/2,y1:a.y,x2:b.x-b.w/2,y2:b.y,class:"bt-link"});add("text",{x:(a.x+a.w/2+b.x-b.w/2)/2,y:b.y-3,class:"bt-label","text-anchor":"middle"},"→")}
 for(const {n,x,y,w} of items){const on=Array.isArray(active)?active.includes(n.id):n.id===active;add("rect",{x:x-w/2,y,width:w,height:34,rx:5,class:"bt-node"+(on?" bt-active":"")+(linked&&n.children.length?" bt-separator":"")});
 n.keys.forEach((k,i)=>{const sw=(w-12)/n.keys.length,cx=x-w/2+6+(i+.5)*sw;if(on&&slot===i)add("rect",{x:cx-sw/2,y:y+2,width:sw,height:30,rx:3,class:"bt-slot"});if(i)add("line",{x1:cx-sw/2,y1:y+3,x2:cx-sw/2,y2:y+31,class:"bt-edge"});add("text",{x:cx,y:y+22,"text-anchor":"middle",class:"bt-label"},k)});add("text",{x,y:y+46,"text-anchor":"middle",class:"bt-small"},n.id)}
 host.replaceChildren(svg);
}

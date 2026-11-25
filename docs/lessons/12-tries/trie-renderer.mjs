
const ns="http://www.w3.org/2000/svg";
function svg(tag,attrs,text){const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n}
export function draw(host,rows,active="",query="",compressed=null){
const children=new Map(rows.map(r=>[r.prefix,[]])),edges=compressed||rows.filter(r=>r.prefix).map(r=>({from:r.prefix.slice(0,-1),to:r.prefix,label:r.prefix.slice(-1)}));for(const e of edges)children.get(e.from).push(e.to);
let leaf=0,depth=0;const positions=new Map();function layout(p,d){depth=Math.max(depth,d);const xs=children.get(p).map(c=>layout(c,d+1));const x=xs.length?(xs[0]+xs.at(-1))/2:leaf++;positions.set(p,{x,d});return x}layout("",0);
const w=Math.max(320,leaf*86+50),h=90+depth*68;const coord=p=>{const v=positions.get(p);return{x:leaf===1?w/2:40+v.x*(w-80)/Math.max(1,leaf-1),y:35+68*v.d}};
const root=svg("svg",{viewBox:"0 0 "+w+" "+h,width:w,height:h,role:"img","aria-label":"Trie with "+rows.length+" nodes. Double outline means terminal."});
for(const e of edges){const a=coord(e.from),b=coord(e.to);root.append(svg("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:query&&query.startsWith(e.to)?"trie-edge path":"trie-edge"}));if(compressed)root.append(svg("text",{x:(a.x+b.x)/2+7,y:(a.y+b.y)/2,class:"edge-label"},e.label))}
for(const r of rows){const p=coord(r.prefix),g=svg("g",{class:"trie-node"+(r.terminal?" terminal":"")+(r.prefix===active?" active":"")});g.append(svg("title",{},(r.prefix||"root")+(r.terminal?" — terminal":" — nonterminal")),svg("circle",{cx:p.x,cy:p.y,r:17}));if(r.terminal)g.append(svg("circle",{cx:p.x,cy:p.y,r:13,class:"inner"}));g.append(svg("text",{x:p.x,y:p.y+5,"text-anchor":"middle"},compressed?(r.prefix?"•":"ε"):(r.prefix.slice(-1)||"ε")));if(r.terminal)g.append(svg("text",{x:p.x,y:p.y+31,"text-anchor":"middle",class:"word-label"},r.prefix));root.append(g)}host.replaceChildren(root);
}

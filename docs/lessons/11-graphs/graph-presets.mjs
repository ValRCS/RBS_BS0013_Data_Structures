import {graph} from "../../assets/js/core/graph-model.mjs";
const range=n=>Array.from({length:n},(_,i)=>i);
const row=n=>range(n).map(i=>[55+i*370/Math.max(n-1,1),145]);
const grid=(w,h)=>range(w*h).map(i=>[80+(i%w)*320/Math.max(1,w-1),60+Math.floor(i/w)*165/Math.max(1,h-1)]);
const circle=(n,cx=240,cy=145,rx=170,ry=95)=>range(n).map(i=>[cx+rx*Math.cos(-Math.PI/2+i*2*Math.PI/n),cy+ry*Math.sin(-Math.PI/2+i*2*Math.PI/n)]);
const tree=[[240,55],[130,130],[350,130],[65,225],[185,225],[295,225],[415,225]];
const bip=[[100,60],[100,145],[100,230],[380,60],[380,145],[380,230]];
const clusters=[[55,75],[55,215],[170,145],[310,145],[425,75],[425,215]];
const diamond=[[240,55],[110,145],[370,145],[240,230]];
const path=n=>range(n-1).map(i=>[i,i+1]);
const gridEdges=range(9).flatMap(i=>[...(i%3<2?[[i,i+1]]:[]),...(i<6?[[i,i+3]]:[])]);
const preset=(label,category,description,n,e,d=false,w=false,positions=circle(n),source=0,target=null)=>({label,category,description,positions:Object.fromEntries(positions.map((p,i)=>[i,p])),source,target,make:()=>graph(range(n),e,d,w)});
export const presets={
 lecture:preset("Lecture: directed cycle","Directed","A cycle plus a sink; compare reachability and isolation.",4,[[0,1],[0,3],[1,2],[2,0]],true,false,[[100,60],[330,60],[230,225],[100,225]]),
 tree:preset("Balanced binary tree topology (not a BST)","Trees","Root at vertex 0; identifiers are not ordered search keys.",7,[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]],false,false,tree),
 cycle:preset("Undirected cycle","Fundamental","Every vertex has degree two.",5,[...path(5),[4,0]]),
 complete:preset("Complete graph K5","Fundamental","Every distinct pair is adjacent.",5,range(5).flatMap(i=>range(5-i-1).map(j=>[i,i+j+1]))),
 disconnected:preset("Disconnected graph + isolated vertex","Connectivity","Two nontrivial components and one isolate.",7,[[0,1],[1,2],[2,0],[3,4],[4,5]],false,false,[[60,60],[60,175],[170,120],[285,60],[385,60],[385,175],[240,230]]),
 bipartite:preset("Bipartite graph","Structured","Edges cross between two vertex partitions.",6,[[0,3],[0,4],[1,4],[1,5],[2,3],[2,5]],false,false,bip),
 star:preset("Star (six vertices)","Fundamental","Source 0 exposes a five-entry BFS frontier.",6,range(5).map(i=>[0,i+1]),false,false,[[240,145],...circle(5)]),
 dag:preset("Software dependency DAG","Directed","Dependencies flow left to right.",6,[[0,2],[1,2],[1,3],[2,4],[3,4],[4,5]],true,false,[[55,65],[55,215],[180,65],[180,215],[305,145],[425,145]]),
 loops:preset("Self-loops and reciprocal arcs","Directed","Loops count once logically; reciprocal arcs are distinct.",4,[[0,0],[0,1],[1,0],[2,2]],true,false,[[100,100],[365,100],[100,220],[365,220]]),
 routes:preset("Weighted transport network (fictional)","Weighted","Two hops cost 20; three hops cost 7.",5,[[0,1,10],[1,4,10],[0,2,2],[2,3,3],[3,4,2]],false,true,[[55,145],[240,55],[165,220],[315,220],[425,145]],0,4),
 stale:preset("Dijkstra: stale entries and zero weight","Weighted","Distance 10 improves to 3; vertex 4 is unreachable.",5,[[0,1,10],[0,2,2],[2,1,1],[1,3,0]],true,true,[[55,145],[240,65],[240,220],[425,65],[425,220]]),
 empty:preset("Empty graph","Fundamental","No vertices or edges.",0,[]),
 singleton:preset("Singleton","Fundamental","One vertex and no edges.",1,[],false,false,[[240,145]]),
 path:preset("Path P7","Fundamental","A narrow BFS frontier and deep DFS stack.",7,path(7),false,false,row(7),0,6),
 unbalanced:preset("Unbalanced rooted tree","Trees","Root 0 has a short and a long branch.",7,[[0,1],[0,2],[2,3],[3,4],[4,5],[5,6]],false,false,[[160,50],[55,115],[255,90],[330,125],[385,160],[425,205],[350,245]]),
 grid:preset("3 × 3 grid","Structured","Multiple shortest paths; wavefront layers.",9,gridEdges,false,false,grid(3,3),0,8),
 k33:preset("Complete bipartite K3,3","Structured","Every vertex connects to all vertices in the other partition.",6,range(3).flatMap(i=>range(3).map(j=>[i,j+3])),false,false,bip),
 wheel:preset("Wheel graph","Structured","Central versus peripheral source.",6,[...range(5).map(i=>[i+1,(i+1)%5+1]),...range(5).map(i=>[0,i+1])],false,false,[[240,145],...circle(5)]),
 bridge:preset("Two clusters with a bridge","Connectivity","A single edge connects two triangles.",6,[[0,1],[0,2],[1,2],[2,3],[3,4],[3,5],[4,5]],false,false,clusters),
 diamond:preset("Diamond graph","Structured","Equal-hop routes depend on neighbour order.",4,[[0,1],[0,2],[1,3],[2,3]],false,false,diamond,0,3),
 diamondDag:preset("Diamond DAG","Directed","Converging directed paths need not form a cycle.",4,[[0,1],[0,2],[1,3],[2,3]],true,false,diamond,0,3),
 chain:preset("One-way chain","Directed","Reachability depends on the source.",6,path(6),true,false,row(6),0,5),
 equal:preset("Equal-cost weighted paths","Weighted","Two shortest paths of equal total cost.",4,[[0,1,2],[0,2,1],[1,3,2],[2,3,3]],true,true,diamond,0,3),
 zero:preset("Zero-weight chain","Weighted","Zero weights are present edges.",4,[[0,1,0],[1,2,0],[2,3,2]],true,true,row(4),0,3),
 weightedGrid:preset("Weighted 3 × 3 grid","Weighted","Compare route costs across a grid.",9,gridEdges.map(([u,v],i)=>[u,v,1+(i*3)%7]),false,true,grid(3,3),0,8),
 weightedDisconnected:preset("Disconnected weighted graph","Weighted","A target in another component remains unreachable.",6,[[0,1,2],[1,2,3],[3,4,1]],false,true,clusters,0,4),
 negative:preset("Negative edge: Dijkstra rejects","Weighted","Dijkstra requires nonnegative weights; this example is intentionally rejected.",3,[[0,1,2],[1,2,-5],[0,2,1]],true,true,[[65,145],[240,65],[415,145]],0,2)
};
export function fillPresets(select,items,selected){select.replaceChildren();const groups=new Map();for(const [key,p] of Object.entries(items)){if(!groups.has(p.category)){const g=document.createElement("optgroup");g.label=p.category;groups.set(p.category,g);select.append(g)}const o=document.createElement("option");o.value=key;o.textContent=p.label;groups.get(p.category).append(o)}select.value=selected}

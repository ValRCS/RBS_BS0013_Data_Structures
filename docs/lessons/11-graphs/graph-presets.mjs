import {graph} from "../../assets/js/core/graph-model.mjs";
const make=(n,e,d=false,w=false)=>()=>graph(Array.from({length:n},(_,i)=>i),e,d,w);
export const presets={
 lecture:{label:"Lecture: directed cycle",make:make(4,[[0,1],[0,3],[1,2],[2,0]],true)},
 tree:{label:"Binary tree",make:make(7,[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]])},
 cycle:{label:"Undirected cycle",make:make(5,[[0,1],[1,2],[2,3],[3,4],[4,0]])},
 complete:{label:"Complete graph K5",make:make(5,Array.from({length:5},(_,i)=>Array.from({length:5-i-1},(_,j)=>[i,i+j+1])).flat())},
 disconnected:{label:"Disconnected graph + isolated vertex",make:make(7,[[0,1],[1,2],[2,0],[3,4],[4,5]])},
 bipartite:{label:"Bipartite graph",make:make(6,[[0,3],[0,4],[1,4],[1,5],[2,3],[2,5]])},
 star:{label:"Star",make:make(6,[[0,1],[0,2],[0,3],[0,4],[0,5]])},
 dag:{label:"Software dependency DAG",make:make(6,[[0,2],[1,2],[1,3],[2,4],[3,4],[4,5]],true)},
 loops:{label:"Self-loops and reciprocal arcs",make:make(4,[[0,0],[0,1],[1,0],[2,2]],true)},
 routes:{label:"Weighted transport network (fictional)",make:make(5,[[0,1,10],[1,4,10],[0,2,2],[2,3,3],[3,4,2]],false,true)},
 stale:{label:"Dijkstra: stale entries and zero weight",make:make(5,[[0,1,10],[0,2,2],[2,1,1],[1,3,0]],true,true)},
 empty:{label:"Empty graph",make:make(0,[])}
};

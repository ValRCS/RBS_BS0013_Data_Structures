// Week 11 pure graph model and instrumented algorithms. No DOM or dependencies.
function graph(vertices,edges=[],directed=false,weighted=false){
 if(!Array.isArray(vertices)||vertices.length>16||new Set(vertices).size!==vertices.length||vertices.some(v=>!Number.isSafeInteger(v)||v<0||v>1000000)||typeof directed!=="boolean"||typeof weighted!=="boolean"||!Array.isArray(edges)||edges.length>256)throw Error("Invalid graph (maximum 16 vertices).");
 const g={vertices:[...vertices].sort((a,b)=>a-b),edges:[],directed,weighted};
 for(const e of edges){if(!e||!Array.isArray(e)||e.length!==(weighted?3:2)||!addEdge(g,e[0],e[1],e[2]))throw Error("Invalid or duplicate edge.");}return g;
}

function key(g,u,v){return !g.directed&&u>v?[v,u]:[u,v]}

function check(g,u){if(!g.vertices.includes(u))throw Error("Invalid vertex: "+u)}

function addEdge(g,u,v,w=1){check(g,u);check(g,v);if(g.weighted&&(!Number.isFinite(w)||Math.abs(w)>1000000))throw Error("Weight must be finite and within ±1,000,000.");[u,v]=key(g,u,v);if(g.edges.some(e=>e[0]===u&&e[1]===v))return false;g.edges.push(g.weighted?[u,v,w]:[u,v]);return true}

function removeEdge(g,u,v){check(g,u);check(g,v);[u,v]=key(g,u,v);const i=g.edges.findIndex(e=>e[0]===u&&e[1]===v);if(i<0)return false;g.edges.splice(i,1);return true}

function addVertex(g){if(g.vertices.length>=16)throw Error("Visual graph limit: 16 vertices.");const v=g.vertices.length?Math.max(...g.vertices)+1:0;if(v>1000000)throw Error("Vertex ID limit reached.");g.vertices.push(v);return v}

function updateWeight(g,u,v,w){check(g,u);check(g,v);if(!g.weighted||!Number.isFinite(w)||Math.abs(w)>1000000)throw Error("Invalid weight or unweighted graph.");[u,v]=key(g,u,v);const e=g.edges.find(e=>e[0]===u&&e[1]===v);if(!e)return false;e[2]=w;return true}
function removeVertex(g,v){check(g,v);g.vertices=g.vertices.filter(u=>u!==v);g.edges=g.edges.filter(e=>e[0]!==v&&e[1]!==v)}

function representations(g){const ids=[...g.vertices],index=new Map(ids.map((v,i)=>[v,i])),matrix=ids.map(()=>ids.map(()=>null)),list=ids.map(()=>[]);for(const [u,v,w=1] of g.edges){matrix[index.get(u)][index.get(v)]=w;list[index.get(u)].push([v,w]);if(!g.directed&&u!==v){matrix[index.get(v)][index.get(u)]=w;list[index.get(v)].push([u,w])}}return {ids,index,matrix,list,edges:g.edges.map(e=>[...e])}}

function readNeighbors(rep,u,kind,counter){const i=rep.index.get(u);if(i===undefined)throw Error("Invalid vertex");if(kind==="matrix"){const row=rep.matrix[i];counter.scanned+=row.length;return row.flatMap((w,j)=>w===null?[]:[[rep.ids[j],w]])}const row=rep.list[i];counter.scanned+=row.length;return row.map(e=>[...e])}

function stats(g){const r=representations(g);return {V:g.vertices.length,E:g.edges.length,entries:r.list.reduce((n,a)=>n+a.length,0),loops:g.edges.filter(e=>e[0]===e[1]).length}}

function densityModel(V,p,directed,packed=false,idBytes=4,bucketBytes=24){if(!Number.isSafeInteger(V)||V<0||V>1000000||!Number.isFinite(p)||p<0||p>100||![4,8].includes(idBytes)||!Number.isFinite(bucketBytes)||bucketBytes<0)throw Error("Invalid storage parameters");const max=V*(V-1)/(directed?1:2),E=Math.round(max*p/100),entries=E*(directed?1:2);return {E,entries,matrix:packed?Math.ceil(V*V/8):V*V,list:V*bucketBytes+entries*idBytes,edge:E*2*idBytes}}

function operation(g,kind,op,u,v){check(g,u);if(op!=="neighbors"&&op!=="count")check(g,v);const r=representations(g),i=r.index.get(u),steps=[];let reads=0,writes=0,result,found=false;
 if(op==="count")return {steps:["Read maintained logical edge counter."],reads:1,writes:0,result:g.edges.length};
 if(kind==="matrix"){if(op==="neighbors"){result=[];for(let j=0;j<r.ids.length;j++){reads++;steps.push("Read cell ["+u+","+r.ids[j]+"] = "+(r.matrix[i][j]??"absent"));if(r.matrix[i][j]!==null)result.push(r.ids[j])}}else{reads++;found=r.matrix[i][r.index.get(v)]!==null;steps.push("Read cell ["+u+","+v+"]: "+(found?"present":"absent"));}}
 else if(kind==="list"){const scan=(a,b,all=false)=>{let f=false;for(const [n] of r.list[r.index.get(a)]){reads++;steps.push("Inspect bucket "+a+" entry "+n);if(n===b){f=true;if(!all)break}}return f};if(op==="neighbors"){scan(u,v,true);result=r.list[i].map(e=>e[0]).sort((a,b)=>a-b);steps.push("Copy raw neighbours and sort the returned copy (sorting comparisons not counted).")}else{found=scan(u,v);if(op==="remove"&&found&&!g.directed&&u!==v)scan(v,u)}}
 else {result=[];for(const e of r.edges){reads++;steps.push("Inspect edge ("+e[0]+","+e[1]+")");if(op==="neighbors"){if(e[0]===u)result.push(e[1]);else if(!g.directed&&e[1]===u)result.push(e[0]);}else if(e[0]===key(g,u,v)[0]&&e[1]===key(g,u,v)[1]){found=true;break}}if(op==="neighbors")result.sort((a,b)=>a-b)}
 if(op==="has")result=found;if(op==="add"||op==="remove"){result=op==="add"?!found:found;if(result){writes=kind==="edges"||g.directed||u===v?1:2;steps.push((op==="add"?"Insert":"Remove")+" "+writes+" logical storage position(s); update logical counter. Vector growth/copying and swap bookkeeping excluded.");}else steps.push("No change to graph.");}return {steps,reads,writes,result}}

function pathTo(parent,s,t){if(t===s)return [s];const path=[t],seen=new Set(path);while(t!==s){t=parent[t];if(t===undefined||t===null||seen.has(t))return [];path.push(t);seen.add(t)}return path.reverse()}

function heapPush(h,e){h.push(e);let i=h.length-1;while(i){const p=(i-1)>>1;if(heapLess(h[p],h[i]))break;[h[p],h[i]]=[h[i],h[p]];i=p}}

function heapLess(a,b){return a[0]<b[0]||(a[0]===b[0]&&a[1]<=b[1])}

function heapPop(h){const first=h[0],last=h.pop();if(h.length){h[0]=last;let i=0;while(true){let j=2*i+1;if(j>=h.length)break;if(j+1<h.length&&heapLess(h[j+1],h[j]))j++;if(heapLess(h[i],h[j]))break;[h[i],h[j]]=[h[j],h[i]];i=j}}return first}

function trace(g,{algorithm="bfs",kind="list",source=g.vertices[0],target=null,forest=false,order="ascending"}={}){
 const r=representations(g);check(g,source);if(target!==null)check(g,target);if(!["bfs","dfs","recursive","dijkstra","linear"].includes(algorithm)||!["list","matrix"].includes(kind))throw Error("Unknown traversal.");
 if(["dijkstra","linear"].includes(algorithm)&&g.edges.some(e=>(e[2]??1)<0))throw Error("Dijkstra requires nonnegative weights.");
 const states=[],seen=new Set(),done=new Set(),parent={},dist={},enter={},exit={},counter={scanned:0,examined:0},frontier=[],visit=[];let clock=0,maxFrontier=0,current=null,edge=null,relaxation=null,stale=null,selectionScans=0;const rootOf={};
 const emit=(line,message)=>{maxFrontier=Math.max(maxFrontier,frontier.length);states.push({line,message,current,relaxation:relaxation&&{...relaxation},stale:stale&&[...stale],selectionScans,rootOf:{...rootOf},edge:edge&&[...edge],seen:[...seen],done:[...done],parent:{...parent},dist:{...dist},enter:{...enter},exit:{...exit},frontier:frontier.map(x=>Array.isArray(x)?[...x]:x),visit:[...visit],scanned:counter.scanned,examined:counter.examined,maxFrontier})};
 const neighbors=u=>{const a=readNeighbors(r,u,kind,counter);if(order==="ascending")a.sort((a,b)=>a[0]-b[0]);if(order==="descending")a.sort((a,b)=>b[0]-a[0]);return a};
 const roots=forest&&!["dijkstra","linear"].includes(algorithm)?[source,...r.ids.filter(v=>v!==source)]:[source];
 let stopped=false;
 for(const root of roots){if(seen.has(root))continue;seen.add(root);parent[root]=null;dist[root]=0;rootOf[root]=root;current=root;edge=null;
 if(algorithm==="bfs"){frontier.push(root);emit(0,"Discover root "+root+" and enqueue.");
 if(root===target){stopped=true;break}
 while(frontier.length&&!stopped){current=frontier.shift();const u=current;visit.push(u);emit(1,"Dequeue "+u+".");for(const [v] of neighbors(u)){edge=[u,v];counter.examined++;emit(2,"Examine "+u+" → "+v+".");if(!seen.has(v)){seen.add(v);parent[v]=u;rootOf[v]=root;dist[v]=dist[u]+1;frontier.push(v);emit(3,"Discover "+v+", distance "+dist[v]+", enqueue.");if(v===target){stopped=true;break}}}if(!stopped){done.add(u);edge=null;emit(4,"Finish "+u+".")}}}
 else if(algorithm==="recursive"){
 const visitRec=u=>{current=u;visit.push(u);enter[u]=++clock;const adj=neighbors(u);frontier.push([u,0]);emit(0,"Enter recursive call "+u+".");if(u===target){stopped=true;return}
 for(const [v] of adj){current=u;frontier[frontier.length-1][1]++;edge=[u,v];counter.examined++;emit(2,"Examine "+u+" → "+v+".");if(!seen.has(v)){seen.add(v);parent[v]=u;rootOf[v]=root;dist[v]=dist[u]+1;edge=null;visitRec(v);if(stopped)return}else emit(3,"Already discovered: "+v+".")}
 current=u;done.add(u);exit[u]=++clock;frontier.pop();edge=null;emit(4,"Return from "+u+".");};
 visitRec(root);
 }
 else if(algorithm==="dfs"){
 const frames=[];const push=u=>{current=u;visit.push(u);enter[u]=++clock;frames.push({u,next:0,adj:neighbors(u)});frontier.push([u,0]);emit(0,"Enter "+u+".")};
 push(root);if(root===target)stopped=true;while(frames.length&&!stopped){const f=frames[frames.length-1];current=f.u;if(f.next===f.adj.length){done.add(f.u);exit[f.u]=++clock;frames.pop();frontier.pop();edge=null;emit(4,"Finish "+f.u+" and backtrack.");continue}
 const [v]=f.adj[f.next++];frontier[frontier.length-1][1]=f.next;edge=[f.u,v];counter.examined++;emit(2,"Examine "+f.u+" → "+v+".");if(!seen.has(v)){seen.add(v);parent[v]=f.u;rootOf[v]=root;dist[v]=dist[f.u]+1;edge=null;push(v);if(v===target)stopped=true}else emit(3,"Already discovered: "+v+".");}}
 else if(algorithm==="linear"){
 emit(0,"Initialize distance array.");while(true){let u=null,best=Infinity;for(const v of r.ids){selectionScans++;if(!done.has(v)&&(dist[v]??Infinity)<best){best=dist[v];u=v}}if(u===null)break;
 current=u;edge=null;relaxation=null;done.add(u);visit.push(u);emit(1,"Select minimum unsettled vertex "+u+" at distance "+best+".");if(u===target){stopped=true;break}
 for(const [v,w] of neighbors(u)){edge=[u,v];counter.examined++;const old=dist[v]??Infinity,candidate=best+w;relaxation={u,v,w,base:best,old,candidate,improved:candidate<old};emit(2,"Compare candidate "+candidate+" with "+(old===Infinity?"∞":old)+".");if(candidate<old){dist[v]=candidate;parent[v]=u;rootOf[v]=root;seen.add(v);emit(3,"Improve "+v+" to "+candidate+".")}else emit(3,"No improvement for "+v+".");relaxation=null}
 }
 }
 else {heapPush(frontier,[0,root]);emit(0,"Push source with distance 0.");while(frontier.length){const [d,u]=heapPop(frontier);current=u;edge=null;relaxation=null;stale=null;if(d!==dist[u]||done.has(u)){stale=[d,u];emit(1,"Discard stale entry ("+d+", "+u+").");stale=null;continue}done.add(u);visit.push(u);emit(1,"Settle "+u+" at distance "+d+".");if(u===target){stopped=true;break}for(const [v,w] of neighbors(u)){edge=[u,v];counter.examined++;const old=dist[v]??Infinity,candidate=d+w;relaxation={u,v,w,base:d,old,candidate,improved:candidate<old};emit(2,"Relax "+u+" → "+v+" (weight "+w+").");if(candidate<old){dist[v]=candidate;parent[v]=u;rootOf[v]=root;seen.add(v);heapPush(frontier,[candidate,v]);emit(3,"Improve "+v+" to "+dist[v]+"; push heap entry.");}else emit(3,"No improvement for "+v+".");relaxation=null;}}}
 if(stopped)break;
 }
 current=null;edge=null;relaxation=null;stale=null;emit(5,stopped?"Target reached; traversal stopped early.":"Execution complete.");return states;
}

function randomGraph(n,p,directed,seed){let s=seed>>>0;const rand=()=>{s=(Math.imul(1664525,s)+1013904223)>>>0;return s/4294967296};const g=graph(Array.from({length:n},(_,i)=>i),[],directed);for(const u of g.vertices)for(const v of g.vertices)if(u!==v&&(directed||u<v)&&rand()<p/100)addEdge(g,u,v);return g}

function treeInfo(g){if(g.directed)return null;const r=representations(g),seen=new Set();let components=0;for(const root of g.vertices){if(seen.has(root))continue;components++;let q=[root];seen.add(root);while(q.length){for(const [v] of r.list[r.index.get(q.pop())])if(!seen.has(v)){seen.add(v);q.push(v)}}}const cycle=g.edges.length>g.vertices.length-components;return {components,cycle,tree:g.vertices.length>0&&components===1&&!cycle}}

function components(g){if(g.directed)throw Error("Connected components here require an undirected graph.");const r=representations(g),seen=new Set(),groups=[];for(const u of r.ids){if(seen.has(u))continue;const a=[],q=[u];seen.add(u);for(let i=0;i<q.length;i++){const v=q[i];a.push(v);for(const [w] of r.list[r.index.get(v)])if(!seen.has(w)){seen.add(w);q.push(w)}}groups.push(a)}return groups}
function cycleWitness(g){const r=representations(g),active=new Set(),done=new Set(),path=[];let witness=[];function dfs(u,p){active.add(u);path.push(u);for(const [v] of r.list[r.index.get(u)]){if(!g.directed&&v===p&&u!==v)continue;if(active.has(v)){witness=path.slice(path.indexOf(v)).concat(v);return true}if(!done.has(v)&&dfs(v,u))return true}path.pop();active.delete(u);done.add(u);return false}for(const u of r.ids)if(!done.has(u)&&dfs(u,null))break;return witness}
function topological(g){if(!g.directed)throw Error("Topological order requires a directed graph.");const r=representations(g),indegree=Object.fromEntries(r.ids.map(v=>[v,0])),queue=[],order=[],steps=[];for(const [u,v] of g.edges)indegree[v]++;for(const v of r.ids)if(indegree[v]===0)queue.push(v);const emit=message=>steps.push({message,queue:[...queue],order:[...order],indegree:{...indegree}});emit("Enqueue all zero-indegree vertices.");while(queue.length){const u=queue.shift();order.push(u);emit("Remove "+u+" from queue.");for(const [v] of r.list[r.index.get(u)]){indegree[v]--;if(indegree[v]===0)queue.push(v);emit("Decrease indegree of "+v+".")}}emit(order.length===r.ids.length?"Topological order complete.":"Cycle: remaining vertices cannot be ordered.");return {order,acyclic:order.length===r.ids.length,steps}}

export { components, cycleWitness, topological, graph, updateWeight, addEdge, removeEdge, addVertex, removeVertex, representations, stats, densityModel, operation, pathTo, trace, randomGraph, treeInfo };

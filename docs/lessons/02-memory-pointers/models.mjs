export function initial(mode){
 const s={mode,objects:{},pointers:{p:{target:null,owner:false},q:{target:null,owner:false}},scopes:[0],nextId:1,allocations:0,releases:0,invalid:0,message:"Ready.",code:"// Initial state"};
 if(mode==="pointers"||mode==="objects"){s.objects.a={value:10,live:true,storage:"automatic",scope:0,address:"0x1000"};s.objects.b={value:20,live:true,storage:"automatic",scope:0,address:"0x1080"};s.pointers.p.target="a";s.pointers.q.target="a"}
 return s;
}

export function pointerState(s,name){const t=s.pointers[name]?.target;return t==null?"null":s.objects[t]?.live?"live":"dangling"}

export function counts(s){const dyn=Object.entries(s.objects).filter(([,o])=>o.live&&o.storage==="dynamic");return {allocations:s.allocations,releases:s.releases,live:dyn.length,unreachable:dyn.filter(([id])=>!Object.values(s.pointers).some(p=>p.target===id)).length,dangling:Object.keys(s.pointers).filter(p=>pointerState(s,p)==="dangling").length,invalid:s.invalid}}

export function step(old,action){
 const s=JSON.parse(JSON.stringify(old));const {op,p="p",q="q",target,value=42}=action;const ptr=s.pointers[p];
 const fail=m=>{s.invalid++;s.message=m+" Operation blocked; no C++ execution.";return s};
 const obj=()=>s.objects[ptr?.target];s.code="";
 switch(op){
 case "assign":s.code=p+" = "+(target==null?"nullptr":"&"+target)+";";if(target!==null&&(!s.objects[target]?.live||s.objects[target].storage!=="automatic"))return fail("Target must be a live automatic object.");ptr.target=target;ptr.owner=false;s.message="Pointer changed; object lifetimes unchanged.";break;
 case "copy":s.code=p+" = "+q+";";if(pointerState(s,q)==="dangling")return fail("Copy of an invalid pointer value is outside this safe model.");ptr.target=s.pointers[q].target;ptr.owner=false;s.message="Copied the pointer value, not the object. Ownership is not automatically transferred.";break;
 case "write":s.code="*"+p+" += "+value+";";if(pointerState(s,p)!=="live")return fail("Invalid dereference: "+pointerState(s,p)+".");obj().value+=value;s.message="Modified "+ptr.target+" through "+p+".";break;
 case "read":s.code="read *"+p+";";if(pointerState(s,p)!=="live")return fail("Invalid dereference: "+pointerState(s,p)+".");s.message="Read "+obj().value+" from "+ptr.target+".";break;
 case "set":s.code=target+" = "+value+";";if(!s.objects[target]?.live)return fail("Object is not live.");s.objects[target].value=value;s.message="Changed value without changing identity or address.";break;
 case "enter":s.code="{";s.scopes.push(s.nextId++);s.message="Entered a nested scope.";break;
 case "declare":{const id="x"+s.nextId++;s.code="int "+id+" = "+value+"; "+p+" = &"+id+";";s.objects[id]={value,live:true,storage:"automatic",scope:s.scopes.at(-1),address:"A"+s.nextId};ptr.target=id;ptr.owner=false;s.message="Created "+id+" in the current scope.";break}
 case "exit":s.code="}";if(s.scopes.length===1)return fail("Already in outer scope.");{const scope=s.scopes.pop();for(const o of Object.values(s.objects))if(o.scope===scope&&o.storage==="automatic")o.live=false;s.message="Scope exited; its automatic objects ended their lifetimes. External aliases did not become null."}break;
 case "allocate":{const id="h"+s.nextId++;s.code=p+" = new int{"+value+"};";s.objects[id]={value,live:true,storage:"dynamic",scope:null,address:"H"+id.slice(1)};ptr.target=id;ptr.owner=true;s.allocations++;s.message="Allocated "+id+"; responsibility annotated on "+p+".";break}
 case "owner":s.code="// annotate responsibility: "+p;if(pointerState(s,p)!=="live"||obj().storage!=="dynamic")return fail("Only a live allocation can have an assigned release responsibility.");for(const x of Object.values(s.pointers))if(x.target===ptr.target)x.owner=false;ptr.owner=true;s.message="Assigned release responsibility to "+p+" (a design annotation, not C++ syntax).";break;
 case "delete":s.code="delete "+p+";";if(ptr.target===null){s.message="delete nullptr has no effect.";break}if(pointerState(s,p)!=="live")return fail("Invalid deletion: dangling pointer (possible double deletion).");if(obj().storage!=="dynamic")return fail("Cannot delete an automatic object.");{const warning=ptr.owner?"":" Responsibility was assigned elsewhere; clarify the ownership contract.";obj().live=false;s.releases++;for(const x of Object.values(s.pointers))if(x.target===ptr.target)x.owner=false;s.message="Released object; all aliases to it are now dangling."+warning}break;
 default:return fail("Unknown operation.");
 }
 if(counts(s).unreachable)s.message+=" Unreachable live allocation: leak in this closed model.";
 return s;
}

export function chainInitial(n=3){const nodes={};for(let i=0;i<n;i++){const id=String.fromCharCode(65+i);nodes[id]={value:(i+1)*10,next:i+1<n?String.fromCharCode(66+i):null,live:true}}return {nodes,head:n?"A":null,current:n?"A":null,visited:[],status:"Ready to traverse.",done:false}}

export function chainEdit(old,op,from,to){const s=JSON.parse(JSON.stringify(old));if(op==="link"&&s.nodes[from]?.live&&(to===null||s.nodes[to]))s.nodes[from].next=to;else if(op==="head"&&(to===null||s.nodes[to]))s.head=to;else if(op==="end"&&s.nodes[from])s.nodes[from].live=false;else if(op==="current"&&(to===null||s.nodes[to])){s.current=to;s.visited=[];s.done=false;s.status="Current selected.";return s} s.current=s.head;s.visited=[];s.done=false;s.status="Structure changed; traversal reset.";return s}

export function chainStep(old){const s=JSON.parse(JSON.stringify(old));if(s.done)return s;const c=s.current;if(c===null){s.done=true;s.status="Reached nullptr.";return s}if(!s.nodes[c]?.live){s.done=true;s.status="Dangling link: invalid dereference blocked.";return s}if(s.visited.includes(c)){s.done=true;s.status="Cycle detected by simulator; traversal stopped.";return s}s.visited.push(c);s.current=s.nodes[c].next;s.status="Visited "+c+"; current = "+(s.current??"nullptr")+".";if(s.current===null){s.done=true;s.status+=" Reached nullptr."}return s}

export function reachable(s){const seen=[];let c=s.head;while(c!==null&&s.nodes[c]?.live&&!seen.includes(c)){seen.push(c);c=s.nodes[c].next}return {seen,stop:c===null?"null":s.nodes[c]?.live?"cycle":"dangling"}}

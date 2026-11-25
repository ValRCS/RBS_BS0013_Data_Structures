export function access(index,n=6){if(!Number.isInteger(index)||index<0||index>=n)throw new RangeError("Invalid index");return {index,direct:[index],linked:Array.from({length:index+1},(_,i)=>i)}}

export function vectorOp(values,op,index,value){const a=[...values],n=a.length;const validIndex=Number.isInteger(index)&&index>=0&&index<n;const validValue=Number.isInteger(value)&&value>=-2147483648&&value<=2147483647;const result=(message,touched=[],shifted=0)=>({values:a,message,touched,shifted});if(["append","insert","set"].includes(op)&&!validValue)return result("Enter a signed 32-bit integer.");if(["append","insert"].includes(op)&&n>=12)return result("The teaching model is limited to 12 elements.");if(["get","set","erase"].includes(op)&&!validIndex)return result("Index outside the valid range. No access or mutation performed.");if(op==="get")return result("values.at("+index+") = "+a[index],[index]);if(op==="set"){a[index]=value;return result("Replaced one element.",[index])}if(op==="append"){a.push(value);return result("Appended one element. Reallocation may be needed; capacity is covered in Week 3.",[n])}if(op==="insert"){if(!Number.isInteger(index)||index<0||index>n)return result("Insertion index must be between 0 and size, inclusive.");a.splice(index,0,value);return result(n-index+" existing elements change index. Reallocation may also occur.",Array.from({length:n-index+1},(_,i)=>index+i),n-index)}if(op==="erase"){a.splice(index,1);return result(n-index-1+" remaining elements shift left.",Array.from({length:n-index-1},(_,i)=>index+i),n-index-1)}if(op==="pop"){if(!n)return result("Cannot pop an empty vector.");a.pop();return result("Removed the last element.")}if(op==="scan")return result("Visited "+n+" elements in order.",a.map((_,i)=>i));return result("Unknown operation.")}

export function objectState(kind,mode){if(!["scalar","vector"].includes(kind)||!["copy","ref","const"].includes(mode))throw new Error("Invalid preset");return {kind,mode,bindings:{a:{id:"A",readonly:false},b:{id:mode==="copy"?"B":"A",readonly:mode==="const"}},objects:mode==="copy"?{A:kind==="scalar"?7:[7,4,9],B:kind==="scalar"?7:[7,4,9]}:{A:kind==="scalar"?7:[7,4,9]}}}

export function objectOp(state,name,op){const binding=state.bindings[name];if(!binding||binding.readonly)return {state,message:"Cannot modify through a const reference."};const old=state.objects[binding.id];if(op==="append"&&state.kind!=="vector")return {state,message:"Append requires a vector."};if(op==="append"&&old.length>=8)return {state,message:"Model limit: eight elements."};if(!["inc","append"].includes(op))return {state,message:"Unknown operation."};const next=state.kind==="scalar"?old+1:op==="append"?[...old,5]:[old[0]+1,...old.slice(1)];return {state:{...state,objects:{...state.objects,[binding.id]:next}},message:name+" modifies object "+binding.id+"."}}

export function parameterTrace(mode,initial,write=true){if(!["value","ref","const"].includes(mode))throw new Error("Invalid mode");if(mode==="const"&&write)return [{line:-1,caller:null,parameter:null,shared:false,text:"Ill-formed: the function attempts to modify through const. No execution occurs."}];const changed=write?initial+1:initial;return [{line:4,caller:initial,parameter:null,shared:false,text:"Caller creates its object."},{line:5,caller:initial,parameter:initial,shared:mode!=="value",text:mode==="value"?"Initialize a separate parameter object.":"Bind a reference to the existing caller object."},{line:1,caller:mode==="ref"?changed:initial,parameter:changed,shared:mode!=="value",text:write?(mode==="ref"?"Modify the caller object through the alias.":"Modify only the local copy."):"Read the value; neither object changes."},{line:6,caller:mode==="ref"?changed:initial,parameter:null,shared:false,text:"Return to caller. Output: "+(mode==="ref"?changed:initial)}]}
export const builds = {
  "ok": {
    "stop": 5,
    "text": "Output matches the expected result.",
    "code": "int main() { return 0; }"
  },
  "syntax": {
    "stop": 1,
    "text": "Compilation fails: expected semicolon. No new executable is built.",
    "code": "int main() { return 0 }"
  },
  "warning": {
    "stop": 5,
    "text": "Build succeeds with an unused-variable warning (with -Wall). Warnings still matter.",
    "code": "int main() { int unused = 7; return 0; }"
  },
  "link": {
    "stop": 3,
    "text": "Link fails: undefined reference to missing(). Declaration alone is not a definition.",
    "code": "void missing();\nint main() { missing(); }"
  },
  "runtime": {
    "stop": 4,
    "text": "Execution terminates with an unhandled std::out_of_range exception.",
    "code": "#include <vector>\nint main() { std::vector<int> v{1}; v.at(9); }"
  },
  "logic": {
    "stop": 5,
    "text": "Runs normally but prints 7 instead of expected 12. Tests detect the incorrect result.",
    "code": "#include <iostream>\nint main() { std::cout << 3 + 4; }"
  }
};
export function buildTrace(mode){const b=builds[mode];if(!b)throw new Error("Invalid scenario");return ["Source text","Preprocess and compile","Object code (assembly stage abstracted)","Link executable","Run executable","Verify result"].slice(0,b.stop+1).map((label,i)=>({label,terminal:i===b.stop,text:i===b.stop?b.text:["Read source; nothing has executed yet.","Translate and check source. Warnings need not stop compilation.","Compiled object code is available.","Resolve definitions and create the executable.","Execute the program."][i]}))}

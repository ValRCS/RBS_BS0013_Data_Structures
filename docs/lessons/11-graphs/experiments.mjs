import {densityModel,representations} from "../../assets/js/core/graph-model.mjs";
import {$,el,on,put,clear,number,options,table} from "./ui.mjs";
import {questions} from "./questions.mjs";
const bugs=[
 ["Asymmetric matrix","0 1 0\n0 0 1\n0 1 0","A[0][1] differs from A[1][0]. Insert the reciprocal cell or remove both."],
 ["Duplicate neighbour","0: [1,1]\n1: [0]","Remove one duplicate 1; parallel edges are prohibited."],
 ["Invalid vertex","V = 3\n0: [1,3]\n1: []\n2: []","Vertex 3 is out of range."],
 ["Wrong count","Undirected: 0—1, 1—2\nedge_count = 4","There are 2 logical edges and 4 stored adjacency entries."],
 ["Duplicate loop","Undirected 0—0\n0: [0,0]","Store one loop entry. Mathematical degree contribution is two."],
 ["Direction reversed","Expected 0→1\nA[0][1]=0; A[1][0]=1","Rows are sources: set A[0][1]=1 and A[1][0]=0."],
 ["Stale adjacency","After removing 0—1:\n0: []\n1: [0]","Remove remaining reciprocal entry."],
 ["Wrong sorted output","Raw bucket: [3,1,2]\nReturned: [3,1,2]","Return [1,2,3]; raw storage need not be sorted."]];
export function debugging(){
 options("bug",bugs.map((b,i)=>[i,b[0]]));
 function show(){put("bug-example",bugs[Number($("bug").value)][1]);$("bug-answer").value="";put("bug-result","")}
 on("bug","change",show);on("check-bug","click",()=>put("bug-result",bugs[Number($("bug").value)][2]));show();
}
const bytes=n=>n>=1073741824?(n/1073741824).toFixed(2)+" GiB":n>=1048576?(n/1048576).toFixed(2)+" MiB":n>=1024?(n/1024).toFixed(2)+" KiB":n+" B";
export function density(){
 try{
 const V=number("density-v"),p=number("density-p"),dir=$("density-direction").value==="directed",packed=$("matrix-type").value==="bit",id=Number($("id-bytes").value),bucket=number("bucket-bytes"),z=densityModel(V,p,dir,packed,id,bucket);
 clear("density-result");$("density-result").append(el("p","Edges: "+z.E.toLocaleString()+" · entries: "+z.entries.toLocaleString()));
 const data=[["Matrix",z.matrix],["Adjacency list",z.list],["Edge list",z.edge]],max=Math.max(1,...data.map(e=>e[1]));
 for(const [label,n] of data){const bg=el("div",undefined,"bar-bg"),bar=el("div",undefined,"bar");bar.style.width=(100*n/max)+"%";bg.append(bar);$("density-result").append(el("p",label+": "+bytes(n)),bg)}
 const svg=$("density-chart"),s=(tag,attrs,t)=>{const e=document.createElementNS("http://www.w3.org/2000/svg",tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v));if(t!==undefined)e.textContent=t;return e};
 svg.replaceChildren();const samples=Array.from({length:21},(_,i)=>densityModel(V,i*5,dir,packed,id,bucket)),peak=Math.max(1,...samples.flatMap(x=>[x.matrix,x.list,x.edge])),X=p=>42+4.1*p,Y=n=>183-145*n/peak;
 svg.append(s("path",{d:"M42 30V183H452",fill:"none",stroke:"currentColor"}),s("text",{x:42,y:20,fill:"currentColor","font-size":11},bytes(peak)),s("text",{x:42,y:202,fill:"currentColor","font-size":11},"0%"),s("text",{x:417,y:202,fill:"currentColor","font-size":11},"100%"));
 for(const [k,color,label,y] of [["matrix","#2563eb","Matrix",28],["list","#16a34a","List",43],["edge","#d97706","Edge list",58]]){svg.append(s("polyline",{points:samples.map((x,i)=>X(i*5)+","+Y(x[k])).join(" "),fill:"none",stroke:color,"stroke-width":2.5}),s("text",{x:340,y,fill:"currentColor","font-size":11},label),s("line",{x1:315,y1:y-4,x2:335,y2:y-4,stroke:color,"stroke-width":3}))}
 }catch(e){put("density-result",e.message)}
}
export function workload(g){try{const q=number("queries"),n=number("enumerations"),r=representations(g),V=g.vertices.length,E=g.edges.length,d=Math.max(0,...r.list.map(a=>a.length));table("workload-result",["Representation","Upper-scan positions"],[["Matrix",q+n*V],["Adjacency list",(q+n)*d],["Edge list",(q+n)*E]])}catch(e){put("workload-result",e.message)}}
export function quiz(){
 const answers=new Map();let saved={};try{saved=JSON.parse(localStorage.getItem("bs0013-week11-answers")||"{}")}catch{}
 function score(){put("quiz-score","Answered "+answers.size+"/"+questions.length+" · Correct "+[...answers].filter(([i,a])=>questions[i][2]===a).length);put("progress","Local self-check progress: "+answers.size+" of "+questions.length+" answered.");try{localStorage.setItem("bs0013-week11-answers",JSON.stringify(Object.fromEntries(answers)))}catch{}}
 function show(){clear("quiz");questions.forEach(([q,opts,correct,explanation],i)=>{const f=el("fieldset"),p=el("p",undefined,"feedback");p.setAttribute("aria-live","polite");f.append(el("legend",(i+1)+". "+q));opts.forEach((opt,j)=>{const label=el("label"),input=el("input");input.type="radio";input.name="week11-q"+i;input.value=j;input.checked=answers.get(i)===j;input.addEventListener("change",()=>{answers.set(i,j);p.textContent=(j===correct?"Correct. ":"Try again. ")+explanation;score()});label.append(input,document.createTextNode(" "+opt));f.append(label)});if(answers.has(i))p.textContent=(answers.get(i)===correct?"Correct. ":"Try again. ")+explanation;f.append(p);$("quiz").append(f)});score()}
 for(const [i,a] of Object.entries(saved||{}))if(questions[Number(i)]&&Number.isInteger(a)&&a>=0&&a<questions[Number(i)][1].length)answers.set(Number(i),a);
 show();on("quiz-reset","click",()=>{answers.clear();show()});
}

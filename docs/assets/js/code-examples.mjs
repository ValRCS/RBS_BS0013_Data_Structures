// Progressive enhancement for native, initially collapsed code examples.
const examples=[...document.querySelectorAll("details.cpp-example")];
for(const toolbar of document.querySelectorAll("[data-cpp-controls]")){
  toolbar.hidden=false;
  toolbar.querySelector("[data-cpp-expand]")?.addEventListener("click",()=>examples.forEach(x=>x.open=true));
  toolbar.querySelector("[data-cpp-collapse]")?.addEventListener("click",()=>examples.forEach(x=>x.open=false));
}
function openAnchor(){
  let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
  const target=document.getElementById(id);
  const detail=target?.closest("details.cpp-example");
  if(detail){detail.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:"start"}))}
}
window.addEventListener("hashchange",openAnchor);
openAnchor();
for(const block of document.querySelectorAll(".cpp-example .cpp-code")){
  const code=block.querySelector("code");if(!code)continue;
  const row=document.createElement("div");row.className="cpp-copy-row";
  const button=document.createElement("button");button.type="button";button.textContent="Copy code";
  const status=document.createElement("span");status.setAttribute("role","status");
  button.addEventListener("click",async()=>{
    try{await navigator.clipboard.writeText(code.textContent);status.textContent="Copied."}
    catch{const range=document.createRange();range.selectNodeContents(code);const selection=window.getSelection();if(selection){selection.removeAllRanges();selection.addRange(range)}status.textContent="Code selected; press Ctrl+C or Cmd+C."}
  });
  row.append(button,status);block.prepend(row);
}

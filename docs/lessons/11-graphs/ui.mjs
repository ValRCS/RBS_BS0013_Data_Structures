export const $=id=>document.getElementById(id);
export const el=(tag,value,cls)=>{const e=document.createElement(tag);if(value!==undefined)e.textContent=String(value);if(cls)e.className=cls;return e};
export const on=(id,event,fn)=>$(id).addEventListener(event,fn);
export const put=(id,value)=>{$(id).textContent=value};
export const clear=id=>$(id).replaceChildren();
export const number=id=>{const e=$(id);if(!e.value.trim()||!e.checkValidity())throw Error("Invalid "+id);return Number(e.value)};
export function button(label,fn,cls){const b=el("button",label,cls);b.type="button";b.addEventListener("click",fn);return b}
export function options(id,items,preferred){const e=$(id),old=preferred===undefined?e.value:String(preferred);e.replaceChildren(...items.map(([v,t])=>{const o=el("option",t);o.value=String(v);return o}));if([...e.options].some(o=>o.value===old))e.value=old}
export function chips(id,items){$(id).replaceChildren(...(items.length?items:["∅"]).map(v=>el("span",v,"chip")))}
export function metrics(id,items){$(id).replaceChildren(...items.map(([k,v])=>{const e=el("div",undefined,"metric");e.append(el("strong",v),el("span",k));return e}))}
export function table(id,heads,rows){const t=el("table",undefined,"data"),h=el("thead"),tr=el("tr"),b=el("tbody");for(const a of heads){const th=el("th",a);th.scope="col";tr.append(th)}h.append(tr);t.append(h);for(const row of rows){const r=el("tr");for(const a of row)r.append(el("td",a));b.append(r)}t.append(b);$(id).replaceChildren(t)}

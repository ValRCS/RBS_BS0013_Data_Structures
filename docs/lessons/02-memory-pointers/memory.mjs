import {initial,step,pointerState,counts,chainInitial,chainEdit,chainStep,reachable} from './models.mjs';
import {presets} from './presets.mjs';
import {questions,challenges,diagnostics} from './questions.mjs';
const $=id=>document.getElementById(id);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const opt=(value,label=value)=>'<option value="'+esc(value)+'">'+esc(label)+'</option>';
const button=(id,label)=>'<button type="button" id="'+id+'">'+label+'</button>';
const select=(id,label,opts)=>'<label>'+label+'<select id="'+id+'">'+opts+'</select></label>';
const cell=(title,body,state)=>'<div class="w2-cell" data-state="'+state+'"><strong>'+esc(title)+'</strong><br>'+body+'</div>';
function diagram(s){
 const objects=Object.entries(s.objects),w=600,h=135+Math.ceil(objects.length/4)*84;
 const coords=new Map(objects.map(([id],i)=>[id,[15+(i%4)*147,120+Math.floor(i/4)*84]]));
 const lines=Object.entries(s.pointers).map(([name,p],i)=>{
  const target=coords.get(p.target);if(!target)return '';
  const x=150+i*300,tx=target[0]+65,ty=target[1];
  return '<path d="M'+x+' 55 Q'+x+' 88 '+tx+' '+ty+'" fill="none" stroke="'+(pointerState(s,name)==='live'?'var(--accent)':'#c75a5a')+'" stroke-width="2" '+(pointerState(s,name)==='dangling'?'stroke-dasharray="5 4"':'')+'/>';
 }).join('');
 return '<svg class="w2-diagram" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Symbolic pointers and target objects; textual state follows">'+lines+Object.entries(s.pointers).map(([name,p],i)=>'<rect x="'+(70+i*300)+'" y="12" width="160" height="43" rx="7" fill="var(--hero)" stroke="var(--line)"/><text x="'+(150+i*300)+'" y="38" text-anchor="middle" fill="var(--text)" font-size="15">'+esc(name+' → '+(p.target??'nullptr'))+'</text>').join('')+objects.map(([id,o])=>{const [x,y]=coords.get(id);return '<rect x="'+x+'" y="'+y+'" width="130" height="65" rx="6" fill="var(--surface)" stroke="'+(o.live?'var(--accent)':'#c75a5a')+'" '+(o.live?'':'stroke-dasharray="5 4"')+'/><text x="'+(x+65)+'" y="'+(y+24)+'" text-anchor="middle" fill="var(--text)" font-size="15">'+esc(id+(o.live?' = '+o.value:' · ended'))+'</text><text x="'+(x+65)+'" y="'+(y+46)+'" text-anchor="middle" fill="var(--muted)" font-size="12">'+esc(o.address+' · '+o.storage)+'</text>'}).join('')+'</svg>';
}
function memoryTool(mode){
 const host=$(mode+'-tool');let s=initial(mode),history=[],sequence=[],index=0,timer=null,log=[];
 const key=x=>mode+'-'+x;
 const controls=mode==='pointers'?['assign','copy','write','read']:mode==='lifetime'?['enter','declare','exit','copy','null','read']:['allocate','copy','owner','delete','null','read','write'];
 host.innerHTML='<div class="w2-controls">'+select(key('preset'),'Scenario',presets[mode].map(([n],i)=>opt(i,n)).join(''))+button(key('load'),'Load preset')+button(key('next'),'Next statement')+button(key('play'),'Play / pause')+button(key('undo'),'Undo')+button(key('reset'),'Reset')+'</div><pre><code id="'+key('code')+'"></code></pre><div class="w2-controls">'+select(key('ptr'),'Pointer',opt('p')+opt('q'))+select(key('target'),'Assign target',opt('a')+opt('b')+opt('null','nullptr'))+controls.map(op=>button(key(op),({assign:'Assign selected target',copy:'Copy other pointer',write:'Add 5 through pointer',read:'Read target',enter:'Enter scope',declare:'Declare int and point',exit:'Exit scope',null:'Set nullptr',allocate:'Allocate int',owner:'Assign responsibility',delete:'Delete target'})[op])).join('')+'</div><div id="'+key('view')+'"></div><p id="'+key('feedback')+'" class="w2-feedback" role="status"></p><details><summary>Operation history</summary><ol class="w2-history" id="'+key('history')+'"></ol></details>';
 if(mode!=='pointers')$(key('target')).parentElement.hidden=true;
 function stop(){if(timer!==null){clearInterval(timer);timer=null}}
 function render(){
  const next=sequence[index];$(key('code')).textContent='Last: '+s.code+'\nPreset progress: '+index+' / '+sequence.length+'\nNext operation: '+(next?next.op+' '+(next.p??''):'none');
  $(key('next')).disabled=index>=sequence.length;$(key('undo')).disabled=!history.length;
  const pc=Object.entries(s.pointers).map(([n,p])=>cell(n,esc((p.target??'nullptr')+' · '+pointerState(s,n)+(p.owner?' · responsible owner':'')),pointerState(s,n))).join('');
  const oc=Object.entries(s.objects).map(([id,o])=>cell(id,esc(o.address+' · '+o.storage+' · '+(o.live?'alive, value '+o.value:'lifetime ended')+(o.storage==='automatic'?' · scope '+o.scope:'')),o.live?'live':'dead')).join('');
  const c=counts(s);$(key('view')).innerHTML=diagram(s)+'<div class="w2-grid">'+pc+'</div><div class="w2-grid">'+oc+'</div><p>Active scopes: '+s.scopes.join(' → ')+'</p><div class="w2-metrics">'+Object.entries(c).map(([k,v])=>'<span>'+esc(k)+': '+v+'</span>').join('')+'</div>';
  $(key('feedback')).textContent=s.message;$(key('history')).innerHTML=log.map(l=>'<li>'+esc(l)+'</li>').join('');
 }
 function apply(a,advance=false){if(Object.keys(s.objects).length>=24&&['allocate','declare'].includes(a.op)){stop();$(key('feedback')).textContent='Model limit of 24 objects reached. Reset or undo.';return false}history.push({s,index,log:[...log]});s=step(s,a);if(advance)index++;log.push(s.code+' — '+s.message);render();return true}
 function load(){stop();s=initial(mode);history=[];log=[];index=0;sequence=presets[mode][Number($(key('preset')).value)][1];render()}
 function next(){if(index<sequence.length)apply(sequence[index],true);if(index>=sequence.length)stop()}
 $(key('load')).onclick=load;$(key('preset')).onchange=load;$(key('next')).onclick=()=>{stop();next()};$(key('play')).onclick=()=>{if(timer!==null){stop();return}if(index<sequence.length)timer=setInterval(next,700)};
 $(key('undo')).onclick=()=>{stop();const old=history.pop();if(old){({s,index,log}=old);render()}};
 $(key('reset')).onclick=load;
 for(const op of controls)$(key(op)).onclick=()=>{stop();const p=$(key('ptr')).value,q=p==='p'?'q':'p';const target=$(key('target')).value;apply({op:op==='null'?'assign':op,p,q,target:op==='null'||target==='null'?null:target,value:op==='write'?5:42})};
 load();
}
for(const mode of ['pointers','lifetime','dynamic'])memoryTool(mode);
let objects=initial('objects');
$('objects-tool').innerHTML='<div class="w2-controls">'+select('object-choice','Select object',opt('a')+opt('b'))+button('object-change','Add 7 to selected object')+button('object-reset','Reset')+'</div><div id="object-view" class="w2-grid"></div><p id="object-description" role="status"></p>';
function renderObjects(){ $('object-view').innerHTML=Object.entries(objects.objects).map(([id,o])=>cell(id,esc('int · '+o.address+' · value '+o.value+(id===$('object-choice').value?' · selected':'')),'live')).join('');$('object-description').textContent='The selected object retains its identity and address when its value changes.'}
$('object-choice').onchange=renderObjects;$('object-change').onclick=()=>{const target=$('object-choice').value;objects=step(objects,{op:'set',target,value:objects.objects[target].value+7});renderObjects()};$('object-reset').onclick=()=>{objects=initial('objects');renderObjects()};renderObjects();
let chain,chainHistory=[],chainTimer=null;
$('chain-tool').innerHTML='<div class="w2-controls">'+select('chain-preset','Scenario',presets.chain.map(([n],i)=>opt(i,n)).join(''))+select('chain-size','New chain length',Array.from({length:9},(_,i)=>opt(i)).join(''))+button('chain-create','Create chain')+button('chain-reset','Reset preset')+button('chain-undo','Undo')+'</div><div class="w2-controls">'+select('chain-from','From node','')+select('chain-to','To node','')+button('chain-link','Set next')+button('chain-head','Set head')+button('chain-current','Set current')+button('chain-end','End selected lifetime')+'</div><div class="w2-controls">'+button('chain-step','Visit next node')+button('chain-play','Play / pause')+button('chain-restart','Restart traversal')+'</div><div id="chain-view"></div><p id="chain-feedback" class="w2-feedback" role="status"></p>';
function stopChain(){if(chainTimer!==null){clearInterval(chainTimer);chainTimer=null}}
function renderChain(){
 const nodes=Object.entries(chain.nodes),reach=reachable(chain);const oldFrom=$('chain-from').value,oldTo=$('chain-to').value;
 $('chain-from').innerHTML=nodes.map(([id])=>opt(id)).join('');$('chain-to').innerHTML=opt('null','nullptr')+nodes.map(([id])=>opt(id)).join('');if(nodes.some(([id])=>id===oldFrom))$('chain-from').value=oldFrom;if(oldTo==='null'||nodes.some(([id])=>id===oldTo))$('chain-to').value=oldTo;
 $('chain-link').disabled=!nodes.length;$('chain-end').disabled=!nodes.length;$('chain-step').disabled=chain.done;$('chain-undo').disabled=!chainHistory.length;
 const positions=new Map(nodes.map(([id],i)=>[id,[15+(i%4)*147,35+Math.floor(i/4)*115]]));
 const h=nodes.length>4?240:130;
 const arrows=nodes.map(([id,o],i)=>{if(o.next===null||!positions.has(o.next))return '';const [x,y]=positions.get(id),[tx,ty]=positions.get(o.next);const bend=18+(i%4)*5;return '<path d="M'+(x+105)+' '+(y+28)+' C'+(x+130)+' '+(y-bend)+' '+(tx-15)+' '+(ty-bend)+' '+(tx+5)+' '+(ty+28)+'" fill="none" stroke="var(--accent)" stroke-width="2" marker-end="url(#w2-arrow)"/>'}).join('');
 $('chain-view').innerHTML='<p><strong>head:</strong> '+(chain.head??'nullptr')+' · <strong>current:</strong> '+(chain.current??'nullptr')+'</p><svg class="w2-diagram" viewBox="0 0 600 '+h+'" role="img" aria-label="Node links, with text equivalents below"><defs><marker id="w2-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="var(--accent)"/></marker></defs>'+arrows+nodes.map(([id,o])=>{const [x,y]=positions.get(id);return '<rect x="'+x+'" y="'+y+'" width="108" height="56" rx="5" fill="var(--surface)" stroke="'+(o.live?'var(--accent)':'#c75a5a')+'" stroke-width="'+(chain.current===id?4:1)+'"/><text x="'+(x+54)+'" y="'+(y+20)+'" text-anchor="middle" fill="var(--text)" font-size="15">'+id+' · '+(o.live?o.value:'ended')+'</text><text x="'+(x+54)+'" y="'+(y+42)+'" text-anchor="middle" fill="var(--muted)" font-size="12">next: '+(o.next??'null')+'</text>'}).join('')+'</svg><div class="w2-grid">'+nodes.map(([id,o])=>cell(id,esc((o.live?'alive · '+o.value:'lifetime ended')+' · next → '+(o.next??'nullptr')+(reach.seen.includes(id)?' · reachable':' · not reachable')),o.live?'live':'dead')).join('')+'</div><div class="w2-metrics"><span>Live: '+nodes.filter(([,o])=>o.live).length+'</span><span>Reachable: '+reach.seen.length+'</span><span>Chain ends: '+reach.stop+'</span><span>Visits: '+chain.visited.length+'</span></div><p>Traversal: '+(chain.visited.join(' → ')||'not started')+'</p>';
 $('chain-feedback').textContent=chain.status;
}
function chainLoad(){stopChain();const [,n,edits]=presets.chain[Number($('chain-preset').value)];chain=chainInitial(n);for(const args of edits)chain=chainEdit(chain,...args);chainHistory=[];renderChain()}
function chainApply(fn){chainHistory.push(chain);chain=fn(chain);renderChain();if(chain.done)stopChain()}
$('chain-preset').onchange=chainLoad;$('chain-reset').onclick=chainLoad;$('chain-create').onclick=()=>{stopChain();chain=chainInitial(Number($('chain-size').value));chainHistory=[];renderChain()};
$('chain-undo').onclick=()=>{stopChain();if(chainHistory.length){chain=chainHistory.pop();renderChain()}};
for(const op of ['link','head','current','end'])$('chain-'+op).onclick=()=>{stopChain();const to=$('chain-to').value;chainApply(s=>chainEdit(s,op,$('chain-from').value,to==='null'?null:to))};
$('chain-step').onclick=()=>{stopChain();chainApply(chainStep)};$('chain-play').onclick=()=>{if(chainTimer!==null)stopChain();else if(!chain.done)chainTimer=setInterval(()=>chainApply(chainStep),650)};$('chain-restart').onclick=()=>{stopChain();chainApply(s=>chainEdit(s,'current',null,s.head))};chainLoad();
function quiz(hostId,items,{persist=false}={}){
 const host=$(hostId);let index=0,answers={};const storage='bs0013-week02-v1-'+hostId;
 if(persist)try{answers=JSON.parse(localStorage.getItem(storage)||'{}')||{}}catch{}
 const save=()=>{if(persist)try{localStorage.setItem(storage,JSON.stringify(answers))}catch{}};
 host.innerHTML='<div class="w2-controls">'+select(hostId+'-choose','Scenario / question',items.map((x,i)=>opt(i,(i+1)+'. '+x.title)).join(''))+button(hostId+'-prev','Previous')+button(hostId+'-next','Next')+button(hostId+'-reset','Reset answers')+'</div><p id="'+hostId+'-progress"></p><div id="'+hostId+'-body"></div><p class="w2-feedback" role="status" id="'+hostId+'-feedback">Choose an answer.</p>';
 const render=()=>{const it=items[index],answer=answers[index];$(hostId+'-choose').value=String(index);$(hostId+'-progress').textContent=Object.keys(answers).length+' / '+items.length+' answered · '+Object.entries(answers).filter(([i,a])=>items[i]?.correct===a).length+' correct';$(hostId+'-prev').disabled=index===0;$(hostId+'-next').disabled=index===items.length-1;
 $(hostId+'-body').innerHTML='<h3>'+esc(it.title)+'</h3>'+(it.report?'<pre>'+esc(it.report)+'</pre>':'')+'<p>'+esc(it.prompt)+'</p><fieldset class="w2-options"><legend>Choose one answer</legend>'+it.options.map((o,i)=>'<label><input type="radio" name="'+hostId+'" value="'+i+'" '+(answer===i?'checked':'')+'> '+esc(o)+'</label>').join('')+'</fieldset>';
 const feedback=$(hostId+'-feedback');feedback.textContent=answer===undefined?'Choose an answer.':(answer===it.correct?'Correct. ':'Not quite. ')+it.explanation;
 for(const input of $(hostId+'-body').querySelectorAll('input'))input.onchange=()=>{answers[index]=Number(input.value);save();render();$(hostId+'-body').querySelector('input:checked')?.focus()};
 };
 $(hostId+'-choose').onchange=e=>{index=Number(e.target.value);render()};$(hostId+'-prev').onclick=()=>{index--;render()};$(hostId+'-next').onclick=()=>{index++;render()};$(hostId+'-reset').onclick=()=>{answers={};index=0;save();render()};render();
}
function rotate(options,index){const n=index%options.length;return {options:options.slice(n).concat(options.slice(0,n)),correct:(options.length-n)%options.length}}
quiz('detective-tool',challenges.map(([title,report,correct,explanation,b,c],i)=>({title,report,prompt:'Choose the repair or violated condition.',explanation,...rotate([correct,b,c],i)})));
quiz('diagnostic-tool',diagnostics);
quiz('quiz-tool',questions.map(([prompt,a,b,c,explanation],i)=>({title:'Question '+(i+1),prompt,explanation,...rotate([a,b,c],i)})),{persist:true});

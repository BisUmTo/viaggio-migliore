'use strict';
const {maps,length,validTour,validDraft,attemptMap,solve}=TSP;
const $=id=>document.getElementById(id),label=i=>String.fromCharCode(65+i),fmt=n=>n.toLocaleString('it-IT',{minimumFractionDigits:1,maximumFractionDigits:1});
const KEY='viaggio-migliore-v1';let stored={},canStore=true;
try{stored=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{canStore=false;}
let id=new URLSearchParams(location.search).get('mappa')||stored.map||'italia';
let map=maps.find(m=>m.id===id)||maps.find(m=>m.id==='italia');
const drafts=Object.fromEntries(maps.map(m=>[m.id,validDraft(m.points,stored.drafts?.[m.id])?[...stored.drafts[m.id]]:[0]]));
let route=drafts[map.id],revealed=false;
const seen=Object.fromEntries(maps.map(m=>[m.id,stored.seen?.[m.id]===true]));
let attempts=Array.isArray(stored.attempts)?stored.attempts.filter(a=>a&&maps.some(m=>m.id===a.map)&&Array.isArray(a.route)&&validTour(attemptMap(a).points,a.route)&&typeof a.strategy==='string').slice(-100):[];
const title=m=>m.title||m.name.replace(/^\d+ · /,'');
const cityName=i=>map.names?.[i]||('Città '+label(i));
const cityText=(m,i)=>label(i)+(m.names?' · '+m.names[i]:'');
const tours=new Map();const optimum=m=>{if(!tours.has(m.id))tours.set(m.id,solve(m.points));return tours.get(m.id);};
for(const category of ['world','lesson','advanced','expert']){
 const group=document.createElement('optgroup');group.label=category==='world'?'I viaggi':category==='advanced'?'Sfide avanzate':category==='expert'?'Per chi vuole di più':'Le sfide della lezione';
 maps.filter(m=>(m.category||'lesson')===category).forEach((m,i)=>{
  const o=document.createElement('option');o.value=m.id;o.textContent=m.name;group.append(o);
  const b=document.createElement('button');b.className='map-choice';b.dataset.map=m.id;b.setAttribute('aria-pressed','false');
  if(m.background){const img=document.createElement('img');img.src=m.background;img.alt='';img.className='map-thumb';b.append(img);}else{const n=document.createElement('span');n.className='map-step';n.textContent=String(i+1).padStart(2,'0');b.append(n);}
  const t=document.createElement('span'),name=document.createElement('span'),sub=document.createElement('small');name.className='map-choice-name';name.textContent=title(m);sub.textContent=m.points.length+(m.id==='lumen'?' borghi':' città')+(m.challenge?' · '+m.challenge.level:'');t.append(name,sub);b.append(t);b.addEventListener('click',()=>changeMap(m.id));$(category+'-maps').append(b);
 });$('map').append(group);
}
for(const key of ['group','strategy','reflection']){$(key).value=typeof stored[key]==='string'?stored[key].slice(0,key==='group'?70:3500):'';$(key).addEventListener('input',persist);}
function persist(){drafts[map.id]=[...route];try{localStorage.setItem(KEY,JSON.stringify({map:map.id,group:$('group').value,strategy:$('strategy').value,reflection:$('reflection').value,attempts,seen,drafts}));canStore=true;}catch{canStore=false;}$('storage').textContent=canStore?'Note e percorsi salvati su questo browser. Scarica la scheda per conservarli o consegnarli.':'Il browser non consente il salvataggio locale. Scarica la scheda prima di chiudere: puoi comunque giocare.';}
function ask(text){return new Promise(resolve=>{const d=$('confirmation');$('confirmtext').textContent=text;d.returnValue='cancel';d.addEventListener('close',()=>resolve(d.returnValue==='ok'),{once:true});d.showModal();});}
function msg(t){$('notice').textContent=t;}
function showView(view){const notes=view==='notes';$('notes-panel').hidden=!notes;$('map-panel').hidden=notes;$('map-tab').toggleAttribute('aria-current',!notes);$('notes-tab').toggleAttribute('aria-current',notes);$(notes?'notes-tab':'map-tab').setAttribute('aria-current','page');window.scrollTo({top:0});}
$('map-tab').addEventListener('click',()=>showView('map'));$('notes-tab').addEventListener('click',()=>showView('notes'));$('back-map').addEventListener('click',()=>{showView('map');$('game').focus();});$('strategy-link').addEventListener('click',()=>{showView('notes');$('strategy').focus();});$('open-rules').addEventListener('click',()=>{$('rules').hidden=!$('rules').hidden;$('open-rules').setAttribute('aria-expanded',String(!$('rules').hidden));});
function svgElement(tag,attrs){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;}
function point(i){const [x,y]=map.points[i];return [110+x*5,10+y*5];}
function path(r,closed){let q=r.map(i=>point(i).join(',')).join(' ');if(closed)q+=' '+point(r[0]).join(',');return q;}
function choose(i,keyboard=false){if(route.includes(i))return;route.push(i);revealed=false;msg('');persist();render();if(keyboard){const next=$('mapview').querySelector('[tabindex="0"]');if(next)next.focus();else $('save').focus();}}
function render(){
 const full=validTour(map.points,route);renderChallenge(full);$('map').value=map.id;$('mapname').textContent=title(map);
 $('mapinfo').textContent=map.description||['Visita ogni città, poi prova a rendere il giro più breve.','Scambia la strategia con un altro gruppo. Riuscite a rifare il giro?','Metti alla prova una regola. Un buon risultato basta a dimostrarla?'][maps.indexOf(map)];
 $('metric-note').textContent=map.projectionnote||'Distanze in linea retta, in unità della mappa. Il ritorno ad A è automatico.';
 $('distance').innerHTML=fmt(length(map.points,route,full))+' <small>unità</small>';$('distance-label').textContent=full?'Distanza del giro':'Distanza parziale';
 $('progress').textContent=full?'Giro completo · ritorno ad A incluso':route.length+' / '+map.points.length+' tappe · '+(route.length===1?'scegli la prossima':'continua il viaggio');
 $('route').textContent=route.map(label).join(' → ')+(full?' → A':'');$('undo').disabled=route.length<=1;$('reset').disabled=route.length<=1;$('save').disabled=!full;$('reveal').disabled=!full;
 document.querySelectorAll('.map-choice').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.map===map.id)));
 const currentAttempts=attempts.filter(a=>a.map===map.id&&validTour(map.points,a.route));$('best').textContent=currentAttempts.length?'Il vostro miglior giro salvato: '+fmt(Math.min(...currentAttempts.map(a=>length(map.points,a.route))))+' unità':'';
 const stage=document.querySelector('.map-stage');stage.classList.toggle('lab-map',!map.background);stage.classList.toggle('fantasy-map',map.id==='lumen');
 const svg=$('mapview');svg.replaceChildren();
 if(map.background)svg.append(svgElement('image',{href:map.background,x:0,y:0,width:720,height:520,preserveAspectRatio:'xMidYMid slice'}));
 else{for(let x=30;x<720;x+=30)for(let y=20;y<520;y+=30)svg.append(svgElement('circle',{cx:x,cy:y,r:.9,fill:'#c7cebe'}));}
 $('opt-legend').hidden=!revealed;
 if(revealed){const opt=optimum(map);svg.append(svgElement('polyline',{points:path(opt.route,true),class:'opt-line'}));$('optimal').hidden=false;const gap=Math.max(0,(length(map.points,route)-opt.cost)/opt.cost*100);$('optimal').innerHTML='<strong>Ottimo: '+fmt(opt.cost)+' unità</strong><p>'+opt.route.map(label).join(' → ')+' → A</p><p>Il tuo giro: '+fmt(length(map.points,route))+' unità.<br>Scarto dall’ottimo: <strong>'+fmt(gap)+'%</strong>.</p><p>'+(gap<1e-8?'Qui avete trovato un ottimo. Questo risultato, da solo, non dimostra che la regola funzioni su tutte le mappe.':'Un giro più corto basta a dimostrare che il vostro non è ottimo. Quale scelta vi ha allontanato dal risultato migliore?')+'</p>';}else $('optimal').hidden=true;
 svg.append(svgElement('polyline',{points:path(route,full),class:'route-line'}));
 // Labels are drawn first so nodes always remain clickable, even near another label.
 map.points.forEach((_,i)=>{const[cx,cy]=point(i),offset=map.offsets?.[i]||[0,-30];if(map.names){const t=svgElement('text',{x:cx+offset[0],y:cy+offset[1],class:'city-label'+(i===0?' start':''),'text-anchor':offset[0]<0?'end':offset[0]>0?'start':'middle'});t.textContent=cityName(i);svg.append(t);}else if(i===0){const t=svgElement('text',{x:cx,y:cy-30,class:'city-label start','text-anchor':'middle'});t.textContent='Partenza';svg.append(t);}});
 $('city-list').replaceChildren();
 map.points.forEach((_,i)=>{const[cx,cy]=point(i),visited=route.includes(i);const g=svgElement('g',{class:'node'+(visited?' visited':''),tabindex:visited?-1:0,role:'button','aria-label':cityText(map,i)+(i===0?', partenza':visited?', già visitata':', aggiungi al percorso'),'aria-disabled':String(visited),'data-city':label(i)});
 const tip=svgElement('title',{});tip.textContent=cityName(i)+(visited?' · già visitata':' · aggiungi al giro');g.append(tip);
 g.append(svgElement('circle',{cx,cy,r:map.background?14:18,fill:i===0?'#243f35':visited?'#a33d1f':'#fffdf7',stroke:visited?'#faf7ef':'#243f35'}));const t=svgElement('text',{x:cx,y:cy+1,fill:visited?'#fffdf7':'#243f35'});t.textContent=label(i);g.append(t);
 g.addEventListener('click',()=>choose(i));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(i,true);}});svg.append(g);
 const b=document.createElement('button');b.textContent=cityText(map,i);b.disabled=visited;b.addEventListener('click',()=>{choose(i);const next=$('city-list').querySelector('button:not(:disabled)');if(next)next.focus();else $('save').focus();});$('city-list').append(b);
 });
}
function showAttempts(){
 $('saved-count').textContent=attempts.length;$('attempts').replaceChildren();if(!attempts.length){const p=document.createElement('li');p.className='empty-state';p.textContent='Il primo giro è ancora da scrivere. Completa una mappa, poi premi «Salva tentativo».';$('attempts').append(p);return;}
 [...attempts].reverse().forEach(a=>{const m=attemptMap(a),li=document.createElement('li'),b=document.createElement('strong'),s=document.createElement('small'),q=document.createElement('small');b.textContent=title(m)+' · '+fmt(length(m.points,a.route))+' unità';s.textContent=a.route.map(label).join(' → ')+' → A';q.textContent=a.revealed?'Dopo aver visto l’ottimo su questa mappa':'Prima di vedere l’ottimo su questa mappa';li.append(b,s,q);const d=document.createElement('details'),summary=document.createElement('summary'),p=document.createElement('p');summary.textContent='Strategia di questo tentativo';p.textContent=a.strategy||'Nessuna strategia annotata al momento del salvataggio.';d.append(summary,p);li.append(d);$('attempts').append(li);});
}
function changeMap(next){if(next===map.id)return;persist();map=maps.find(m=>m.id===next)||map;route=[...drafts[map.id]];revealed=false;$('comparison').open=false;if(map.challenge)$(map.category==='expert'?'expert-index':'advanced-index').open=true;msg(route.length>1?'Giro precedente recuperato.':'');try{history.replaceState(null,'','?mappa='+map.id);}catch{}persist();render();}
$('map').addEventListener('change',()=>changeMap($('map').value));
$('undo').addEventListener('click',()=>{if(route.length>1)route.pop();revealed=false;msg('');persist();render();});
$('reset').addEventListener('click',async()=>{if(!await ask('Ricominciare questo giro da A? I tentativi già salvati e le altre mappe restano disponibili.'))return;route=[0];revealed=false;msg('');persist();render();});
$('save').addEventListener('click',()=>{if(!validTour(map.points,route))return;const last=attempts.at(-1);if(last&&last.map===map.id&&last.route.join(',')===route.join(',')&&last.strategy===$('strategy').value&&last.revealed===seen[map.id]){msg('Questo tentativo è già nel taccuino.');return;}attempts.push({map:map.id,route:[...route],strategy:$('strategy').value,revealed:seen[map.id]});attempts=attempts.slice(-100);persist();showAttempts();render();msg($('strategy').value.trim()?'Tentativo e strategia salvati nel taccuino.':'Tentativo salvato. Annota una strategia prima del prossimo salvataggio.');});
$('reveal').addEventListener('click',async()=>{if(!validTour(map.points,route))return;if(!await ask('Avete annotato la strategia e confrontato il giro con il gruppo? Mostrare ora l’ottimo?'))return;revealed=true;seen[map.id]=true;persist();render();});
$('share').addEventListener('click',async()=>{const u=new URL(location.href);u.search='?mappa='+map.id;u.hash='';try{await navigator.clipboard.writeText(u.href);msg('Link della mappa copiato.');$('share').textContent='Link copiato';setTimeout(()=>$('share').textContent='Copia link',2500);}catch{msg('Link della mappa: '+u.href);showView('map');}});
$('download').addEventListener('click',()=>{const lines=['IL VIAGGIO MIGLIORE - SCHEDA DEL GRUPPO','Gruppo: '+($('group').value||'Senza nome'),'','STRATEGIA ATTUALE',$('strategy').value||'(da completare)','','TENTATIVI SALVATI'];attempts.forEach((a,i)=>{const m=attemptMap(a);lines.push('\n'+(i+1)+'. '+m.name,a.route.map(j=>cityText(m,j)).join(' → ')+' → '+cityText(m,0),'Distanza: '+fmt(length(m.points,a.route))+' unità della mappa',a.revealed?'Dopo aver visto l’ottimo':'Prima di vedere l’ottimo','Strategia del tentativo: '+(a.strategy||'(non annotata)'));});lines.push('\nGIRO CORRENTE ('+map.name+')',route.map(j=>cityText(map,j)).join(' → ')+(validTour(map.points,route)?' → '+cityText(map,0):' [incompleto]'),'\nCHE COSA ABBIAMO SCOPERTO',$('reflection').value||'(da completare)');const u=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=u;a.download='scheda-viaggio-migliore.txt';a.hidden=true;document.body.append(a);a.click();$('export-text').value=lines.join('\n');$('export-fallback').hidden=false;setTimeout(()=>{a.remove();URL.revokeObjectURL(u);},1000);});
if(map.challenge)$(map.category==='expert'?'expert-index':'advanced-index').open=true;render();showAttempts();persist();

function renderChallenge(full){
 const panel=$('challenge');panel.hidden=!map.challenge;if(!map.challenge)return;
 if(panel.dataset.map!==map.id){
  panel.dataset.map=map.id;$('challenge-instructions').open=true;$('challenge-level').textContent=map.challenge.level+' · '+map.challenge.minutes+' · in gruppo';$('challenge-mission').textContent=map.challenge.mission;
  $('load-baseline').hidden=!map.baseline;$('challenge-export').hidden=true;$('challenge-export').open=false;
  $('challenge-hints').replaceChildren();map.challenge.hints.forEach((hint,i)=>{const d=document.createElement('details'),s=document.createElement('summary'),p=document.createElement('p');s.textContent='Indizio '+(i+1);p.textContent=hint;d.append(s,p);$('challenge-hints').append(d);});
 }
 const feedback=$('challenge-feedback');feedback.textContent='';
 if(full&&map.baseline){const baseline=length(map.points,map.baseline),delta=baseline-length(map.points,route);feedback.textContent=Math.abs(delta)<1e-8?'Stessa lunghezza del giro proposto. Riuscite a migliorarlo?':delta>0?'Avete battuto il giro proposto: '+fmt(delta)+' unità in meno ('+fmt(delta/baseline*100)+'%). Questo, da solo, non certifica l’ottimo.':'Il giro proposto è ancora più corto di '+fmt(-delta)+' unità.';}
}
$('load-baseline').addEventListener('click',async()=>{if(!map.baseline)return;if(route.length>1&&!await ask('Sostituire il giro corrente con quello proposto? Salva prima il tuo tentativo se vuoi conservarlo. I tentativi già salvati restano nel taccuino.'))return;route=[...map.baseline];revealed=false;$('challenge-instructions').open=false;persist();render();msg('Giro proposto caricato. Studialo, poi ricomincia per costruire la tua alternativa.');});
$('copy-challenge').addEventListener('click',async()=>{if(!map.challenge)return;const text=['SFIDA: '+title(map),map.challenge.mission,'','REGOLE: parti da A, visita ogni altra città una volta e torna ad A. Distanze euclidee: sqrt((x2-x1)^2+(y2-y1)^2). Usa i valori esatti: arrotonda solo il risultato finale.','COORDINATE:',...map.points.map((p,i)=>label(i)+': ('+p.join(', ')+')'),...(map.baseline?['GIRO PROPOSTO: '+map.baseline.map(label).join(' → ')+' → A']:[]),'','Per uno scambio di due archi (2-opt), inverti un tratto del giro mantenendo un unico ciclo.','Riporta un giro completo e la sua lunghezza; distingui una soluzione ammissibile da una dimostrazione di ottimalità. Se non puoi certificare, dichiaralo.'].join('\n');$('challenge-data').value=text;$('challenge-export').hidden=false;try{await navigator.clipboard.writeText(text);msg('Dati e consegna copiati. Nessun dato è stato inviato a servizi AI.');}catch{$('challenge-export').open=true;msg('Puoi copiare il testo della sfida qui sopra.');}});

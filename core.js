(function(root){
'use strict';
const maps=[
{id:'esplorazione',name:'01 · Esplorazione',points:[[12,25],[30,12],[62,10],[87,28],[82,67],[58,85],[28,77],[42,43]]},
{id:'scambio',name:'02 · Scambio',points:[[12,50],[27,17],[50,10],[82,20],[89,56],[71,84],[43,78],[35,42],[64,48]]},
{id:'sfida',name:'03 · Sfida',points:[[62,28],[45,44],[84,47],[34,83],[32,19],[60,73]]}
,{"id": "italia", "name": "Grand tour d’Italia", "background": "assets/italia-relief.png", "names": ["Bolzano", "Milano", "Torino", "Venezia", "Firenze", "Roma", "Napoli", "Palermo"], "points": [[43.6662, 13.0894], [31.6932, 20.726], [23.38, 23.6348], [48.9796, 20.8988], [43.1186, 33.2398], [49.98, 47.0254], [59.779, 54.7868], [54.7648, 74.9918]], "projectionnote": "Distanze in unità della mappa proiettata, in linea retta: non sono chilometri né percorsi stradali.", "title": "Italia", "description": "Parti da A. Clicca tutte le città; il ritorno è automatico.", "category": "world", "offsets": [[0, -25], [-12, -25], [-24, 5], [24, 5], [-24, 4], [24, 4], [24, 4], [24, 4]]},{"id": "europa", "name": "Attraverso l’Europa", "background": "assets/europa-relief.png", "names": ["Roma", "Parigi", "Madrid", "Londra", "Berlino", "Vienna", "Praga", "Amsterdam", "Francoforte", "Zurigo"], "points": [[56.6816, 74.3888], [29.5304, 46.5736], [13.3214, 80.3328], [22.8932, 35.9712], [59.1136, 31.92], [67.0596, 49.1672], [61.8778, 41.698], [36.3608, 32.5296], [46.4726, 41.5564], [46.0968, 52.4924]], "projectionnote": "Distanze in unità della mappa proiettata, in linea retta: non sono chilometri né percorsi stradali.", "title": "Europa", "description": "Dieci città, due tappe nel cuore d’Europa. Come le inserite nel giro?", "category": "world", "offsets": [[24, 4], [24, 4], [24, 4], [-24, 4], [24, -7], [24, 5], [24, 4], [0, -25], [-24, 4], [-24, 4]]},{"id": "lumen", "name": "Terre di Lumen", "title": "Terre di Lumen", "category": "world", "background": "assets/lumen.png", "description": "Otto borghi, un solo viaggio. Ritorna a Borgofoglia.", "names": ["Borgofoglia", "Torre del Vento", "Valdiluce", "Rocca Alta", "Porto delle Stelle", "Guado Antico", "Selvabruna", "Cuore di Lumen"], "points": [[4.0, 34.0], [34.0, 20.0], [66.0, 18.0], [96.0, 40.0], [90.0, 70.0], [58.0, 86.0], [20.0, 76.0], [48.0, 54.0]], "offsets": [[0, -27], [0, -27], [0, -27], [0, -27], [0, -27], [0, -27], [0, -27], [0, -27]], "projectionnote": "Mondo immaginario. Distanze in linea retta: montagne e fiumi non sono ostacoli."}];
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function length(p,r,closed=true){let d=0;for(let i=1;i<r.length;i++)d+=distance(p[r[i-1]],p[r[i]]);if(closed&&r.length>1)d+=distance(p[r[r.length-1]],p[r[0]]);return d;}
function validTour(p,r){return r.length===p.length&&r[0]===0&&new Set(r).size===p.length&&r.every(i=>Number.isInteger(i)&&i>=0&&i<p.length);}
function validDraft(p,r){return Array.isArray(r)&&r.length>=1&&r.length<=p.length&&r[0]===0&&new Set(r).size===r.length&&r.every(i=>Number.isInteger(i)&&i>=0&&i<p.length);}
// Historical eight-city Europe tours retain their original geometry and label.
function attemptMap(a){
 const m=maps.find(m=>m.id===a?.map);
 if(m?.id==='europa'&&Array.isArray(a.route)&&a.route.length===8)return {...m,title:'Europa · versione a 8 città',name:'Attraverso l’Europa · versione a 8 città',points:m.points.slice(0,8),names:m.names.slice(0,8)};
 return m;
}
function nearest(p){const r=[0];while(r.length<p.length){const u=r.at(-1);let best=-1,d=Infinity;for(let v=0;v<p.length;v++)if(!r.includes(v)){const q=distance(p[u],p[v]);if(q<d-1e-10){d=q;best=v;}}r.push(best);}return r;}
function solve(p){
const n=p.length, count=1<<n;const dp=Array.from({length:count},()=>new Float64Array(n).fill(Infinity)), prev=Array.from({length:count},()=>new Int16Array(n).fill(-1));dp[1][0]=0;
for(let mask=1;mask<count;mask+=2)for(let j=0;j<n;j++){if(!Number.isFinite(dp[mask][j]))continue;for(let k=1;k<n;k++)if(!(mask&(1<<k))){const nm=mask|(1<<k),v=dp[mask][j]+distance(p[j],p[k]);if(v<dp[nm][k]){dp[nm][k]=v;prev[nm][k]=j;}}}
let end=0,cost=Infinity;for(let j=1;j<n;j++){const v=dp[count-1][j]+distance(p[j],p[0]);if(v<cost){cost=v;end=j;}}
const route=[];let mask=count-1,j=end;while(j!==-1){route.push(j);const k=prev[mask][j];mask^=1<<j;j=k;}route.reverse();return {route,cost};
}
const api={maps,distance,length,validTour,validDraft,attemptMap,nearest,solve};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TSP=api;
})(typeof globalThis!=='undefined'?globalThis:this);

(function(root){
'use strict';
const maps=[
{id:'esplorazione',name:'01 · Esplorazione',points:[[12,25],[30,12],[62,10],[87,28],[82,67],[58,85],[28,77],[42,43]]},
{id:'scambio',name:'02 · Scambio',points:[[12,50],[27,17],[50,10],[82,20],[89,56],[71,84],[43,78],[35,42],[64,48]]},
{id:'sfida',name:'03 · Sfida',points:[[62,28],[45,44],[84,47],[34,83],[32,19],[60,73]]}
];
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function length(p,r,closed=true){let d=0;for(let i=1;i<r.length;i++)d+=distance(p[r[i-1]],p[r[i]]);if(closed&&r.length>1)d+=distance(p[r[r.length-1]],p[r[0]]);return d;}
function validTour(p,r){return r.length===p.length&&r[0]===0&&new Set(r).size===p.length&&r.every(i=>Number.isInteger(i)&&i>=0&&i<p.length);}
function nearest(p){const r=[0];while(r.length<p.length){const u=r.at(-1);let best=-1,d=Infinity;for(let v=0;v<p.length;v++)if(!r.includes(v)){const q=distance(p[u],p[v]);if(q<d-1e-10){d=q;best=v;}}r.push(best);}return r;}
function solve(p){
const n=p.length, count=1<<n;const dp=Array.from({length:count},()=>new Float64Array(n).fill(Infinity)), prev=Array.from({length:count},()=>new Int16Array(n).fill(-1));dp[1][0]=0;
for(let mask=1;mask<count;mask+=2)for(let j=0;j<n;j++){if(!Number.isFinite(dp[mask][j]))continue;for(let k=1;k<n;k++)if(!(mask&(1<<k))){const nm=mask|(1<<k),v=dp[mask][j]+distance(p[j],p[k]);if(v<dp[nm][k]){dp[nm][k]=v;prev[nm][k]=j;}}}
let end=0,cost=Infinity;for(let j=1;j<n;j++){const v=dp[count-1][j]+distance(p[j],p[0]);if(v<cost){cost=v;end=j;}}
const route=[];let mask=count-1,j=end;while(j!==-1){route.push(j);const k=prev[mask][j];mask^=1<<j;j=k;}route.reverse();return {route,cost};
}
const api={maps,distance,length,validTour,nearest,solve};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TSP=api;
})(typeof globalThis!=='undefined'?globalThis:this);

const assert=require('node:assert/strict');
const {maps,length,validTour,solve,nearest}=require('./core.js');
function brute(p){let best=Infinity;function rec(path,rest){if(!rest.length){best=Math.min(best,length(p,path));return;}rest.forEach((v,i)=>rec([...path,v],rest.filter((_,j)=>i!==j)));}rec([0],p.slice(1).map((_,i)=>i+1));return best;}
for(const m of maps){let s=solve(m.points);assert(validTour(m.points,s.route));assert(Math.abs(length(m.points,s.route)-s.cost)<1e-8);assert(Math.abs(brute(m.points)-s.cost)<1e-8);}
assert(!validTour(maps[0].points,[0,1,2]));assert(!validTour(maps[0].points,[0,1,2,3,4,5,6,6]));
assert(Math.abs(solve([[0,0],[1,0],[1,1],[0,1]]).cost-4)<1e-10);
assert(length(maps[2].points,nearest(maps[2].points))>solve(maps[2].points).cost+0.01);
for(let seed=1;seed<=8;seed++){let p=Array.from({length:6},(_,i)=>[(seed*37+i*19)%93,(seed*17+i*i*11)%89]);assert(Math.abs(brute(p)-solve(p).cost)<1e-8);}
console.log('PASS: soluzione esatta vs enumerazione per 14 mappe; giri non validi; quadrato; controesempio.');
for(const m of maps){const opt=solve(m.points);console.log(m.id,JSON.stringify({ottimo:opt.cost,giro:opt.route.map(i=>String.fromCharCode(65+i)).join('–')+'–A',vicino:length(m.points,nearest(m.points)),regola:nearest(m.points).map(i=>String.fromCharCode(65+i)).join('–')+'–A'}));}
const {validDraft}=require('./core.js');
const fs=require('node:fs');
for(const m of maps){
 assert(m.points.length>=2&&m.points.length<=12);
 assert(m.points.every(p=>p.length===2&&p.every(Number.isFinite)));
 if(m.names)assert.equal(m.names.length,m.points.length);
 if(m.background)assert(fs.existsSync(m.background));
 assert(validDraft(m.points,[0]));
 assert(validDraft(m.points,[0,1]));
 assert(!validDraft(m.points,[1,0]));
 assert(!validDraft(m.points,[0,1,1]));
 assert(!validDraft(m.points,[0,m.points.length]));
 assert(!validDraft(m.points,null));
}
const expected=[257.19470588240335,271.39905728955813,192.32979660042577];
expected.forEach((cost,i)=>assert(Math.abs(solve(maps[i].points).cost-cost)<1e-8));
console.log('PASS: 6 mappe e asset; recupero bozze valido; valori delle 3 mappe originali invariati.');

const assert=require('node:assert/strict');
const {maps:baseMaps,length,validTour,solve,nearest}=require('./core.js');
const maps=[...baseMaps,...require('./challenges.js')];
const branchBound=require('./exact-check.cjs');
function brute(p){let best=Infinity;function rec(path,rest){if(!rest.length){best=Math.min(best,length(p,path));return;}rest.forEach((v,i)=>rec([...path,v],rest.filter((_,j)=>i!==j)));}rec([0],p.slice(1).map((_,i)=>i+1));return best;}
for(const m of maps){let s=solve(m.points);assert(validTour(m.points,s.route));assert(Math.abs(length(m.points,s.route)-s.cost)<1e-8);assert(Math.abs((m.points.length<=10?brute(m.points):branchBound(m.points))-s.cost)<1e-8);}
assert(!validTour(maps[0].points,[0,1,2]));assert(!validTour(maps[0].points,[0,1,2,3,4,5,6,6]));
assert(Math.abs(solve([[0,0],[1,0],[1,1],[0,1]]).cost-4)<1e-10);
assert(length(maps[2].points,nearest(maps[2].points))>solve(maps[2].points).cost+0.01);
for(let seed=1;seed<=8;seed++){let p=Array.from({length:6},(_,i)=>[(seed*37+i*19)%93,(seed*17+i*i*11)%89]);assert(Math.abs(brute(p)-solve(p).cost)<1e-8);}
console.log('PASS: soluzione esatta vs enumerazione per 20 istanze (enumerazione o branch-and-bound); giri non validi; quadrato; controesempio.');
for(const m of maps){const opt=solve(m.points);console.log(m.id,JSON.stringify({ottimo:opt.cost,giro:opt.route.map(i=>String.fromCharCode(65+i)).join('–')+'–A',vicino:length(m.points,nearest(m.points)),regola:nearest(m.points).map(i=>String.fromCharCode(65+i)).join('–')+'–A'}));}
const {validDraft}=require('./core.js');
const fs=require('node:fs');
for(const m of maps){
 assert(m.points.length>=2&&m.points.length<=14);
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
console.log('PASS: 12 mappe e asset; recupero bozze valido; valori delle 3 mappe originali invariati.');
const advanced=require('./challenges.js');
const find=id=>advanced.find(m=>m.id===id);
for(const m of advanced){if(m.baseline)assert(validTour(m.points,m.baseline));assert(m.challenge.mission&&m.challenge.hints.length===2);}
const greedy=find('ultimo-salto');assert.deepEqual(greedy.baseline,nearest(greedy.points));assert(length(greedy.points,greedy.baseline)/solve(greedy.points).cost>1.3);
const trap=find('certificato'),cost=length(trap.points,trap.baseline);
for(let i=1;i<trap.points.length-1;i++)for(let j=i+1;j<trap.points.length;j++){
 const r=[...trap.baseline.slice(0,i),...trap.baseline.slice(i,j+1).reverse(),...trap.baseline.slice(j+1)];
 assert(length(trap.points,r)>=cost-1e-8,'The purported 2-opt local optimum has an improving move');
}
assert(cost/solve(trap.points).cost>1.06);
const crossfree=find('senza-incroci');
const orient=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
const r=crossfree.baseline,p=crossfree.points;
for(let i=0;i<r.length;i++)for(let j=i+1;j<r.length;j++){
 if(j===i+1||(i===0&&j===r.length-1))continue;
 const a=p[r[i]],b=p[r[(i+1)%r.length]],c=p[r[j]],e=p[r[(j+1)%r.length]];
 assert(!(orient(a,b,c)*orient(a,b,e)<0&&orient(c,e,a)*orient(c,e,b)<0));
}
assert(length(p,r)/solve(p).cost>1.2);
const first=find('gemelli-prima'),second=find('gemelli-dopo');
assert.equal(first.points.filter((p,i)=>JSON.stringify(p)!==JSON.stringify(second.points[i])).length,1);
assert(length(second.points,solve(first.points).route)>solve(second.points).cost+1);
const final=find('quattordici');assert.equal(final.points.length,14);assert(length(final.points,final.baseline)/solve(final.points).cost>1.35);
console.log('PASS: greedy trap; crossing-free suboptimal tour; 2-opt local but not global optimum; twins; 14-city challenge.');
const threeOptWitness=[0,3,2,8,9,1,6,5,7,4];
assert(validTour(trap.points,threeOptWitness));assert(length(trap.points,threeOptWitness)<cost-10);
const edges=r=>new Set(r.map((a,i)=>[a,r[(i+1)%r.length]].sort((a,b)=>a-b).join('-')));
assert.equal([...edges(trap.baseline)].filter(e=>!edges(threeOptWitness).has(e)).length,3);
console.log('PASS: a three-edge change refutes the local certificate (279.2 < 290.5).');
// Eight-city attempts must survive the Europe expansion without entering its leaderboard.
const {attemptMap}=require('./core.js');
const europe=maps.find(m=>m.id==='europa');
const historical={map:'europa',route:[0,5,6,4,7,3,1,2],strategy:'Giro esterno'};
const historicalMap=attemptMap(historical);
assert(validTour(historicalMap.points,historical.route));
assert(!validTour(europe.points,historical.route));
assert(validDraft(europe.points,historical.route));
assert.equal(historicalMap.names.length,8);
assert(historicalMap.name.includes('8 città'));
assert(Math.abs(length(historicalMap.points,historical.route)-176.90958132412683)<1e-6);
assert.equal(attemptMap({map:'europa',route:solve(europe.points).route}),europe);
assert.equal(attemptMap({map:'scambio',route:solve(maps[1].points).route}),maps[1]);
console.log('PASS: historical Europe attempts keep their original distance and remain separate from ten-city tours.');

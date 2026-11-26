const assert=require('node:assert/strict');
const {length,solve,validTour,distance}=require('./core.js');
const maps=require('./challenges.js');
const experts=maps.filter(m=>m.category==='expert');
assert.equal(experts.length,3,'Three new expert challenges are required');
for(const m of experts){assert(m.challenge.mission&&m.challenge.hints.length===2);assert.equal(m.challenge.level,'Eccellenza');}
const multi=experts.find(m=>m.id==='false-partenze');
function greedy(start){const r=[start];while(r.length<multi.points.length){const candidates=multi.points.map((_,i)=>i).filter(i=>!r.includes(i));candidates.sort((a,b)=>distance(multi.points[r.at(-1)],multi.points[a])-distance(multi.points[r.at(-1)],multi.points[b])||a-b);r.push(candidates[0]);}return r;}
const costs=multi.points.map((_,i)=>length(multi.points,greedy(i)));
assert(Math.abs(length(multi.points,multi.baseline)-Math.min(...costs))<1e-8);
assert(Math.min(...costs)>solve(multi.points).cost*1.1);
const fort=experts.find(m=>m.id==='fortezza'),r=fort.baseline,p=fort.points,n=r.length,base=length(p,r);
assert(validTour(p,r));
// Exhaust all reconnectings after cutting three cycle edges, including degenerate 2-opt cases.
for(let a=0;a<n-2;a++)for(let b=a+1;b<n-1;b++)for(let c=b+1;c<n;c++){
 const segments=[r.slice(a+1,b+1),r.slice(b+1,c+1),[...r.slice(c+1),...r.slice(0,a+1)]];
 for(const order of [[0,1,2],[0,2,1]])for(let flags=0;flags<4;flags++){
 const candidate=[...segments[0]];
 for(let i=1;i<=2;i++)candidate.push(...((flags&(1<<(i-1)))?segments[order[i]].toReversed():segments[order[i]]));
 assert(length(p,candidate)>=base-1e-8,'Three-edge improvement found');
 }
}
assert(base>solve(p).cost*1.02);
const proof=experts.find(m=>m.id==='giro-prova');
const minimum=Math.min(...proof.points.flatMap((p,i)=>proof.points.slice(i+1).map(q=>distance(p,q))));
assert.equal(minimum,20);
assert.equal(solve(proof.points).cost,proof.points.length*minimum);
console.log('PASS: all 14 greedy starts fail; every 3-edge reconnection fails; grid optimum meets a rigorous lower bound.');
const witness=[0,5,7,12,9,4,3,11,2,1,10,13,8,6];
assert(validTour(p,witness));assert(length(p,witness)<base-0.5);
const edges=r=>new Set(r.map((a,i)=>[a,r[(i+1)%r.length]].sort((a,b)=>a-b).join('-')));
assert.equal([...edges(r)].filter(e=>!edges(witness).has(e)).length,4);
console.log('PASS: the teacher counterexample changes exactly four edges and shortens the fortress tour.');

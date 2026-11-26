// Independent exact verifier for tests: branch-and-bound with an MST lower bound.
module.exports=function exactCheck(points){
 const n=points.length,d=points.map(a=>points.map(b=>Math.hypot(a[0]-b[0],a[1]-b[1]))),cache=new Map();
 let best=Infinity;
 function mst(mask){if(cache.has(mask))return cache.get(mask);const vs=[];for(let i=1;i<n;i++)if(mask&(1<<i))vs.push(i);if(vs.length<2)return 0;let total=0;const seen=new Set([vs[0]]),cost=Array(n).fill(Infinity);for(const v of vs)cost[v]=d[vs[0]][v];while(seen.size<vs.length){let v=-1;for(const q of vs)if(!seen.has(q)&&(v<0||cost[q]<cost[v]))v=q;total+=cost[v];seen.add(v);for(const q of vs)cost[q]=Math.min(cost[q],d[v][q]);}cache.set(mask,total);return total;}
 function visit(last,remaining,cost){if(!remaining){best=Math.min(best,cost+d[last][0]);return;}let from=Infinity,to=Infinity;const next=[];for(let v=1;v<n;v++)if(remaining&(1<<v)){from=Math.min(from,d[last][v]);to=Math.min(to,d[v][0]);next.push(v);}if(cost+from+mst(remaining)+to>=best-1e-10)return;next.sort((a,b)=>d[last][a]-d[last][b]);for(const v of next)visit(v,remaining^(1<<v),cost+d[last][v]);}
 visit(0,((1<<n)-1)^1,0);return best;
};

import test from'node:test';import assert from'node:assert/strict';import{SCENES,DIFFICULTIES,VERY_HARD_DIFFICULTIES,difficultiesFor,recommendedSize,CHALLENGE_COUNT,newState,restoreState,startPuzzle,shuffle,seeded,swap,hint,complete,resetRun,tick,leagueIndex,standings,correctCount,searchScenes,isLocked}from'./engine.js';import{artwork}from'./illustrations.js';
function solve(s){let guard=100;while(correctCount(s.current)!==s.current.tiles.length&&guard--)hint(s);assert.ok(guard>0);}
test('all 395 pictures have unique IDs, names and seeded artwork',()=>{assert.equal(SCENES.length,395);assert.equal(new Set(SCENES.map(s=>s.id)).size,395);assert.equal(new Set(SCENES.map(s=>s.name)).size,395);const art=SCENES.filter(s=>s.illustrated).map(s=>artwork(s.seed,s.category));assert.equal(new Set(art).size,300);assert.ok(art.every(a=>a.startsWith('<svg')&&a.endsWith('</svg>')));});
test('every board size is fully scrambled, valid and solvable by swaps',()=>{for(const d of DIFFICULTIES)for(let seed=0;seed<100;seed++){const a=shuffle(d.n,seeded(seed));assert.equal(new Set(a).size,d.n*d.n);assert.equal(a.filter((v,i)=>v===i).length,0);const s=newState(seed);startPuzzle(s,'harbour',d.n);s.current.tiles=a;solve(s);assert.equal(correctCount(s.current),d.n*d.n);}});
test('arbitrary swaps work and reject invalid moves',()=>{const s=newState();startPuzzle(s,'cottage',3);const old=[...s.current.tiles];assert.ok(swap(s,0,8));assert.equal(s.current.tiles[0],old[8]);assert.equal(s.current.tiles[8],old[0]);assert.equal(s.current.moves,1);assert.equal(swap(s,-1,2),false);assert.equal(swap(s,0,9),false);assert.equal(swap(s,2,2),false);});
test('completion pays difficulty tokens once and records completion time',()=>{for(const d of DIFFICULTIES){const s=newState();startPuzzle(s,'harbour',d.n);assert.equal(complete(s,'2026-10-27'),null);s.current.elapsed=73.4;solve(s);assert.equal(complete(s,'2026-10-27').reward,d.reward);assert.equal(s.tokens,d.reward);assert.equal(s.records['harbour-'+d.n].best,73.4);assert.equal(complete(s,'2026-10-27'),null);assert.equal(s.tokens,d.reward);assert.equal(hint(s),false);}});
test('daily bonus can only be collected once per local day',()=>{const s=newState();for(let i=0;i<2;i++){startPuzzle(s,'cottage',3,'2026-10-27');solve(s);const r=complete(s,'2026-10-27');assert.equal(r.dailyBonus,i===0?20:0);}assert.equal(s.tokens,80);});
test('promotions follow 3 and 6 solves; a new run keeps tokens, album and personal bests',()=>{const s=newState(12);for(let i=0;i<6;i++){startPuzzle(s,'harbour',3);solve(s);complete(s,'2026-10-27');assert.equal(leagueIndex(s),Math.min(2,Math.floor((i+1)/3)));}const album=JSON.stringify(s.album),records=JSON.stringify(s.records);resetRun(s,42);assert.equal(leagueIndex(s),0);assert.equal(s.runWins,0);assert.equal(s.runPoints,0);assert.equal(s.tokens,180);assert.equal(s.totalWins,6);assert.equal(JSON.stringify(s.album),album);assert.equal(JSON.stringify(s.records),records);assert.equal(s.current,null);});
test('save and reload preserve an unfinished puzzle, timer, identity and tokens',()=>{const s=newState();s.name='Steve';s.avatar='🐼';startPuzzle(s,'escape-3-14-4',6);swap(s,1,6);tick(s,1.25);const restored=restoreState(JSON.stringify(s));assert.deepEqual(restored,s);assert.equal(restored.current.elapsed,1.25);assert.equal(restored.current.moves,1);});
test('malformed storage recovers safely',()=>{assert.equal(restoreState('broken').v,1);const s=newState();startPuzzle(s,'harbour',3);s.current.tiles=[1,1,1];assert.equal(restoreState(JSON.stringify(s)).current,null);});
test('simulated rivals advance with play and ranks reflect actual run tokens',()=>{const s=newState(9);startPuzzle(s,'harbour',3);const before=s.rivals.map(b=>b.score);tick(s,1);assert.ok(s.rivals.every((b,i)=>b.score>before[i]));assert.equal(s.current.elapsed,1);s.runPoints=1000;assert.equal(standings(s)[0].id,'you');s.runPoints=0;assert.equal(standings(s).at(-1).id,'you');});
test('personal best keeps fastest solve while last time updates',()=>{const s=newState();for(const seconds of[120,80,100]){startPuzzle(s,'waterfall',3);s.current.elapsed=seconds;solve(s);complete(s,'2026-10-27');}assert.deepEqual(s.records['waterfall-3'],{best:80,last:100,solves:3});});

test('animal collections have six playable paintings each and preserve old saves',()=>{for(const category of['Cats','Dogs','Animals']){const pics=SCENES.filter(p=>p.category===category);assert.equal(pics.length,6);assert.ok(pics.every(p=>!p.illustrated));for(const p of pics){const s=newState();startPuzzle(s,p.id,4);solve(s);assert.equal(complete(s,'2026-10-27').reward,60);}}const s=newState();s.tokens=90;s.album['harbour-3']=true;startPuzzle(s,'harbour',3);const restored=restoreState(JSON.stringify(s));assert.equal(restored.tokens,90);assert.equal(restored.album['harbour-3'],true);assert.equal(restored.current.scene,'harbour');});


test('Poland collection contains 60 credited images, six artists and working accent-insensitive search',()=>{
 const poland=searchScenes('Poland');assert.equal(poland.length,60);
 for(const [category,count] of [['Polish art',24],['Polish cities',24],['Polish scenes',12]])assert.equal(searchScenes(category).length,count);
 const artists=new Map();for(const p of searchScenes('Polish art'))artists.set(p.artist,(artists.get(p.artist)||0)+1);
 assert.equal(artists.size,6);assert.ok([...artists.values()].every(n=>n===4));
 assert.equal(searchScenes('Poland','Chelmonski').length,4);assert.equal(searchScenes('Poland','Wroclaw').length,2);assert.equal(searchScenes('All','Łódź').length,1);
 assert.equal(searchScenes('Cats','Matejko').length,0);
 for(const p of poland){assert.equal(p.country,'Poland');assert.ok(p.creator);assert.match(p.source,/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);assert.match(p.licenseUrl,/^https:/);assert.ok(p.license);assert.ok(p.imageWidth>0&&p.imageHeight>0);assert.ok(Math.abs(p.aspectRatio-p.imageWidth/p.imageHeight)<0.000001);const s=newState();startPuzzle(s,p.id,3);solve(s);assert.equal(complete(s,'2026-10-28').reward,30);const restored=restoreState(JSON.stringify(s));assert.equal(restored.current.scene,p.id);assert.equal(restored.tokens,30);}
});


test('Very Hard textures offer 36 and 64 cards, with accurate collection totals',()=>{
 const pics=searchScenes('Very Hard');assert.equal(pics.length,11);assert.deepEqual(pics.slice(0,3).map(p=>p.id),['vh-beans','vh-grass','vh-sand']);assert.ok(['vh-sky','vh-pasta','vh-rice','vh-popcorn','vh-steel-washers','vh-steel-nuts','vh-wood-blocks','vh-wood-rings'].every(id=>pics.some(p=>p.id===id)));assert.equal(CHALLENGE_COUNT,1558);
 assert.deepEqual(difficultiesFor('harbour'),DIFFICULTIES);assert.deepEqual(difficultiesFor('missing'),[]);
 for(const p of pics){assert.equal(recommendedSize(newState(),p),8);assert.deepEqual(difficultiesFor(p),VERY_HARD_DIFFICULTIES);assert.throws(()=>startPuzzle(newState(),p.id,3));}
 assert.throws(()=>startPuzzle(newState(),'harbour',8));
});
test('64-card textures shuffle, swap, save, solve and pay once; resets retain their badges and times',()=>{
 for(const p of searchScenes('Very Hard'))for(const d of difficultiesFor(p))for(let seed=0;seed<20;seed++){
  const s=newState(seed);startPuzzle(s,p.id,d.n);s.current.tiles=shuffle(d.n,seeded(seed));assert.equal(correctCount(s.current),0);assert.equal(new Set(s.current.tiles).size,d.n*d.n);
  const before=[...s.current.tiles];assert.ok(swap(s,0,d.n*d.n-1));assert.equal(s.current.tiles[0],before.at(-1));tick(s,1.5);const restored=restoreState(JSON.stringify(s));assert.deepEqual(restored,s);solve(restored);const result=complete(restored,'2026-10-28');assert.equal(result.reward,d.reward);assert.equal(restored.records[p.id+'-'+d.n].best,1.5);assert.equal(complete(restored,'2026-10-28'),null);resetRun(restored);assert.equal(restored.tokens,d.reward);assert.equal(restored.album[p.id+'-'+d.n],true);assert.equal(restored.records[p.id+'-'+d.n].best,1.5);
 }
});


test('correct-piece locking prevents moving or replacing a fixed tile, and unlocks immediately',()=>{
 const s=newState();startPuzzle(s,'harbour',3);s.current.tiles=[0,2,1,3,4,5,6,7,8];s.lockCorrect=true;
 assert.equal(isLocked(s,0),true);assert.equal(isLocked(s,1),false);assert.equal(isLocked(s,-1),false);assert.equal(isLocked(s,99),false);
 const before=[...s.current.tiles];assert.equal(swap(s,0,1),false);assert.equal(swap(s,1,0),false);assert.deepEqual(s.current.tiles,before);assert.equal(s.current.moves,0);
 assert.equal(swap(s,1,2),true);assert.equal(isLocked(s,1),true);assert.equal(isLocked(s,2),true);assert.equal(swap(s,1,2),false);
 s.lockCorrect=false;assert.equal(isLocked(s,1),false);assert.equal(swap(s,1,2),true);assert.equal(s.current.moves,2);
});
test('lock preference and derived locks survive reloads and new runs; old saves default to unlocked',()=>{
 const s=newState();s.tokens=123;startPuzzle(s,'vh-sky',8);s.lockCorrect=true;hint(s);s.current.elapsed=17;const restored=restoreState(JSON.stringify(s));assert.deepEqual(restored,s);assert.equal(isLocked(restored,0),true);resetRun(restored);assert.equal(restored.lockCorrect,true);assert.equal(restored.tokens,123);startPuzzle(restored,'harbour',3);assert.equal(restored.lockCorrect,true);
 const old={...s};delete old.lockCorrect;assert.equal(restoreState(JSON.stringify(old)).lockCorrect,false);old.lockCorrect='yes';assert.equal(restoreState(JSON.stringify(old)).lockCorrect,false);
});
test('hints preserve every locked piece and all board sizes remain solvable with locking on',()=>{
 for(const [id,n] of [['harbour',3],['harbour',4],['harbour',5],['harbour',6],['vh-sky',8]])for(let seed=0;seed<20;seed++){
  const s=newState(seed);s.lockCorrect=true;startPuzzle(s,id,n);s.current.tiles=shuffle(n,seeded(seed));let guard=100;
  while(correctCount(s.current)<n*n&&guard--){const locked=s.current.tiles.map((v,i)=>v===i?i:-1).filter(i=>i>=0);const count=correctCount(s.current);assert.equal(hint(s),true);assert.ok(correctCount(s.current)>count);assert.ok(locked.every(i=>s.current.tiles[i]===i));}
  assert.ok(guard>0);assert.equal(complete(s,'2026-10-29').reward,difficultiesFor(id).find(d=>d.n===n).reward);
 }
});

const {test}=require('node:test');const assert=require('node:assert/strict');const {schedule,retention,DAY}=require('./memory.js');
test('first recall, second recall and subsequent spacing',()=>{let s=schedule({},2,0);assert.equal(s.interval,1);assert.equal(s.due,DAY);s=schedule(s,2,DAY);assert.equal(s.interval,6);s=schedule(s,2,DAY*7);assert.equal(s.interval,15);});
test('forgetting resets repetitions, retains flags, schedules ten minutes',()=>{const s=schedule({reps:4,interval:30,favorite:true,lapses:2},0,1000);assert.equal(s.due,601000);assert.equal(s.reps,0);assert.equal(s.lapses,3);assert.equal(s.favorite,true);assert.equal(s.interval,0);});
test('hard ratings remain short and ease stays bounded',()=>{let s={};for(let i=0;i<50;i++)s=schedule(s,1,1000);assert.ok(s.ease>=1.3);assert.equal(s.interval,1);});
test('easy recall spaces further than regular recall',()=>{assert.ok(schedule({},3,0).interval>schedule({},2,0).interval);});
test('retention is null for unseen words and decreases with elapsed time',()=>{assert.equal(retention({},1000),null);const s=schedule({},2,1000);assert.equal(retention(s,1000),1);assert.ok(retention(s,DAY+1000)<retention(s,1000));});

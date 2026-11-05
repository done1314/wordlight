// Transparent SM-2-style spacing; not the proprietary algorithms of other apps.
(function(root){
 const DAY=86400000;
 function schedule(previous={},grade,now=Date.now()){
  let ease=previous.ease||2.5, reps=previous.reps||0, interval=previous.interval||0;
  const lapses=(previous.lapses||0)+(grade===0?1:0);
  if(grade===0){reps=0;interval=0;return {...previous,ease:Math.max(1.3,ease-.2),reps,interval,lapses,due:now+600000,last:now,reviews:(previous.reviews||0)+1,known:false};}
  if(grade===1){interval=Math.max(1,Math.round((interval||1)*1.2));ease=Math.max(1.3,ease-.15);}
  else{reps++;interval=reps===1?1:reps===2?6:Math.max(1,Math.round(interval*ease));if(grade===3){interval=Math.max(4,Math.round(interval*1.3));ease=Math.min(3.5,ease+.15);}}
  return {...previous,ease,reps,interval,lapses,due:now+interval*DAY,last:now,reviews:(previous.reviews||0)+1,known:false};
 }
 function retention(state,now=Date.now()){if(!state?.last)return null;if(state.known)return 1;return Math.exp(-Math.max(0,now-state.last)/DAY/Math.max(.12,state.interval||.12));}
 root.Memory={schedule,retention,DAY};if(typeof module!=='undefined')module.exports=root.Memory;
})(typeof window!=='undefined'?window:globalThis);

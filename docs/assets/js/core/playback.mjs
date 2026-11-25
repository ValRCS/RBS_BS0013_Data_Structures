// Reusable event-snapshot player. UI supplies render and state callbacks.
export function player(render, change=()=>{}) {
  let frames=[], index=0, timer=null, delay=500;
  const show=()=>{if(frames.length)render(frames[index],index,frames.length);change(index,frames.length,timer!==null)};
  const stop=()=>{if(timer!==null)clearInterval(timer);timer=null;};
  const seek=i=>{index=Math.max(0,Math.min(frames.length-1,i));show()};
  const play=()=>{if(!frames.length)return;if(index===frames.length-1)index=0;stop();timer=setInterval(()=>{if(index>=frames.length-1){stop();show();return}seek(index+1);if(index===frames.length-1){stop();show()}},delay);show()};
  return {load(next){stop();frames=next;index=0;show()},clear(){stop();frames=[];index=0;show()},seek(i){stop();seek(i)},step(n){stop();seek(index+n)},toggle(){if(timer!==null){stop();show()}else play()},speed(ms){delay=ms;if(timer!==null)play()},pause(){stop();show()}};
}

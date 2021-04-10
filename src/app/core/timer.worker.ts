/// <reference lib="webworker" />

function timer(){
  console.log('timer fired');
  postMessage(new Date().toISOString());
}

setInterval(timer, 60 * 1000);

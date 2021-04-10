/// <reference lib="webworker" />

function timer(){
  postMessage(new Date().toISOString());
}

setInterval(timer, 60 * 1000);

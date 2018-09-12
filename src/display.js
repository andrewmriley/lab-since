import Worker from 'worker-loader!./worker.js';

const worker = new Worker();
const output = document.getElementById('output');

worker.onmessage = event => output.innerHTML = event.data; 

export const post = args => worker.postMessage(args);
import Worker from 'worker-loader!./worker.js';

const worker = new Worker();
const output = document.getElementById('output');

export const post = args => worker.postMessage(args);

worker.onmessage = event => output.innerHTML = event.data; 
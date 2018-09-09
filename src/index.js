import {getArgs} from './address.js';
import Worker from 'worker-loader!./worker.js';

const args = getArgs();
const output = document.getElementById('output');

const worker = new Worker();
worker.postMessage(args);
worker.onmessage = event => output.innerHTML = event.data; 

import {chunks} from './global.js';

let timeBank = 0;
let timerStart = true;
let display;
let dateTime;
let timer;

const calc = () => {
    timeBank = (new Date() - dateTime) / 1000;

    chunks.forEach(chunk => {
        if (display & chunk.bit) {
            const c = Math.floor(timeBank / chunk.delta);
            timeBank -= c * chunk.delta;
            chunk.value = c;
        }
    });
};

const displayMessage = () => {
    const output = [];
    chunks.forEach(chunk => {
        if ((display & chunk.bit) && chunk.value !== 0) {
            let message = chunk.value.toString() + " " + chunk.text;
            message += chunk.value > 1 ? "s": "";
            output.push(message);
        }
    });
    return output.join(" ").trim();
};

onmessage = event => {
    display = event.data.display;
    dateTime = event.data.dateTime;
    calc();
    postMessage(displayMessage());
}

if (timerStart) {
    timer = setInterval(() => {
        calc();
        postMessage(displayMessage());
    }, 1000);
    timerStart = false;
}
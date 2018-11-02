import {chunks} from './global.js';

let timeBank = 0;
let timerStart = true;
let display;
let dateTime;

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
    const output = chunks.map(chunk => 
        (display & chunk.bit) && chunk.value > 0 ? `${chunk.value.toString()} ${chunk.text}${chunk.value > 1 ? "s" : ""}` : ""
    );
    return output.length ? output.join(" ").trim() : "Something went wrong. You must use a valid date/time.";
};

onmessage = event => {
    display = event.data.display;
    dateTime = event.data.dateTime;
    calc();
    postMessage(displayMessage());
}

if (timerStart) {
    setInterval(() => {
        calc();
        postMessage(displayMessage());
    }, 500);
    timerStart = false;
}
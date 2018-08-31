import {chunks} from '../global.js';

let timeBank = 0;

const calc = delta => {
    const c = Math.floor(timeBank / delta);
    timeBank -= c * delta;
    return c;
};

export const calcSince = (display, sinceDate) => {
    timeBank = (new Date() - sinceDate) / 1000;

    chunks.forEach(chunk => {
        if (display & chunk.bit) {
            chunk.value = calc(chunk.delta);
        }
    });
};
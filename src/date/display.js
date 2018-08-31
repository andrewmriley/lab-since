import {chunks} from '../global.js';

export const displaySince = display => {
    const output = [];
    chunks.forEach(chunk => {
        if (display & chunk.bit) {
            output.push(chunk.value + chunk.text)
        }
    });
    return output.join("").trim();
};
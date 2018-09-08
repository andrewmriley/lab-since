import {chunks} from '../global.js';

export const displaySince = display => {
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
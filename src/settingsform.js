import {setArgs} from './address.js';
import {chunks} from './global.js';

const form = document.getElementById("settings");
const formToggle = document.getElementById("formtoggle");
const chunksRegion = document.getElementById("chunks");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");

export const initForm = ({display, dateTime}) => {
    createChunks(display);
    mapEvents(dateTime);
};

const mapEvents = dateTime => {
    const chunkFields = document.getElementsByName("chunk");

    dateField.value = dateTime.toISOString().substr(0,10);
    timeField.value = dateTime.toTimeString().substr(0,8);

    form.addEventListener("submit", e => {
        e.preventDefault();
        const newDt = new Date(dateField.value + 'T' + timeField.value);
        let bit = 0;
        chunkFields.forEach(c => {
            if (c.checked) {
                bit += parseInt(c.value);
            }
        });

        setArgs({
            dt: newDt.toISOString(),
            d: bit
        });
    });

    formToggle.onclick = () => {
        if (form.offsetParent === null) {
            form.style.display = "block";
            formToggle.innerText = "Hide form";
        } else {
            form.style.display = "none";
            formToggle.innerText = "Show form";
        }
    };
};

const createChunks = display => {
    chunksRegion.innerHTML = chunks.map(chunk => 
       `<label>${chunk.text}
           <input type="checkbox" name="chunk" value="${chunk.bit}" ${display & chunk.bit ? "checked" : ""}>
       </label>`
    ).join('<br>');
};
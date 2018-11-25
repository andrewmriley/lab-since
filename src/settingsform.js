import {setArgs} from './address.js';
import {chunks} from './global.js';

let form;
let formToggle;
let chunksRegion;
let chunkFields;
let dateField;
let timeField;
let hf;
const showText = "Show Form";
const hideText = "Hide Form";

export const initForm = ({display, dateTime, hideForm}) => {
    hf = parseInt(hideForm);
    createForm();
    createChunks(display);
    mapEvents(dateTime);
};

const createForm = () => {
    form = document.getElementById("settingsform");
    formToggle = document.getElementById("formtoggle");
    chunksRegion = document.getElementById("chunks");
    dateField = document.getElementById("date");
    timeField = document.getElementById("time");
    if (hf) {
        formToggle.innerHTML = showText;
        form.style.display = "none";
    }
    else {
        formToggle.innerHTML = hideText;
    }
}

const mapEvents = dateTime => {
    dateField.value = dateTime.toISOString().substr(0,10);
    timeField.value = dateTime.toTimeString().substr(0,8);

    form.addEventListener("submit", e => {
        e.preventDefault();
        updateArgs();
    });

    formToggle.onclick = () => {
        if (form.offsetParent === null) {
            form.style.display = "block";
            formToggle.innerText = hideText;
            hf = 0;
        } else {
            form.style.display = "none";
            formToggle.innerText = showText;
            hf = 1;
        }
        updateArgs();
    };
};

const updateArgs = () => {
    const newDt = new Date(dateField.value + 'T' + timeField.value);
    let bit = 0;
    chunkFields.forEach(c => {
        if (c.checked) {
            bit += parseInt(c.value);
        }
    });

    setArgs({
        dt: newDt.toISOString(),
        d: bit,
        hf: hf
    });
};

const createChunks = display => {
    chunksRegion.innerHTML = chunks.map(chunk => 
       `<label>${chunk.text}
           <input type="checkbox" name="chunk" value="${chunk.bit}" ${display & chunk.bit ? "checked" : ""}>
       </label>`
    ).join('<br>');
    chunkFields = document.getElementsByName("chunk");
};
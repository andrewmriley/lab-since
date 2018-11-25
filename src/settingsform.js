import {setArgs} from './address.js';
import {chunks} from './global.js';

let form;
let formToggle;
let chunksRegion;
let dateField;
let timeField;

export const initForm = ({display, dateTime}) => {
    createForm();
    createChunks(display);
    mapEvents(dateTime);
};

const createForm = () => {
    document.getElementById("settings").innerHTML = 
    `    <div id="formtoggle">Hide Form</div>
    <form id="settingsform">
    <p>Enter a date to calcuate the time since. Select segments to display that time by. You can then return using the updated address for this page.</p>
      <h2>Settings</h2>
      <label>Date: 
        <input type="date" id="date">
      </label>
      <label>Time:
        <input type="time" id="time" step="1">
      </label>
      <div id="display">
        <h3>Segments to display:</h3>
        <div id="chunks"></div>
      </div>
      <input type="submit" id="update" value="Update settings">
    </form>`;
    form = document.getElementById("settingsform");
    formToggle = document.getElementById("formtoggle");
    chunksRegion = document.getElementById("chunks");
    dateField = document.getElementById("date");
    timeField = document.getElementById("time");
}

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
            d: bit,
            hf: 0
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
import {setArgs} from './address.js';

const form = document.getElementById("settings");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");

export const initForm = ({display, dateTime}) => {
    dateField.value = dateTime.toISOString().substr(0,10);
    timeField.value = dateTime.toTimeString().substr(0,8);

    form.addEventListener("submit", e => {
        e.preventDefault();
        const newDt = new Date(dateField.value + 'T' + timeField.value);

        setArgs({
            dt: newDt.toISOString(),
            d: 15
        });
    });
}
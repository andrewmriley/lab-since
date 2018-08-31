import {getArgs} from './address.js';
import {calcSince} from './date/calc.js';
import {displaySince} from './date/display.js';

const component = output => {
  let element = document.createElement('div');

  element.innerHTML = output;

  return element;
}

const {display, dateTime} = getArgs();
calcSince(display, dateTime)
const output = displaySince(display);

document.body.appendChild(component(output));
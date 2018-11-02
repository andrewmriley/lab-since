import {getArgs} from './address.js';
import {initForm} from './settingsform.js';
import {post} from './display.js';

const args = getArgs();

post(args);
if (args.hideForm === null || args.hideForm === "0") {
    initForm(args);
}
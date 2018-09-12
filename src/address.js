import {post} from './display.js';

const getDateTime = (dt = "1970-01-01T:12:00:00.000Z") => new Date(dt);

const getDisplay = (d = 15) => d;

export const setArgs = args => {
  let url = new URL(window.location);
  let {dt, d} = args;
  
  url.searchParams.set("dt", dt);
  url.searchParams.set("d", d);
  history.pushState(null, null, url);
  post(getArgs());
};

export const getArgs = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    dateTime: getDateTime(params.get("dt")),
    display: getDisplay(params.get("d"))
  };
};
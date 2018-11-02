import {post} from './display.js';

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
  const dt = params.get("dt");
  return {
    dateTime: dt === null ? new Date() : new Date(dt),
    display: params.get("d") || 15
  };
};

window.addEventListener("haschange", () => {
  console.log('change');
});
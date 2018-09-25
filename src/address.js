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
  return {
    dateTime: new Date(params.get("dt")),
    display: params.get("d") || 15
  };
};

window.addEventListener("haschange", () => {
  console.log('change');
});
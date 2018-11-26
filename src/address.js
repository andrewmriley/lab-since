import {post} from "./display.js";

export const setArgs = ({dt, d, hf}) => {
  let url = new URL(window.location);
  
  url.searchParams.set("dt", dt);
  url.searchParams.set("d", d);
  url.searchParams.set("hf", hf);
  history.pushState(null, null, url);
  post(getArgs());
};

export const getArgs = () => {
  const params = new URLSearchParams(window.location.search);
  const dt = params.get("dt");
  return {
    dateTime: dt === null ? new Date() : new Date(dt),
    display: params.get("d") || 15,
    hideForm: params.get("hf")
  };
};
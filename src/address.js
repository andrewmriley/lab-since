const getDateTime = (date = "1970-01-01", time = "12:00:00") => new Date(date + 'T' + time);

const getDisplay = (d = 15) => {
  return d;
}

export const getArgs = () => {
  let params = new URLSearchParams(window.location.search);
  return {
    dateTime: getDateTime(params.get("date"), params.get("time")),
    display: getDisplay(params.get("d"))
  };
};
const getDateTime = (date, time) => {
  if (date === null) {
    date = '1970-01-01';
  }
  if (time === null) {
    time = '12:00:00';
  }
  return new Date(date + 'T' + time);
}

const getDisplay = d => {
  if (d === null) {
    return 15;
  }
  return d;
}

export const getArgs = () => {
  let params = new URLSearchParams(window.location.search);
  return {
    dateTime: getDateTime(params.get("date"), params.get("time")),
    display: getDisplay(params.get("d"))
  };
};
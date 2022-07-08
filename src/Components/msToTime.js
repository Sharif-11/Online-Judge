const msToTime = (curr, flag = false) => {
  if (curr < 0) {
    return;
  }
  let hours = parseInt(curr / 3600000);
  curr = curr % 3600000;
  let minutes = parseInt(curr / 60000);
  curr = curr % 60000;
  let seconds = parseInt(curr / 1000);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (flag) {
    return `${hours}:${minutes}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};
export default msToTime;

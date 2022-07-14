const findUpcomingContest = (data) => {
  let arr = [];
  const now = new Date().getTime();
  for (let i = 0; i < data?.length; i++) {
    if (Math.abs(data[i].startTime - now) <= 23 * 3600000) {
      if (data[i].startTime > now) {
        data[i].runningState = "upcoming";
        arr.push(data[i]);
      } else if (now - data[i].startTime >= data[i].duration) {
        data[i].runningState = "ended";
        arr.push(data[i]);
      } else if (data[i].startTime <= now) {
        data[i].runningState = "running";
        arr.push(data[i]);
      }
    }
  }
  return arr;
};
export default findUpcomingContest;

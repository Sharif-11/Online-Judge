import React, { useEffect, useState } from "react";

const TimeNow = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setHour(date.getHours());
      setMinute(date.getMinutes());
      setSecond(date.getSeconds());
    }, 1000);
  }, []);
  return (
    <div>
      {hour}:{minute}:{second}
    </div>
  );
};

export default TimeNow;

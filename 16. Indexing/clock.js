const EventEmitter = require("node:events");

class Clock extends EventEmitter {
  // this = {}

  start() {
    setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      this.emit("fulltime", {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });

      this.emit("second", seconds);

      if (seconds == 0) {
        this.emit("minute", minutes);
      }

      if (seconds == 0 && minutes == 0) {
        this.emit("hour", hours);
      }
    }, 1000);
  }
}

const clock = new Clock();

clock.on("fulltime", (fulltime) => {
  const { seconds, minutes, hours } = fulltime;

  console.log(`${hours}시 ${minutes}분 ${seconds}초`);
  console.log(`${hours}:${formatTime(minutes)}:${formatTime(seconds)}`);
});

clock.on("second", (seconds) => {
  console.log(`현재 시각: ${formatTime(seconds)}`);
});

clock.on("minute", (minutes) => {
  console.log(`분이 바뀌었습니다: ${formatTime(minutes)}`);
});

clock.on("hour", (hours) => {
  console.log(`시간이 바뀌었습니다: ${formatTime(hours)}`);
});

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

clock.start();

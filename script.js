const counter = {
  workTime: 25,
  shortBreak: 5,
  longBreak: 15,
};

const workChoice = document.getElementById("workChoice");
const shortChoice = document.getElementById("shortChoice");
const longChoice = document.getElementById("longChoice");
const settingOption = document.querySelector("[class=settingChoice]");
const startStop = document.getElementById("startStop");
const timeCounter = document.getElementById("timeCounter");

let timePassed = 0;

function switchSetting(e) {
  startStop.classList.replace("fa-hourglass-start", "fa-hourglass-end");
  startStop.dataset.paused = "true";

  for (let i = 0; i < 3; i++) {
    e.path[1].children[i].classList.remove("active");
  }
  e.target.classList.add("active");

  let setting = e.target.dataset.mode;
  timeCounter.dataset.mode = setting;

  if (timeCounter.dataset.mode === "pomodoro") {
    timeCounter.innerHTML = `${counter.workTime}:00`;
  } else if (timeCounter.dataset.mode === "short") {
    timeCounter.innerHTML = `0${counter.shortBreak}:00`;
  } else {
    timeCounter.innerHTML = `${counter.longBreak}:00`;
  }
}

function mainFunction() {
  function startCounter() {
    if (timeCounter.dataset.mode === "pomodoro") {
      timePassed = counter.workTime * 60;
    } else if (timeCounter.dataset.mode === "short") {
      timePassed = counter.shortBreak * 60;
    } else {
      timePassed = counter.longBreak * 60;
    }
  }

  if (startStop.classList.contains("fa-hourglass-end")) {
    startStop.classList.replace("fa-hourglass-end", "fa-hourglass-start");
    startStop.dataset.paused = "false";

    startCounter();

    time = setInterval(() => {
      let countdown =
        `${("0" + Math.floor(timePassed / 60)).slice(-2)}:${("0" + (timePassed % 60)).slice(-2)}`;
      timeCounter.innerHTML = countdown;
      document.title = `${countdown} - ${
        timeCounter.dataset.mode === "pomodoro" ? "Work" : "Break"
      }`;

      if (startStop.dataset.paused === "true" || timePassed === 0) {
        clearInterval(time);
      }
      timePassed--;
    }, 1000);
  } else {
    startStop.classList.replace("fa-hourglass-start", "fa-hourglass-end");
    startStop.dataset.paused = "true";
  }
}

settingOption.addEventListener("click", switchSetting);
startStop.addEventListener("click", mainFunction);

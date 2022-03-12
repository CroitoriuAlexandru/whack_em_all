import {
  tryGettingMole,
  getScoreElem as sendScoreElem,
  resetMoles,
} from "./modules/mole.js";

const INTERVAL = 5; // how many times per seccond the game tries to put a mole
let gameBoard = document.getElementById("gameBoard");
let scoreDisplay = document.getElementById("scoreDisplay");
let gameTimer = document.getElementById("gameTimer");
let gameBtn = document.getElementById("gameBtn");
let intervalId; // id of the interval
let timerId; // id of the timer

// handle click events for gameBtn (start game / reset game)
gameBtn.addEventListener("click", () => {
  if (gameBtn.classList.contains("start-game")) {
    gameBoard.classList.remove("overlay");
    scoreDisplay.innerHTML = 0;
    startTimer();
    sendScoreElem(scoreDisplay);
    intervalId = setInterval(tryGettingMole, (1 / INTERVAL) * 1000);
    gameBtn.classList.remove("start-game");
    gameBtn.classList.add("reset-game");
    gameBtn.innerHTML = "Reset Game";
  } else {
    gameTimer.innerHTML = "00:00";
    resetGame();
    clearInterval(timerId);
  }
});
// handles the game timer
function startTimer() {
  let timer = { min: 0, sec: 59 };
  gameTimer.innerHTML = "0" + timer.min + ":" + "0" + timer.sec;
  timerId = setInterval(() => {
    if (timer.sec > 0) {
      --timer.sec;
      if (timer.sec < 10) {
        gameTimer.innerHTML = "0" + timer.min + ":" + "0" + timer.sec;
      } else {
        gameTimer.innerHTML = "0" + timer.min + ":" + timer.sec;
      }
    } else if (timer.min > 0) {
      --timer.min;
      timer.sec = 60;
    } else {
      resetGame();
    }
  }, 1000);
}
// resets the game
function resetGame() {
  gameBoard.classList.add("overlay");
  clearInterval(timerId);
  clearInterval(intervalId);
  resetMoles();
  gameBtn.classList.remove("reset-game");
  gameBtn.classList.add("start-game");
  gameBtn.innerHTML = "Start Game";
}

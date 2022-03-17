import { randomNumber, randomNumberBetween } from "./util.js";

const MIN_TIME_OUT = 0.5;
const MAX_TIME_OUT = 4;
const MIN_TIME_IN = 2;
const MAX_TIME_IN = 4;
const MAX_MOLE_OUT = 5;

let moleOutCount = 0;
let scoreDisplay;
let scoreValue = 20;
let moleArray = [];
initialize();
// create mole array as objects witch hold the mole element's and its timeId
function initialize() {
  let moles = document.getElementsByClassName("mole");
  Array.from(moles).forEach((mole) => {
    mole.addEventListener("click", moleClicked);
    moleArray.push({ elem: mole, timeOutId: 0 });
  });
}
// recives the score element to increse score count when clicking on moles
export function getScoreElem(scoreElem) {
  scoreDisplay = scoreElem;
}
// try getting a mole out, it gets called at game intervals
export function tryGettingMole() {
  let avalablePositions = []; // array of all the current avalable positions
  for (let i = 0; i < moleArray.length; ++i) {
    if (
      !moleArray[i].elem.classList.contains("mole-out") &&
      !moleArray[i].elem.classList.contains("mole-in")
    )
      avalablePositions.push(i);
  }
  if (avalablePositions.length !== 0 && moleOutCount < MAX_MOLE_OUT) {
    drawMole(avalablePositions[randomNumber(avalablePositions.length)]);
    ++moleOutCount;
  }
}
// stop moleArray timers and removes classes of mole-out/mole-in and cout of moles out
export function resetMoles() {
  moleArray.forEach((moleElem) => {
    if (moleElem.elem.classList.contains("mole-in")) {
      clearTimeout(moleElem.timeOutId);
      moleElem.elem.classList.remove("mole-in");
    } else if (moleElem.elem.classList.contains("mole-out")) {
      moleElem.elem.classList.remove("mole-out");
      clearTimeout(moleElem.timeOutId);
    }
  });
  moleOutCount = 0;
}
// get position of a free mole and sets its timer and class
function drawMole(pos) {
  moleArray[pos].elem.classList.add("mole-out");
  moleArray[pos].timeOutId = setTimeout(() => {
    moleArray[pos].elem.classList.remove("mole-out");
    moleArray[pos].elem.classList.add("mole-in");
    --moleOutCount;
    timeIn(pos);
  }, randomNumberBetween(MIN_TIME_OUT, MAX_TIME_OUT) * 1000);
}
// handle the mole clicks
function moleClicked() {
  let pos = Number(this.id);
  if (moleArray[pos].elem.classList.contains("mole-out")) {
    moleArray[pos].elem.classList.remove("mole-out");
    moleArray[pos].elem.classList.add("mole-in");
    clearTimeout(moleArray[pos].timeOutId);
    --moleOutCount;
    scoreDisplay.innerHTML = Number(scoreDisplay.innerHTML) + scoreValue;
    timeIn(pos);
  }
}
// set time in the hole after mole gets clicked or the timer for staing out is finnished
function timeIn(pos) {
  setTimeout(() => {
    moleArray[pos].elem.classList.remove("mole-in");
  }, randomNumberBetween(MIN_TIME_IN, MAX_TIME_IN) * 1000);
}

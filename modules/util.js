export function randomNumber(maxNum) {
  return Math.floor(Math.random() * (maxNum - 1));
}

export function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

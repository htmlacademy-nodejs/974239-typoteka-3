"use strict";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * i);
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }

  return arr;
};

const subtractMonth = (date, month) => {
  const incomingDate = new Date(date);
  return new Date(
      incomingDate.getFullYear(),
      incomingDate.getMonth() - (month - 1),
      incomingDate.getDate()
  ).valueOf();
};

const formatDate = (date) => new Date(date).toLocaleString(`ru-RU`, {
  year: `numeric`,
  month: `2-digit`,
  day: `2-digit`,
  hour: `2-digit`,
  minute: `2-digit`,
  second: `2-digit`,
});

module.exports = {
  getRandomInt,
  shuffle,
  subtractMonth,
  formatDate,
};

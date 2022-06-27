/*Функция, возвращающая случайное целое число из переданного диапазона включительно, включая граничные значения*/
const getRandomPositiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/*Функция для проверки максимальной длины строки*/
const getStringLength = (string, maxLength) => string.length <= maxLength;

getStringLength('string', 10);

// Функция для получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

const isEscapeKey = (evt) =>  evt.key === 'Escape';

const isArrayUnique = (elements) => {
  const result = [];
  elements.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });
  return result.length === elements.length;
};

export {getRandomArrayElement, getRandomPositiveInteger, createElement, isEscapeKey, isArrayUnique};

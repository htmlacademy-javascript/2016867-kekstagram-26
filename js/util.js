/*Функция, возвращающая случайное целое число из переданного диапазона включительно, включая граничные значения*/
const getRandomPositiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

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

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

const shuffle = (array) => {
  const shuffleArray = array.slice();
  let currentIndex = shuffleArray.length, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    //меняем местами элементы
    [shuffleArray[currentIndex], shuffleArray[randomIndex]] = [shuffleArray[randomIndex], shuffleArray[currentIndex]];
  }

  return shuffleArray;
};

export { getRandomArrayElement, getRandomPositiveInteger, isEscapeKey, isArrayUnique, debounce, shuffle };

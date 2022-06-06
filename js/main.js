/*Функция, возвращающая случайное целое число из переданного диапазона включительно, включая граничные значения*/
const getRandomNumber = (min, max) => {
  if (max>min && min>=0 && max>=0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (min>max) {
    return 'Вы указали неверно диапазон значений, первый аргумент должен быть меньше второго!';
  }
  if (min===max) {
    return min;
  }
  return 'В диапазоне нет подходящего числа, функция не может гарантировать верный результат';
};

getRandomNumber(1,5);

/*Функция для проверки максимальной длины строки*/
const getStringLength = (string, maxlength) => string.length <= maxlength;

getStringLength('string', 10);

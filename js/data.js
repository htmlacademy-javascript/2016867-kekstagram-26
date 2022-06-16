import {getRandomArrayElement, getRandomPositiveInteger} from './util.js';

const OBJECT_COUNT = 25;

const AvatarsCount = {
  min: 1,
  max: 6,
};

const MessageCount = {
  min: 1,
  max: 2,
};

const LikesCount = {
  min: 15,
  max: 200,
};

const CommentsCount = {
  min: 1,
  max: 5,
};

const NAMES = [
  'Иван',
  'Петр',
  'Катя',
  'Игорь',
  'Николай',
  'Тимофей',
  'Кристина',
  'Игнатий',
  'Виктор',
  'Михаил',
];

const DESCRIPTIONS = [
  'Томная (зачеркнуто) темная гавань',
  'Продам гараж. Дорого',
  'Никода такого не было и вот опять',
  'Бриз морской, а коктейль алкогольный',
  'В гостях хорошо, а дома теплые тапочки',
  'На дискотеке пятидесятых',
  'Сказочный закат',
  'Соскучились?',
  'Снова в дороге',
  'Это я на море была, сейчас уже дома',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let commentId = 0;
let photoId = 0;


// Функция для получения случайного комментария (1-2 возможных сообщения в одном комментарии)
const createCommentMessage = () => {
  const messageCount = getRandomPositiveInteger(MessageCount.min, MessageCount.max);
  const message = [];

  for (let i = 1; i <= messageCount; i++) {
    message.push(getRandomArrayElement(MESSAGES));
  }

  return [... new Set(message)].join(' ');
};

//Функция создания объекта с данными комментария
const createCommentObject = () => {
  commentId++;

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomPositiveInteger(AvatarsCount.min, AvatarsCount.max)}.svg`,
    messages: createCommentMessage(),
    name: getRandomArrayElement(NAMES),
  };
};

// Функция создания объектa с описанием фото
const createPhotoObject = () => {
  photoId++;

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(LikesCount.min, LikesCount.max),
    comments: Array.from({ length: getRandomPositiveInteger(CommentsCount.min, CommentsCount.max) }, createCommentObject),
  };
};

// Функция создания 25 объектов
const similarPhotos = () => Array.from({length: OBJECT_COUNT}, createPhotoObject);


export {similarPhotos};

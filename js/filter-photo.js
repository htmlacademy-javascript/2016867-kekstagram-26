import { getRandomPositiveInteger } from './util.js';

const COUNT_RANDOM_PHOTO = 10;

const formElement = document.querySelector('.img-filters__form');
const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

const sortPopularPhotos = (photos) => {
  const tempPhotos = photos.slice();
  tempPhotos.sort((elementA, elementB) => elementB.comments.length - elementA.comments.length );
  return tempPhotos;
};

const getRandomPhotos = (photos, count) => {
  const tempPhotos = photos.slice();
  const randomPhotos = [];

  while (randomPhotos.length < count) {
    const photo = tempPhotos[getRandomPositiveInteger(0,tempPhotos.length - 1)];
    randomPhotos.push(photo);
  }
  return randomPhotos;
};

const getFilteredPhotos = (photos) => {
  const activeFilterId = document.querySelector('.img-filters__button--active').id;
  if(activeFilterId === 'filter-random') {
    return getRandomPhotos(photos, COUNT_RANDOM_PHOTO);
  }
  if(activeFilterId === 'filter-discussed') {
    return sortPopularPhotos(photos);
  }
  return photos;
};

const drawFilteredPhotos = (callback) => {
  formElement.addEventListener('click', (evt) => {
    if(evt.target === filterDefaultElement ) {
      filterDefaultElement.classList.add('img-filters__button--active');
      filterRandomElement.classList.remove('img-filters__button--active');
      filterDiscussedElement.classList.remove('img-filters__button--active');
    } else if (evt.target === filterRandomElement) {
      filterRandomElement.classList.add('img-filters__button--active');
      filterDefaultElement.classList.remove('img-filters__button--active');
      filterDiscussedElement.classList.remove('img-filters__button--active');
    } else {
      filterDiscussedElement.classList.add('img-filters__button--active');
      filterRandomElement.classList.remove('img-filters__button--active');
      filterDefaultElement.classList.remove('img-filters__button--active');
    }

    callback();
  });
};


export { getFilteredPhotos, drawFilteredPhotos };

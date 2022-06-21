import {createSimilarPhotos} from './data.js';
const similarListElement = document.querySelector('.pictures');
const similarListTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarUserPhotos = createSimilarPhotos();
const similarUserFragment = document.createDocumentFragment();

const drawThumbnail = () =>{
  similarUserPhotos.forEach(({url, likes, comments})=> {
    const userElement = similarListTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').src = url;
    userElement.querySelector('.picture__likes').textContent = likes;
    userElement.querySelector('.picture__comments').textContent = comments.length;
    similarUserFragment.append(userElement);
  });

  similarListElement.append(similarUserFragment);
};

export {drawThumbnail};

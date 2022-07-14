import { showBigPicture } from  './full-photo.js';

const similarListElement = document.querySelector('.pictures');
const similarListTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFilter = document.querySelector('.img-filters');

const similarUserFragment = document.createDocumentFragment();

const clearPicturesList = () => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((element) => element.remove());
};

const drawThumbnails = (photos) =>{
  if (imgFilter.classList.contains('img-filters--inactive')) {
    imgFilter.classList.remove('img-filters--inactive');
  }
  photos.forEach((photo)=> {
    const userElement = similarListTemplate.cloneNode(true);
    userElement.querySelector('.picture__img').src = photo.url;
    userElement.querySelector('.picture__likes').textContent = photo.likes;
    userElement.querySelector('.picture__comments').textContent = photo.comments.length;
    similarUserFragment.append(userElement);

    userElement.addEventListener('click', () => {
      showBigPicture(photo);
    });
  });
  clearPicturesList();
  similarListElement.append(similarUserFragment);
};

export { drawThumbnails };

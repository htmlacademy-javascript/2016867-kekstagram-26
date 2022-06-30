import { createElement, isEscapeKey } from './util.js';

const WIDTH = 35;
const HEIGHT = 35;
const PART_OF_COMMENTS = 5;

const closeButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const pictureDescription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

const similarUserFragment = document.createDocumentFragment();

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeEventListener();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

function removeEventListener() {
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
}

const renderOneComment = (comment) => {
  const userComment = createElement('li', 'social__comment');
  const userCommentImage = createElement('img', 'social__picture');
  const userCommentText = createElement('p', 'social__text');
  userCommentImage.src = comment.avatar;
  userCommentImage.alt = comment.name;
  userCommentImage.style.width = WIDTH;
  userCommentImage.style.height = HEIGHT;
  userComment.append(userCommentImage);
  userCommentText.textContent = comment.messages;
  userComment.append(userCommentText);
  similarUserFragment.append(userComment);
};


const showBigPicture = (picture) => {


  bigPictureImage.src = picture.url;
  bigPictureImage.alt = picture.description;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;

  picture.comments.forEach((comment) => {
    renderOneComment(comment);
  });


  socialComments.innerHTML = '';
  socialComments.append(similarUserFragment);
  pictureDescription.textContent = picture.description;
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

export {showBigPicture};

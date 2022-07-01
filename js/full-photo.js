import { isEscapeKey } from './util.js';

const PART_OF_COMMENTS = 5;

const closeButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');

const bigPictureImage = document.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');

const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');

const pictureDescription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

const commentFragment = document.createDocumentFragment();

let displayedComments = 0;
let comments;
let commentsLength;

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

const renderComments = (array) => {
  array.forEach((item) => {
    const comment = commentItem.cloneNode(true);
    const commentImg = comment.querySelector('.social__picture');
    commentImg.src = item.avatar;
    commentImg.alt = item.name;
    comment.querySelector('.social__text').textContent = item.messages;
    commentFragment.appendChild(comment);
    commentsList.append(commentFragment);
  });
};

const updateCommentLoaderBtn = () => {
  if (displayedComments === comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
  socialCommentsLoader.classList.remove('hidden');
};

const showComments = (from, to) => {
  displayedComments = Math.min(to, comments.length);
  renderComments(comments.slice(from, displayedComments));
  socialCommentCount.textContent = `${displayedComments} из ${commentsLength}`;
  updateCommentLoaderBtn();
};

const onCommentLoaderBtnClick = (evt) => {
  evt.preventDefault();
  showComments(displayedComments, displayedComments + PART_OF_COMMENTS);
};

function removeEventListener() {
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  socialCommentsLoader.removeEventListener('click', onCommentLoaderBtnClick);
}

const addModalListeners = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  socialCommentsLoader.addEventListener('click', onCommentLoaderBtnClick);
};

const fillBigPicture = (picture) => {
  commentsList.innerHTML = '';
  bigPictureImage.src = picture.url;
  bigPictureImage.alt = picture.description;
  likesCount.textContent = picture.likes;
  pictureDescription.textContent = picture.description;
};

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  document.body.classList.add('modal-open');

  comments = picture.comments;
  commentsLength =  comments.length;

  fillBigPicture(picture);
  showComments(0, PART_OF_COMMENTS);
  addModalListeners();
};

export {showBigPicture};

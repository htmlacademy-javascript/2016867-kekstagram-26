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
const oneSocialComment = bigPicture.querySelector('.social__comment');
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
  let countClickLoadComments = 0;
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');

  bigPictureImage.src = picture.url;
  bigPictureImage.alt = picture.description;
  likesCount.textContent = picture.likes;

  commentsCount.textContent = picture.comments.length;
  const allCommentsCount = picture.comments.length;
  socialComments.textContent = '';

  const commentsPartsCount = Math.ceil(allCommentsCount / PART_OF_COMMENTS);
  /*почему при попытке записать тернарным оператором выпадает ошибка?
  PART_OF_COMMENTS >= allCommentsCount ? socialCommentsLoader.classList.add('hidden') : socialCommentsLoader.classList.remove('hidden'); */
  if (PART_OF_COMMENTS >= allCommentsCount) {
    socialCommentsLoader.classList.add('hidden');
  }
  else {
    socialCommentsLoader.classList.remove('hidden');
  }

  const addCommentsToList = () => {
    picture.comments.forEach((comment) => {
      renderOneComment(comment);
      // picture.comments.every(oneSocialComment.classList.add('hidden'));
    });
    /*Идея заключалась в том, чтобы сформировать список комментариев, повесить каждому класс hidden, а затем партиями удалять этот класс */

    const shownComments = (countClickLoadComments + 1) * PART_OF_COMMENTS <= allCommentsCount ? (countClickLoadComments + 1) * PART_OF_COMMENTS : allCommentsCount;
    socialCommentCount.textContent = `${shownComments} из ${allCommentsCount} комментариев`;
    /* for (let i = shownComments-5; i< shownComments; i++) {
      picture.comments.every(oneSocialComment.classList.remove('hidden'));
    }*/
  };

  addCommentsToList();

  socialComments.innerHTML = '';
  socialComments.append(similarUserFragment);
  pictureDescription.textContent = picture.description;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  /*почему так: по клику изменяются данные, поэтому вынести их куда-то не получилось, оставила внутри. Но в связи с этим при попытке удалить обработчик и сбросить данные
  при нажатии на крестик (чтобы он обнулял счетчик кликов) не получилось вынести в функцию удаления обработчиков  removeEventListener().
  JS CВОДИТ МЕНЯ С УМА!!!!!!!*/
  socialCommentsLoader.addEventListener('click', () => {
    countClickLoadComments++;
    if (countClickLoadComments === commentsPartsCount - 1) {
      socialCommentsLoader.classList.add('hidden');
      addCommentsToList();
    }
    else {
      addCommentsToList();
    }
  });
};

export {showBigPicture};

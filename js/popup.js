import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successTemplateElement = document.querySelector ('#success').content.querySelector('.success');

const errorPopupElement = errorTemplateElement.cloneNode(true);
const errorButtonElement = errorPopupElement.querySelector('.error__button');

const successPopupElement = successTemplateElement.cloneNode(true);
const successButtonElement = successPopupElement.querySelector('.success__button');

errorPopupElement.style.zIndex = '10';


function closePopup() {
  if (errorPopupElement) {
    errorPopupElement.remove();
  }
  if (successPopupElement) {
    successPopupElement.remove();
  }
  removeEventListeners();
}

const onEscapeButtonDown = (evt) => {
  if(isEscapeKey(evt)){
    closePopup();
  }
};

const onBackgroundClick = (evt) => {
  if (evt.target.closest('.error__inner')) {
    return;
  }
  if (evt.target.closest('.success__inner')) {
    return;
  }
  closePopup();
};

function addEventListeners() {
  document.addEventListener('keydown', onEscapeButtonDown);
  document.addEventListener('click', onBackgroundClick);
}

function removeEventListeners() {
  document.removeEventListener('click', onBackgroundClick);
  document.removeEventListener('keydown', onEscapeButtonDown);
}

const errorMessage = () => {
  const messageElement = document.createElement('div');
  messageElement.textContent = 'Произошёл сбой. Попробуйте позже.';
  messageElement.style.zIndex = '100';
  messageElement.style.position = 'absolute';
  messageElement.style.left = '0';
  messageElement.style.top = '0';
  messageElement.style.right = '0';
  messageElement.style.padding = '10px 3px';
  messageElement.style.fontSize = '30px';
  messageElement.style.textAlign = 'center';
  messageElement.style.backgroundColor = 'red';
  document.body.append(messageElement);
  setTimeout (() => {messageElement.remove();}, ALERT_SHOW_TIME);
};

const errorPopup = () => {
  document.body.append(errorPopupElement);

  errorButtonElement.addEventListener('click', () => {
    closePopup();
  });

  addEventListeners();
};

const successPopup = () => {
  document.body.append(successPopupElement);

  successButtonElement.addEventListener('click', () => {
    closePopup();
  });

  addEventListeners();
};
export {errorMessage, errorPopup, successPopup};

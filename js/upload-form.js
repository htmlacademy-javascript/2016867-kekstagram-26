import { isEscapeKey } from './util.js';
import { isUploadFormValid } from './validate-upload-form.js';
import { changeEffect } from './photo-effect.js';
import {sendData} from './api.js';
import {errorPopup, successPopup} from './popup.js';
import {onControlSmallerClick, onControlBiggerClick, resetScale } from './scale-image.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSelectImage = document.querySelector('#upload-select-image');
const form = document.querySelector('#upload-select-image');
const buttonUploadElement = document.querySelector('.img-upload__submit');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelFieldset = document.querySelector('.effect-level');

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectLevelFieldset.classList.add('hidden');
  addEventListeners();
};

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadSelectImage.reset();
  form.reset();
  resetScale();
  imagePreview.style.filter = null;
  removeEventListeners();
  if (document.querySelector('.pristine-error')) {
    document.querySelector('.pristine-error').innerHTML='';
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeModal();
  }
};

const onUploadCancelClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const onInputUploadFormChange = (evt) => {
  evt.preventDefault();
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    openModal();
  }
};

const onSuccess = () => {
  buttonUploadElement.disabled = false;
  closeModal();
  successPopup();
};

const onError = () => {
  buttonUploadElement.disabled = false;
  errorPopup();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (isUploadFormValid()) {
    buttonUploadElement.disabled = true;
    const formData = new FormData(evt.target);
    sendData(formData, onSuccess, onError);
  }
};

const onSliderChange = (evt) =>{
  evt.preventDefault();
  changeEffect(evt.target.value);
};

function addEventListeners() {
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click',  onUploadCancelClick);
  scaleControlSmaller.addEventListener('click', onControlSmallerClick);
  scaleControlBigger.addEventListener('click', onControlBiggerClick);
  effectsListElement.addEventListener('change', onSliderChange);
}

function removeEventListeners() {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  scaleControlSmaller.removeEventListener('click', onControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onControlBiggerClick);
  effectsListElement.removeEventListener('change', onSliderChange);
}

const initUploadFormAction = () => {
  uploadFile.addEventListener('change', onInputUploadFormChange);
  form.addEventListener('submit', onFormSubmit);
};

export {initUploadFormAction};

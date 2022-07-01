import { isEscapeKey, isArrayUnique } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSelectImage = document.querySelector('#upload-select-image');
const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('[name="hashtags"]');

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadSelectImage.reset();
  form.reset();
  removeEventListener();
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

function removeEventListener() {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
}

const onInputUploadFormChange = (evt) => {
  evt.preventDefault();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onDocumentKeydown);
  uploadCancel.addEventListener('click',  onUploadCancelClick);
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const serializeHashtag = (value) => value.trim().toLowerCase().split(' ');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).length <= 5, 'Допускается не более пяти хэш-тегов');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).every((item) => item.startsWith('#') || item.length===0), 'Хэш-тег должен начинаться с символа #');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).every((item) => item.length<=19 || item.length===0), 'Mаксимальная длина хэш-тега 20 символов (вместе с #)');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).every((item) =>/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item)|| item.length===0), 'Хэш-тег должен содержать буквы и числа');

pristine.addValidator(hashtagsInput, (value) => isArrayUnique(serializeHashtag(value)), 'Xэш-теги должны быть разными');

const isUploadFormValid = () => pristine.validate();

const onFormSubmit = (evt) => {
  if (!isUploadFormValid()) {
    evt.preventDefault();
  }
};

const initUploadFormAction = () => {
  uploadFile.addEventListener('change', onInputUploadFormChange);
  form.addEventListener('submit', onFormSubmit);
};

export {initUploadFormAction};

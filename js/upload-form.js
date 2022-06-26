import { isEscapeKey, isArrayUnique } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const uploadSelectImage = document.querySelector('#upload-select-image');
const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('[name="hashtags"]');

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadSelectImage.reset();
  removeEventListener();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
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
  body.classList.add('modal-open');
  document.addEventListener('keydown',onDocumentKeydown);
  uploadCancel.addEventListener('click',  onUploadCancelClick);
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagsInput, (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const isEveryHashtagValid = hashtags.every((item) => regularExpression.test(item));
  const isHashtagsUnique = isArrayUnique(hashtags);
  return isEveryHashtagValid && isHashtagsUnique && hashtags.length <= 5;
}, 'Поле заполнено неверно');

const isUploadFormValid = () => pristine.validate();

const onFormSubmit = (/*evt*/) => {
  // evt.preventDefault();
  isUploadFormValid();
};

uploadFile.addEventListener('change', onInputUploadFormChange);
form.addEventListener('submit', onFormSubmit);

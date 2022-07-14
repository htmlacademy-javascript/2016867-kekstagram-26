import { isArrayUnique } from './util.js';

const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('[name="hashtags"]');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const serializeHashtag = (value) => value.trim().toLowerCase().split(' ');

pristine.addValidator(
  hashtagsInput,
  (value) => serializeHashtag(value).length <= 5,
  'Допускается не более пяти хэш-тегов'
);

pristine.addValidator(
  hashtagsInput,
  (value) =>
    serializeHashtag(value).every(
      (item) => item.startsWith('#') || !item.length
    ),
  'Хэш-тег должен начинаться с символа #'
);

pristine.addValidator(
  hashtagsInput,
  (value) =>
    serializeHashtag(value).every((item) => item.length <= 19 || !item.length),
  'Mаксимальная длина хэш-тега 20 символов (вместе с #)'
);

pristine.addValidator(
  hashtagsInput,
  (value) =>
    serializeHashtag(value).every(
      (item) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item) || !item.length
    ),
  'Хэш-тег должен содержать буквы и числа'
);

pristine.addValidator(
  hashtagsInput,
  (value) => isArrayUnique(serializeHashtag(value)),
  'Xэш-теги должны быть разными'
);

const isUploadFormValid = () => pristine.validate();

export { isUploadFormValid };

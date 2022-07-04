import { isEscapeKey, isArrayUnique } from './util.js';

const BASE_SCALE = 1;
const BASE_PERCENT = 100;
const SCALE_STEP = 0.25;
const PERCENT_STEP = 25;
let percent = 100;
let scale = 1;

const RANGE_OPTIONS = {
  'grayscale': {
    min: 0,
    max: 1,
    step: 0.1
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1
  },
  'invert': {
    min: 0,
    max: 100,
    step: 1
  },
  'blur': {
    min: 0,
    max: 3,
    step: 0.1
  },
  'brightness': {
    min: 1,
    max: 3,
    step: 0.1
  },
};

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadSelectImage = document.querySelector('#upload-select-image');
const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('[name="hashtags"]');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPicture = document.querySelector('.img-upload__preview img');

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelFieldset = document.querySelector('.effect-level');
const effectValueElement = document.querySelector('.effect-level__value');

const FILTER_NAME = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness'
};

const UNIT = {
  'invert': '%',
  'blur': 'px',
};

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadSelectImage.reset();
  form.reset();
  scaleControlValue.value = `${BASE_PERCENT}%`;
  uploadPicture.style.transform = `scale(${BASE_SCALE})`;
  percent = BASE_PERCENT;
  scale = BASE_SCALE;
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
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addEventListeners();
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const serializeHashtag = (value) => value.trim().toLowerCase().split(' ');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).length <= 5, 'Допускается не более пяти хэш-тегов');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).every((item) => item.startsWith('#') || !item.length), 'Хэш-тег должен начинаться с символа #');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).every((item) => item.length<=19 || !item.length), 'Mаксимальная длина хэш-тега 20 символов (вместе с #)');

pristine.addValidator(hashtagsInput, (value) => serializeHashtag(value).every((item) =>/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(item)|| !item.length), 'Хэш-тег должен содержать буквы и числа');

pristine.addValidator(hashtagsInput, (value) => isArrayUnique(serializeHashtag(value)), 'Xэш-теги должны быть разными');

const isUploadFormValid = () => pristine.validate();

const onFormSubmit = (evt) => {
  if (!isUploadFormValid()) {
    evt.preventDefault();
  }
};

const onControlSmallerClick = (evt)  =>{
  evt.preventDefault();
  if (percent <= PERCENT_STEP) {
    return;
  }
  scaleControlValue.value = `${percent - PERCENT_STEP}%`;
  uploadPicture.style.transform = `scale(${scale - SCALE_STEP})`;
  percent = percent - PERCENT_STEP;
  scale = scale - SCALE_STEP;
};

const onControlBiggerClick = (evt)  =>{
  evt.preventDefault();
  if (percent >= BASE_PERCENT) {
    return;
  }
  scaleControlValue.value = `${percent + PERCENT_STEP}%`;
  uploadPicture.style.transform = `scale(${scale + SCALE_STEP})`;
  percent = percent + PERCENT_STEP;
  scale = scale + SCALE_STEP;
};

const createSlider = () => {
  noUiSlider.create(effectLevelFieldset, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const changeEffect = (effectValue) => {
  if(effectValue === 'none') {
    effectLevelFieldset.noUiSlider.destroy();
    imagePreview.style = '';
    imagePreview.className = '';
    return;
  }

  if (!effectLevelFieldset.noUiSlider) {
    createSlider();
  }

  const effect = FILTER_NAME[effectValue];
  const { min, max, step } = RANGE_OPTIONS[effect];
  const unit = UNIT[effect]?UNIT[effect]:'';

  imagePreview.className = '';
  imagePreview.classList.add(`effects__preview--${effectValue}`);

  effectLevelFieldset.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
    connect: 'lower',
  });

  effectLevelFieldset.noUiSlider.on('update', () => {
    effectValueElement.value = effectLevelFieldset.noUiSlider.get();
    imagePreview.style.filter =`${effect}(${effectValueElement.value}${unit})`;
  });
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

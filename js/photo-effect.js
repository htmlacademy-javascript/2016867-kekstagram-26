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

const effectLevelFieldset = document.querySelector('.effect-level');
const effectValueElement = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');

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
    effectLevelFieldset.classList.add('hidden');
    return;
  }

  if (!effectLevelFieldset.noUiSlider) {
    createSlider();
  }

  effectLevelFieldset.classList.remove('hidden');

  const effect = FILTER_NAME[effectValue];
  const { min, max, step } = RANGE_OPTIONS[effect];
  const unit = UNIT[effect]?UNIT[effect]:'';

  imagePreview.className = '';

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


export {changeEffect};

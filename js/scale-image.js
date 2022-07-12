const BASE_SCALE = 1;
const BASE_PERCENT = 100;
const SCALE_STEP = 0.25;
const PERCENT_STEP = 25;
let percent = 100;
let scale = 1;

const scaleControlValue = document.querySelector('.scale__control--value');

const imagePreview = document.querySelector('.img-upload__preview img');

const onControlSmallerClick = (evt)  =>{
  evt.preventDefault();
  if (percent <= PERCENT_STEP) {
    return;
  }
  scaleControlValue.value = `${percent - PERCENT_STEP}%`;
  imagePreview.style.transform = `scale(${scale - SCALE_STEP})`;
  percent = percent - PERCENT_STEP;
  scale = scale - SCALE_STEP;
};

const onControlBiggerClick = (evt)  =>{
  evt.preventDefault();
  if (percent >= BASE_PERCENT) {
    return;
  }
  scaleControlValue.value = `${percent + PERCENT_STEP}%`;
  imagePreview.style.transform = `scale(${scale + SCALE_STEP})`;
  percent = percent + PERCENT_STEP;
  scale = scale + SCALE_STEP;
};

const resetScale = () => {
  scaleControlValue.value = `${BASE_PERCENT}%`;
  imagePreview.style.transform = `scale(${BASE_SCALE})`;
  percent = BASE_PERCENT;
  scale = BASE_SCALE;
};

export {onControlSmallerClick, onControlBiggerClick,resetScale };

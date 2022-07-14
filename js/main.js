import { drawThumbnails } from  './draw-thumbnails.js';
import { initUploadFormAction } from './upload-form.js';
import { getData } from './api.js';
import { errorMessage } from './popup.js';
import { drawFilteredPhotos } from './filter-photo.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

initUploadFormAction();

getData((photos) => {
  drawThumbnails(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  drawFilteredPhotos(debounce(
    () => drawThumbnails(photos),
    RERENDER_DELAY,
  ));
}, errorMessage);

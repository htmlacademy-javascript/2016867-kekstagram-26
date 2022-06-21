import {createSimilarPhotos} from  './data.js';
import {drawThumbnail} from  './draw-thumbnail.js';
import {showBigPicture} from  './full-photo.js';
import {closeFullPhoto} from './close-full-photo.js';

const usersPictures = createSimilarPhotos();
drawThumbnail(usersPictures);
showBigPicture(usersPictures);
closeFullPhoto();

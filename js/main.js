import './render_big_pictures.js';
import { renderPictureElement } from './render_pictures.js';
import './form.js';
import './slider.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './utils.js';
import {initFilter } from './filters.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderPictureElement(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();

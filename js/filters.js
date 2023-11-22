import {renderPictureElement} from './render_pictures.js';
import { debounce } from './utils.js';

const filtersElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');

const MAX_RANDOM_FILTER = 10;

const Filters = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

//функция для получения случайного числа
const getRandomIndex = (min, max) => {
  return Math.floor(Math.random()*(max - min));
};

const FilterHandlers = {
  [Filters.DEFAULT]: (data) => {
    return data;
  },
  [Filters.RANDOM]: (data) => {
    const randomIndexList = [];//создаем массив для наполнения
    const max = Math.min(MAX_RANDOM_FILTER, data.length);//проверяем, что получаем достаточно элементов от сервера
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {//проверяем на дубли
        randomIndexList.push(index);//подставляем в массив
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [Filters.DISCUSSED]: (data) => {
    return [...data].sort((item1, item2) => {//проводим деструктцризацию и сортируем по убыванию
      return item2.comments.length - item1.comments.length;
    });
  },
};

const repaint = (event, filter, data) => {
  const filteredData = FilterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach(item => item.remove());
  renderPictureElement(filteredData);
  const currentActiveFilter = filterForm.querySelector('.img-filters__button--active');
  currentActiveFilter.classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (event) => {
    debouncedRepaint(event, Filters.DEFAULT, data);
  });
  randomButton.addEventListener('click', (event) => {
    debouncedRepaint(event, Filters.RANDOM, data);
  });
  discussedButton.addEventListener('click', (event) => {
    debouncedRepaint(event, Filters.DISCUSSED, data);
  });
};

export {initFilter};

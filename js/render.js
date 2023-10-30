import {createObject} from './data.js';

// Находим контейнер для изображений
const pictures = document.querySelector('.pictures');
// Находим фрагмент с содержимым темплейта
const picturesTemplate = document.querySelector('#picture').content;
// В темплейте находим нужный элемент
const template = picturesTemplate.querySelector('.picture');
// Создаем фрагмент
const fragment = document.createDocumentFragment();
// Создаем массив
const similarPictures = createObject(25);
// проходим по массиву
similarPictures.forEach(({url, description, likes, comments}) => {
  //клонируем темплейт
  const pictureElement = template.cloneNode(true);
  // вставляем данные в шаблон
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = likes;
  pictureElement.querySelector('.picture__likes').textContent = comments.length;
  // добавляем элемент в конец фрагмента
  fragment.appendChild(pictureElement);
});
pictures.appendChild(fragment);

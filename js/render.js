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
similarPictures.forEach((picture) => {
  //клонируем темплейт
  const pictureElement = template.cloneNode(true);
  // вставляем данные в шаблон
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__comments').textContent = picture.likes;
  pictureElement.querySelector('.picture__likes').textContent = picture.comments.length;
  // добавляем элемент в конец фрагмента
  fragment.appendChild(pictureElement);
});
pictures.appendChild(fragment);

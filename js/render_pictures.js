
import { showBigPicture } from './render_big_pictures.js';

// Находим контейнер для изображений
const container = document.querySelector('.pictures');
// Находим фрагмент с содержимым темплейта
const picturesTemplate = document.querySelector('#picture').content;
// В темплейте находим нужный элемент
const template = picturesTemplate.querySelector('.picture');
// создаем картинку
const createPictureElement = ({ url, description, likes, comments }) => {
  //клонируем темплейт
  const pictureElement = template.cloneNode(true);
  // вставляем данные в шаблон
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};
// отрисовываем картинку
const renderPictureElement = (pictures) => {
  // Создаем фрагмент
  const fragment = document.createDocumentFragment();
  //проходим по массиву
  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    //создаем замыкание
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();//
      showBigPicture(picture); // функция для отрисовки фото
    });
    // добавляем элемент в конец фрагмента
    fragment.appendChild(pictureElement);
  });
  container.appendChild(fragment);
};

export { renderPictureElement };

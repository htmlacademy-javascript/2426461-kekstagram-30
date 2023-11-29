import { showBigPicture } from './render-big-pictures.js';

// Находим контейнер для изображений
const container = document.querySelector('.pictures');
// Находим фрагмент с содержимым темплейта
const picturesTemplate = document.querySelector('#picture').content;
// В темплейте находим нужный элемент
const template = picturesTemplate.querySelector('.picture');
// создаем картинку
const createPicture = ({ url, description, likes, comments }) => {
  //клонируем темплейт
  const picture = template.cloneNode(true);
  // вставляем данные в шаблон
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};
// отрисовываем картинку
const renderPictures = (pictures) => {
  // Создаем фрагмент
  const fragment = document.createDocumentFragment();
  //проходим по массиву
  pictures.forEach((picture) => {
    const newPicture = createPicture(picture);
    //создаем замыкание
    newPicture.addEventListener('click', (evt) => {
      evt.preventDefault();//
      showBigPicture(picture); // функция для отрисовки фото
    });
    // добавляем элемент в конец фрагмента
    fragment.appendChild(newPicture);
  });
  container.appendChild(fragment);
};

export { renderPictures, container };

import { isEscapeKey } from './utils.js';
import { renderComments, initCommentsList } from './comment.js';

// находим overlay
const userModalElement = document.querySelector('.big-picture');
// находим элемент по которому открываем
const userModalOpenElement = document.querySelector('.pictures');
// находим элемент по которому закрываем
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');

// записываем функцию в обработчик
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

// Функция открытия полноэкранного изображения
function openUserModal () {
  userModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open'); //убираем скролл
  document.addEventListener('keydown', onDocumentKeydown);
}
;

// Функция закрытия полноэкранного изображения
function closeUserModal () {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', userModalCloseElement);
}
// открываем полноэкранное изображение
userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

// закрываем полноэкранное изображение
userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

function renderBigPicture(picture) {
  openUserModal();
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;
  renderComments(picture.comments);
  initCommentsList();
}

export {renderBigPicture};

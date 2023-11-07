import { isEscapeKey } from './utils.js';
const COMMENTS_COUNT_SHOWN = 5;

// находим overlay
const userModalElement = document.querySelector('.big-picture');
// находим элемент по которому открываем
const userModalOpenElement = document.querySelector('.pictures');
// находим элемент по которому закрываем
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');

const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments'); //находим список комментариев
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');//находим кол-во комментариев
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');//находим лоадер
const totalCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');

const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');//находим темплейт

let commentsCountShown = 0;
let comments = [];// массив для хранения всех комментов

//Функция для создания одного комментария
const createComment = ({avatar, message, name}) => {
  const newComment = commentElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

//Функция отрисовки комментов
const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT_SHOWN;//показываем по 5 комментариев
  if (commentsCountShown >= comments.length) {//убираем лоадер, когда загрузил все комменты
    commentsLoaderElement.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment(); //создаем фрагмент
  for (let i = 0; i < commentsCountShown; i++) {//отрисовываем комменты порционно
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentsListElement.innerHTML = ''; //очищаем список комментариев
  commentsListElement.append(fragment);
  commentCountElement.textContent = commentsCountShown;//обновляем значения
  totalCommentsCountElement.textContent = comments.length;
};
//записываем функцию в обработчки для отрисовки новых комментов
const onCommentsLoaderClick = () => renderComments();
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
// Функция закрытия полноэкранного изображения
function closeUserModal () {
  commentsCountShown = 0;//обнуляем счетчик комментариев
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', userModalCloseElement);
}

function renderBigPicture({url, likes, description}) {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
}

function showBigPicture(picture) {
  bigPictureElement.classList.remove('hidden');
  openUserModal ();
  document.addEventListener('keydown', onDocumentKeydown);
  comments = picture.comments;
  renderComments();
  renderBigPicture(picture);
}
// закрываем полноэкранное изображение
userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});
// открываем полноэкранное изображение
userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});
// событие на клик по кнопке
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
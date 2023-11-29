import { isEscapeKey } from './utils.js';

const COMMENTS_COUNT_SHOWN = 5;

// находим overlay
const userModal = document.querySelector('.big-picture');
const userModalClose = userModal.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments'); //находим список комментариев
const commentCount = bigPicture.querySelector('.social__comment-shown-count');//находим кол-во комментариев
const commentsLoader = bigPicture.querySelector('.comments-loader');//находим лоадер
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
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
    commentsLoader.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment(); //создаем фрагмент
  for (let i = 0; i < commentsCountShown; i++) {//отрисовываем комменты порционно
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentsList.innerHTML = ''; //очищаем список комментариев
  commentsList.append(fragment);
  commentCount.textContent = commentsCountShown;//обновляем значения
  totalCommentsCount.textContent = comments.length;
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
  userModal.classList.remove('hidden');
  document.body.classList.add('modal-open'); //убираем скролл
  document.addEventListener('keydown', onDocumentKeydown);
}
// Функция закрытия полноэкранного изображения
function closeUserModal () {
  commentsCountShown = 0;//обнуляем счетчик комментариев
  userModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', userModalClose);
}

function renderBigPicture({url, likes, description}) {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
}

function showBigPicture(picture) {
  bigPicture.classList.remove('hidden');
  openUserModal ();
  document.addEventListener('keydown', onDocumentKeydown);
  comments = picture.comments;
  renderComments();
  renderBigPicture(picture);
}
// закрываем полноэкранное изображение
userModalClose.addEventListener('click', closeUserModal);
// событие на клик по кнопке
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };

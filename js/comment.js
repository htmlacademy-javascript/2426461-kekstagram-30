const bigPictureElement = document.querySelector('.big-picture');
const commentsListElement = bigPictureElement.querySelector('.social__comments'); //находим список комментариев
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');//находим кол-во комментариев
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');//находим лоадер

const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');//находим темплейт

//Функция для создания одного комментария
const createComment = ({avatar, message, name}) => {
  const newComment = commentElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

//Функция отрисовки комментов (принимает массив комментариев)
const renderComments = (comments) => {
  commentsListElement.innerHTML = ''; //очищаем список комментариев
  const fragment = document.createDocumentFragment(); //создаем фрагмент
  comments.forEach((item) => { //item - очередной элемент массива с комментариями
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentsListElement.append(fragment);
};

//Скрываем лоадер
const initCommentsList = () => {
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

export { renderComments, initCommentsList };

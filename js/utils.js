const REMOVE_MESSAGE_TIMEOUT = 5000;//5 сек
const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

function showErrorMessage() {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}
//Функция событие по клику на Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {showErrorMessage, isEscapeKey};

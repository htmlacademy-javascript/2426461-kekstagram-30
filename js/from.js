import { isEscapeKey } from './utils.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
/*регулярное выражение:
  начинаеется с #,
  содержит буквы и цифры,
  имеет длинну 19 символов,
  не зависит от регистра */
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error'
});

const convertTags = function (tagString) {
  return tagString.trim() //удаляем проблемы с начала и с конца
    .split(' ') //создаем массив с разделителем по пробелу
    .filter((tag) => Boolean(tag.length)); //создаем новый массив без лишних пробелов
};
//хэштег соответствует регулярному выражению
const isTagValid = function (value) {
  return convertTags(value).every((tag) => VALID_SYMBOLS.test(tag));
};
//кол-во хэштегов не больше 5
const isCountValid = function (value) {
  return convertTags(value).length <= MAX_HASHTAG_COUNT;
};
// хэштег уникален
const isTagUnique = function (value) {
  const lowerCaseTags = convertTags(value).map((tag) => tag.toLowerCase());//приводим все к нижнему регистру
  return lowerCaseTags.length === new Set (lowerCaseTags).size;//сравниваем длинну массива с размером Set
};

pristine.addValidator (
  hashtagField,//The dom element where validator is applied to
  isTagValid,//The function that validates the field
  errorText.INVALID_PATTERN,//The message to show when the validation fails.
  1,//Priority of the validator function
  true//halt
);

pristine.addValidator (
  hashtagField,
  isTagUnique,
  errorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator (
  hashtagField,
  isCountValid,
  errorText.INVALID_COUNT,
  3,
  true
);
//фокус не на поле ввода
const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeImgModal();
  }
};

const onFileInputChange = () => {
  openImgModal();
};

const onCancelButtonClick = () => {
  closeImgModal ();
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    imgUploadForm.submit();
  }
});

function openImgModal () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open'); //убираем скролл
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImgModal () {
  imgUploadForm.reset();//сбрасываем все значения формы
  pristine.reset();//удаляем слушатели Пристин
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', imgUploadCancel);
}

imgUploadCancel.addEventListener('click', () => {
  onCancelButtonClick();
});
//
imgUploadInput.addEventListener('change', () => {
  onFileInputChange();
});

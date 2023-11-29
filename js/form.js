const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jped', 'png'];
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
const submitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

import { initEffect, resetEffect } from './slider.js';
import { resetScale } from './scale.js';
import { sendPictures } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const photoPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

function toggleSubmitButton (isDisabled) {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = submitButtonCaption.SUBMITTING;
  } else {
    submitButtonCaption.textContent = submitButtonCaption.IDLE;
  }
}

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

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();//приводим к нижнему регистру
  return FILE_TYPES.some((item) => fileName.endsWith(item));//проверяем что присланный файл заканчивается на нужные символы
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

function isErrorMessageExists() {
  return Boolean(document.querySelector('.error'));
}

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    closeImgModal();
  }
};

const onFileInputChange = () => {
  const file = imgUploadInput.files[0];
  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  openImgModal();
};

const onCancelButtonClick = () => {
  closeImgModal ();
};

async function sendForm(formElement) {
  if (! pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    closeImgModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

function openImgModal () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open'); //убираем скролл
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImgModal () {
  imgUploadForm.reset();//сбрасываем все значения формы
  pristine.reset();//удаляем слушатели Пристин
  resetEffect(); //
  resetScale(); //обнуляем Scale
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', imgUploadCancel);
}

imgUploadCancel.addEventListener('click', onCancelButtonClick);
imgUploadInput.addEventListener('change', onFileInputChange);
imgUploadForm.addEventListener('submit', onFormSubmit);
initEffect();

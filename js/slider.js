const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelValue = modalElement.querySelector('.effect-level__value');
//записываем в начальное значение - значение по умолчанию
let chosenEffect = Effect.DEFAULT;
//функция которая позволяет определить эффект по умолчанию
const isDefault = () => chosenEffect === Effect.DEFAULT;
//подставляем стиль в наш элемент
const setImageStyle = function () {
  if (isDefault()) {
    imageElement.style.filter = null;
    return;
  }
  const { value } = effectLevelValue;//записываем значение по умолчанию
  const { style, unit } = effectToFilter[chosenEffect];//берем значение из объекта
  imageElement.style.filter = `${style}(${value}${unit})`;//получаем например blur(3px)
};

const showSlider = function () {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = function () {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = function () {
  effectLevelValue.value = sliderElement.noUiSlider.get();//получаем значение из слайдера
  setImageStyle();
};
//создаем slider
const createSlider = function ({min, max, step}) {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),//преобразовываем значение из строки в число
      from: (value) => Number(value),
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};
//обновляем значения слайдера при переключении
const updateSlider = function ({min, max, step}) {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = function () {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

// устаниваливаем эффект
const setEffect = function (effect) {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};
// сбрасываем эффект на значение по умолчанию
const resetEffect = function () {
  setEffect(Effect.DEFAULT);
};

const onEffectChange = function (evt) {
  setEffect(evt.target.value);
};
//инициализируем код
const initEffect = function () {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectChange);
};

export { initEffect, resetEffect };

const styleOfEffect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectToFilter = {
  [styleOfEffect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [styleOfEffect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [styleOfEffect.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [styleOfEffect.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [styleOfEffect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [styleOfEffect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [styleOfEffect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [styleOfEffect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [styleOfEffect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [styleOfEffect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [styleOfEffect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modal = document.querySelector('.img-upload');
const image = modal.querySelector('.img-upload__preview img');
const effects = modal.querySelector('.effects');
const slider = modal.querySelector('.effect-level__slider');
const sliderContainer = modal.querySelector('.img-upload__effect-level');
const effectLevelValue = modal.querySelector('.effect-level__value');
//записываем в начальное значение - значение по умолчанию
let chosenEffect = styleOfEffect.DEFAULT;
//функция которая позволяет определить эффект по умолчанию
const isDefault = () => chosenEffect === styleOfEffect.DEFAULT;
//подставляем стиль в наш элемент
const setImageStyle = function () {
  if (isDefault()) {
    image.style.filter = null;
    return;
  }
  const { value } = effectLevelValue;//записываем значение по умолчанию
  const { style, unit } = effectToFilter[chosenEffect];//берем значение из объекта
  image.style.filter = `${style}(${value}${unit})`;//получаем например blur(3px)
};

const showSlider = function () {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = function () {
  sliderContainer.classList.add('hidden');
};

const onSliderUpdate = function () {
  effectLevelValue.value = slider.noUiSlider.get();//получаем значение из слайдера
  setImageStyle();
};
//создаем slider
const createSlider = function ({min, max, step}) {
  noUiSlider.create(slider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),//преобразовываем значение из строки в число
      from: (value) => Number(value),
    }
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};
//обновляем значения слайдера при переключении
const updateSlider = function ({min, max, step}) {
  slider.noUiSlider.updateOptions({
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
  setEffect(styleOfEffect.DEFAULT);
};

const onEffectChange = function (evt) {
  setEffect(evt.target.value);
};
//инициализируем код
const initEffect = function () {
  createSlider(effectToSliderOptions[chosenEffect]);
  effects.addEventListener('change', onEffectChange);
};

export { initEffect, resetEffect };

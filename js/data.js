import {getRandomInteger, getRandomArrayElement} from './utils.js';

const DESCRIPTIONS = [
  'Фото',
  'Мое фото',
  'Описание фото'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Евгений',
  'Иван',
  'Михаил',
  'Андрей',
  'Никита'
];

//Функция генератор id
function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateId = createIdGenerator();

//Функци создания комментов
function createComments () {
  const comment = [];
  for (let i = 0; i < getRandomInteger(1, 30); i++) {
    comment.push({
      id: generateId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    });
  }
  return comment;
}

function createObject (quantity) {
  const photos = [];

  for (let i = 0; i < quantity; i++) {
    photos.push({
      id: generateId(),
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: createComments ()
    });
  }
  return photos;
};

export {createObject};

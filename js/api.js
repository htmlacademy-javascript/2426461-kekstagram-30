const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные',
  [HttpMethod.POST]: 'Не удалось отправить данные',
};

async function request (url, method = HttpMethod.GET, body = null) {
  const response = await fetch (url, {method, body});
  if (! response.ok) {
    throw new Error(ErrorText[method]);//бросаем ошибку
  }
  return response.json();//преобразовываем данные из строки в объект
}

async function loadPictures() {
  return request(SERVER_URL + ServerRoute.GET_DATA);
}

async function sendPictures(pictureData) {
  return request(
    SERVER_URL + ServerRoute.SEND_DATA,
    HttpMethod.POST,
    pictureData,
  );
}
export { loadPictures, sendPictures };

const GET_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((thumbnails) => {
      onSuccess(thumbnails);
    })
    .catch(onError);
};

const sendData = (formData, onSuccess, onError) => {
  fetch(SEND_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(onError);
};

export { getData, sendData };

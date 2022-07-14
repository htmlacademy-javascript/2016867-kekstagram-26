const API_URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((thumbnails) => {
      onSuccess(thumbnails);
    })
    .catch(onError);
};

const sendData = (formData, onSuccess, onError) => {
  fetch(`${API_URL}`, {
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

const getData = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((thumbnails) => {
      onSuccess(thumbnails);
    })
    .catch(onError);
};

const sendData = (formData, onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram', {
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

export {getData, sendData};

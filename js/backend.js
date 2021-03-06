'use strict';
(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var loadData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };
  var saveData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        return;
      }
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };
  window.backend = {
    loadData: loadData,
    saveData: saveData
  };
})();

'use strict';
(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  window.backend = {
    loadData: function (onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL_LOAD);

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };
})();

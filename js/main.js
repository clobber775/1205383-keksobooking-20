'use strict';
(function () {
  var newArrey = window.createArray([]);

  var mapElement = document.querySelector('.map');

  var mainPinElement = document.querySelector('.map__pin--main');

  var formElement = document.querySelector('.ad-form');
  var fieldsetElements = formElement.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsetElements.length; i++) {
    fieldsetElements[i].disabled = true;
  }

  var mainPinHandler = function (evt) {
    if (evt.button === 0) {
      window.activateSite();
      window.fillAddress(newArrey);
      mainPinElement.removeEventListener('mouseup', mainPinHandler);
    }
  };


  mainPinElement.addEventListener('mouseup', mainPinHandler);

  var mainPinButtonHandler = function (evt) {
    if (evt.key === 'Enter') {
      window.activateSite();
      mainPinElement.removeEventListener('keydown', mainPinHandler);
    }
  };


  mainPinElement.addEventListener('keydown', mainPinButtonHandler);

  window.mapElement = mapElement;
  window.newArrey = newArrey;
  window.fieldsetElements = fieldsetElements;
  window.mainPinElement = mainPinElement;
})();

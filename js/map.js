'use strict';
(function () {
  var MAX_ELEMENTS = 5;
  var mapElement = document.querySelector('.map');
  var activateSite = function () {
    window.form.fieldsetElements.forEach(function (it) {
      it.removeAttribute('disabled');
      window.map.mapElement.classList.remove('map--faded');
    });
    window.backend.loadData(window.map.loadPins);
    window.filter.filterFields.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };
  var loadPins = function (data) {
    window.pinsArray = data;
    window.pin.renderPins(data);
  };
  var deactivateSite = function () {
    window.form.formElement.classList.add('ad-form--disabled');
    window.map.mapElement.classList.add('map--faded');
    window.form.fieldsetElements.forEach(function (it) {
      it.setAttribute('disabled', true);
    });
    window.filter.filterFields.forEach(function (it) {
      it.setAttribute('disabled', true);
    });
  };
  var closeCard = function () {
    var isCardOpened = document.querySelector('.map__card');
    if (isCardOpened) {
      isCardOpened.parentNode.removeChild(isCardOpened);
    }
  };
  var deletePins = function () {
    var allpinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allpinElements.forEach(function (it) {
      it.parentNode.removeChild(it);
    });
  };
  window.map = {
    activateSite: activateSite,
    loadPins: loadPins,
    deactivateSite: deactivateSite,
    closeCard: closeCard,
    deletePins: deletePins,
    mapElement: mapElement,
    MAX_ELEMENTS: MAX_ELEMENTS
  };
})();

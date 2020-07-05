'use strict';
(function () {
  var MAX_ELEMENTS = 5;
  var mapElement = document.querySelector('.map');
  window.map = {
    activateSite: function () {
      window.form.fieldsetElements.forEach(function (it) {
        it.removeAttribute('disabled');
        window.map.mapElement.classList.remove('map--faded');
      });
      window.backend.loadData(window.map.loadPins);
      window.filter.filterFields.forEach(function (it) {
        it.removeAttribute('disabled');
      });
    },
    loadPins: function (data) {
      window.pinsArray = data;
      window.pin.renderPins(data);
    },

    deactivateSite: function () {
      window.form.formElement.classList.add('ad-form--disabled');
      window.form.fieldsetElements.forEach(function (it) {
        it.setAttribute('disabled', true);
        window.map.mapElement.classList.add('map--faded');
      });
      window.filter.filterFields.forEach(function (it) {
        it.setAttribute('disabled', true);
      });
    },
    closeCard: function () {
      var isCardOpened = document.querySelector('.map__card');
      if (isCardOpened) {
        isCardOpened.parentNode.removeChild(isCardOpened);
      }
    },
    deletePins: function () {
      var allpinElements = document.querySelectorAll('.map__pin');
      for (var i = 1; i < allpinElements.length; i++) {
        allpinElements[i].parentNode.removeChild(allpinElements[i]);
      }
    },
    mapElement: mapElement,
    MAX_ELEMENTS: MAX_ELEMENTS
  };
})();

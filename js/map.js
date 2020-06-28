'use strict';
(function () {
  var MAX_ELEMENTS = 5;
  var mapElement = document.querySelector('.map');
  window.map = {
    activateSite: function () {
      for (var j = 0; j < window.form.fieldsetElements.length; j++) {
        window.form.fieldsetElements[j].removeAttribute('disabled');
        window.map.mapElement.classList.remove('map--faded');
      }
      window.backend.loadData(window.map.loadPins);
      for (var h = 0; h < window.filter.filterFields.length; h++) {
        window.filter.filterFields[h].removeAttribute('disabled');
      }
    },
    loadPins: function (data) {
      window.pinsArray = data;
      window.pin.renderPins(data);
    },

    deactivateSite: function () {
      window.form.formElement.classList.add('ad-form--disabled');
      for (var j = 0; j < window.form.fieldsetElements.length; j++) {
        window.form.fieldsetElements[j].setAttribute('disabled', true);
        window.map.mapElement.classList.add('map--faded');
      }
      for (var k = 0; k < window.filter.filterFields.length; k++) {
        window.filter.filterFields[k].setAttribute('disabled', true);
      }
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

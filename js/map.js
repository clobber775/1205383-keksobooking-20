'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  window.map = {
    mapElement: mapElement,
    activateSite: function () {
      for (var j = 0; j < window.form.fieldsetElements.length; j++) {
        window.form.fieldsetElements[j].removeAttribute('disabled');
        window.map.mapElement.classList.remove('map--faded');
      }
      window.backend.loadData(window.map.renderPins);
    },
    renderPins: function (data) {
      data.forEach(function (it) {
        window.renderPin(it);
      });
    },
    deactivateSite: function () {
      window.form.formElement.classList.add('ad-form--disabled');
      var allpinElements = document.querySelectorAll('.map__pin');
      for (var j = 0; j < window.form.fieldsetElements.length; j++) {
        window.form.fieldsetElements[j].setAttribute('disabled', true);
        window.map.mapElement.classList.add('map--faded');
      }
      for (var i = 1; i < allpinElements.length; i++) {
        allpinElements[i].parentNode.removeChild(allpinElements[i]);
      }
      var isCardOpened = document.querySelector('.map__card');
      if (isCardOpened) {
        isCardOpened.parentNode.removeChild(isCardOpened);
      }
    }
  };
})();

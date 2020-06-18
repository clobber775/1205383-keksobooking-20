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
    }
  };
})();

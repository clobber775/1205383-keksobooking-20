'use strict';
(function () {
  window.renderPins = function (data) {
    data.forEach(function (it) {
      window.renderPin(it);
    });
  };

  window.activateSite = function () {
    for (var j = 0; j < window.fieldsetElements.length; j++) {
      window.fieldsetElements[j].removeAttribute('disabled');
      window.mapElement.classList.remove('map--faded');
    }
    window.renderPins(window.newArrey);
  };
})();

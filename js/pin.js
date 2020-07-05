'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  window.pin = {
    renderPin: function (obj) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = obj.author.avatar;
      pinElement.querySelector('img').alt = obj.offer.title;
      pinElement.style = 'left:' + (obj.location.x - PIN_WIDTH / 2) + 'px; top:' + (obj.location.y - PIN_HEIGHT) + 'px;';
      var activatePin = function () {
        var allPinElement = document.querySelectorAll('.map__pin');
        allPinElement.forEach(function (it) {
          it.classList.remove('.map__pin--active');
        });
        window.renderCard(obj);
        pinElement.classList.add('.map__pin--active');
      };
      var pinClickHandler = function () {
        activatePin();
      };
      var pinButtonHandler = function (evt) {
        if (evt.key === 'enter') {
          evt.preventDefault();
          activatePin();
        }
      };
      pinElement.addEventListener('click', pinClickHandler);
      pinElement.addEventListener('keydown', pinButtonHandler);
      pinContainer.appendChild(pinElement);
    },
    renderPins: function (data) {
      data.slice(0, window.map.MAX_ELEMENTS).forEach(function (it) {
        window.pin.renderPin(it);
      });
    }
  };
})();

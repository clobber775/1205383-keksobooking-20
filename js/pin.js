'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var pinContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.renderPin = function (obj) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = obj.author.avatar;
    pinElement.querySelector('img').alt = obj.offer.title;
    pinElement.style = 'left:' + (obj.location.x - PIN_WIDTH / 2) + 'px; top:' + (obj.location.y - PIN_HEIGHT) + 'px;';

    pinElement.addEventListener('click', function () {
      window.renderCard(obj);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.renderCard(obj);
      }
    });
    pinContainer.appendChild(pinElement);
  };
})();

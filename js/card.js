'use strict';
(function () {
  var HOUSE_VARIANTS = {
    FLAT: {
      type: 'Квартира',
      price: '1000'
    },
    BUNGALO: {
      type: 'Бунгало',
      price: '0'
    },
    HOUSE: {
      type: 'Дом',
      price: '5000'
    },
    PALACE: {
      type: 'Дворец',
      price: '10000'
    }
  };
  window.renderCard = function (obj) {
    var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
    var isCardOpened = document.querySelector('.map__card');

    var cardElement = isCardOpened ? document.querySelector('.map__card') : cardTemplate.cloneNode(true);


    if (!isCardOpened) {
      window.map.mapElement.appendChild(cardElement);
    }
    var photoElement = document.querySelector('.popup__photos');
    var photoArray = obj.offer.photos;
    var photoTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup__photo');

    photoElement.innerHTML = '';

    var fragmentPhoto = document.createDocumentFragment();

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HOUSE_VARIANTS[(obj.offer.type).toUpperCase()].type;
    cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = obj.offer.description;
    cardElement.querySelector('.popup__features').textContent = obj.offer.features;
    cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
    photoArray.forEach(function (it) {
      var newPhotoElement = photoTemplate.cloneNode(true);
      newPhotoElement.src = it;
      fragmentPhoto.appendChild(newPhotoElement);
    });
    photoElement.appendChild(fragmentPhoto);

    var smallPinCloseElement = cardElement.querySelector('.popup__close');
    var closeOfferCard = function () {
      var mapCardElement = document.querySelector('.map__card');
      if (mapCardElement) {
        mapCardElement.parentNode.removeChild(mapCardElement);
      }
    };
    var pinClickHandler = function () {
      closeOfferCard();
      smallPinCloseElement.removeEventListener('click', pinClickHandler);
    };
    var pinButtonHandler = function (evt) {
      if (evt.key === 'Escape') {
        closeOfferCard();
        document.removeEventListener('keydown', pinButtonHandler);
      }
    };
    smallPinCloseElement.addEventListener('click', pinClickHandler);
    document.addEventListener('keydown', pinButtonHandler);
  };
  window.card = {
    HOUSE_VARIANTS: HOUSE_VARIANTS
  };
})();

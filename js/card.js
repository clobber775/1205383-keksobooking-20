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
  var featuresTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup__features li');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var isCardOpened = document.querySelector('.map__card');
  var cardElement = isCardOpened ? isCardOpened : cardTemplate.cloneNode(true);
  window.renderCard = function (obj) {
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

    var featuresElement = document.querySelector('.popup__features');
    var featuresArray = obj.offer.features;


    featuresElement.innerHTML = '';

    var fragmentFeatures = document.createDocumentFragment();

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HOUSE_VARIANTS[(obj.offer.type).toUpperCase()].type;
    cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = obj.offer.description;
    cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
    photoArray.forEach(function (it) {
      var newPhotoElement = photoTemplate.cloneNode(true);
      newPhotoElement.src = it;
      fragmentPhoto.appendChild(newPhotoElement);
    });
    photoElement.appendChild(fragmentPhoto);

    featuresArray.forEach(function (it) {
      var newFeaturesElement = featuresTemplate.cloneNode(true);
      newFeaturesElement.classList.add('popup__feature--' + it);
      fragmentFeatures.appendChild(newFeaturesElement);
    });
    featuresElement.appendChild(fragmentFeatures);
    var mapCardElement = document.querySelector('.map__card');
    var smallPinCloseElement = cardElement.querySelector('.popup__close');
    var closeOfferCard = function () {
      if (mapCardElement) {
        mapCardElement.remove();
      }
    };
    var pinClickHandler = function () {
      closeOfferCard();
      smallPinCloseElement.removeEventListener('click', pinClickHandler);
    };
    var pinEscapeButtonHandler = function (evt) {
      if (evt.key === window.main.KEYCODES['escape']) {
        closeOfferCard();
        document.removeEventListener('keydown', pinEscapeButtonHandler);
      }
    };
    smallPinCloseElement.addEventListener('click', pinClickHandler);
    document.addEventListener('keydown', pinEscapeButtonHandler);
  };
  window.card = {
    HOUSE_VARIANTS: HOUSE_VARIANTS
  };
})();

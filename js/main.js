'use strict';

var FIRST_OBJECT = 0;
var NUMBER_OF_OBJECTS = 8;
var TYPES = ['place', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var FEAUTERS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FIRST_AVATAR = 1;
var LAST_AVATAR = 8;
var PIN_POS_Y_START = 130;
var PIN_POS_Y_END = 630;
var PIN_POS_X_START = 0;
var MAIN_PIN_WIDTH = 40;
var MAIN_PIN_HEIGHT = 44;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var HOUSE_VARIANTS = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  place: 'Дворец'
};
var GUESTS = {
  'for 1 guest': '1',
  'for 2 guests': '2',
  'for 3 guests': '3',
  'not for guests': '0'
};
var ROOMS = {
  '1 room': '1',
  '2 rooms': '2',
  '3 rooms': '3',
  '100 rooms': '100'
};


var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

var getRandomArrayLength = function (array) {
  shuffleArray(array);
  return array.slice([getRandomNumberInRange(FIRST_OBJECT, array.length + 1)]);
};

var width = document.querySelector('.map').offsetWidth;

var createArray = function (array) {
  for (var i = FIRST_OBJECT; i < NUMBER_OF_OBJECTS; i++) {
    var point = {
      x: getRandomNumberInRange(PIN_POS_X_START, width),
      y: getRandomNumberInRange(PIN_POS_Y_START, PIN_POS_Y_END),
    };
    array[i] =
      {
        author: {
          avatar: 'img/avatars/user0' + getRandomNumberInRange(FIRST_AVATAR, LAST_AVATAR) + '.png'
        },
        location: {
          x: point.x,
          y: point.y,
        },
        offer: {
          title: 'Объявление',
          address: point.x + ',' + point.y,
          price: 100,
          type: TYPES[getRandomNumberInRange(FIRST_OBJECT, TYPES.length - 1)],
          rooms: 3,
          guests: 456,
          checkin: CHECKINS[[getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
          checkout: CHECKINS[[getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
          features: getRandomArrayLength(FEAUTERS),
          description: 'описание',
          photos: getRandomArrayLength(PHOTOS),
        }
      };
  }
  return array;
};

var newArrey = createArray([]);

var mapElement = document.querySelector('.map');

var pinContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (obj) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = obj.author.avatar;
  pinElement.querySelector('img').alt = obj.offer.title;
  pinElement.style = 'left:' + (obj.location.x - PIN_WIDTH / 2) + 'px; top:' + (obj.location.y - PIN_HEIGHT) + 'px;';

  pinElement.addEventListener('click', function () {
    renderCard(obj);
  });
  pinElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      renderCard(obj);
    }
  });
  pinContainer.appendChild(pinElement);
};

var renderCard = function (obj) {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var isCardOpened = document.querySelector('.map__card');

  var cardElement = isCardOpened ? document.querySelector('.map__card') : cardTemplate.cloneNode(true);


  if (!isCardOpened) {
    mapElement.appendChild(cardElement);
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
  cardElement.querySelector('.popup__type').textContent = HOUSE_VARIANTS[obj.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = obj.offer.description;
  cardElement.querySelector('.popup__features').textContent = obj.offer.features;
  cardElement.querySelector('.popup__avatar').src = obj.author.avatar;
  for (var k = FIRST_OBJECT; k < photoArray.length; k++) {
    var newPhotoElement = photoTemplate.cloneNode(true);
    newPhotoElement.src = photoArray[k];
    fragmentPhoto.appendChild(newPhotoElement);
  }
  photoElement.appendChild(fragmentPhoto);

  var smallPinCloseElement = cardElement.querySelector('.popup__close');
  smallPinCloseElement.addEventListener('click', function () {
    var mapCardElement = document.querySelector('.map__card');
    mapCardElement.parentNode.removeChild(mapCardElement);
  });
  mapElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      var mapCardElement = document.querySelector('.map__card');
      mapCardElement.parentNode.removeChild(mapCardElement);
    }
  });
};

var formElement = document.querySelector('.ad-form');
var fieldsetElements = formElement.querySelectorAll('fieldset');

for (var i = 0; i < fieldsetElements.length; i++) {
  fieldsetElements[i].disabled = true;
}

var addressFieldElement = document.querySelector('#address');

var mainPinElement = document.querySelector('.map__pin--main');

var renderPins = function (data) {
  data.forEach(function (it) {
    renderPin(it);
  });
};

var activateSite = function () {
  for (var j = 0; j < fieldsetElements.length; j++) {
    fieldsetElements[j].removeAttribute('disabled');
    mapElement.classList.remove('map--faded');
  }
  renderPins(newArrey);
};

var fillAddress = function () {
  addressFieldElement.value = (mainPinElement.getBoundingClientRect().x + MAIN_PIN_WIDTH / 2) + ',' + (mainPinElement.getBoundingClientRect().y + MAIN_PIN_HEIGHT);
};

fillAddress();

var mainPinHandler = function (evt) {
  if (evt.button === 0) {
    activateSite();
    fillAddress(newArrey);
    mainPinElement.removeEventListener('mouseup', mainPinHandler);
  }
};


mainPinElement.addEventListener('mouseup', mainPinHandler);

var mainPinButtonHandler = function (evt) {
  if (evt.key === 'Enter') {
    activateSite();
    mainPinElement.removeEventListener('keydown', mainPinHandler);
  }
};


mainPinElement.addEventListener('keydown', mainPinButtonHandler);

var roomsSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

var validateRoomsGuests = function () {
  roomsSelect.setCustomValidity('');
  if (roomsSelect.value === ROOMS['1 room']) {
    if (capacitySelect.value === GUESTS['for 2 guests'] || capacitySelect.value === GUESTS['for 3 guests'] || capacitySelect.value === GUESTS['not for guests']) {
      roomsSelect.setCustomValidity('Ошибка! 1 комната для 1 гостя');
    }
  }
  if (roomsSelect.value === ROOMS['2 rooms']) {
    if (capacitySelect.value === GUESTS['for 3 guests'] || capacitySelect.value === GUESTS['not for guests']) {
      roomsSelect.setCustomValidity('Ошибка! 2 комнаты для 2 гостей или для 1 гостя');
    }
  }
  if (roomsSelect.value === ROOMS['3 rooms']) {
    if (capacitySelect.value === GUESTS['not for guests']) {
      roomsSelect.setCustomValidity('Ошибка! 3 комнаты для 3 гостей, для 2 гостей или для 1 гостя');
    }
  }
  if (roomsSelect.value === ROOMS['100 rooms']) {
    if (capacitySelect.value !== GUESTS['not for guests']) {
      roomsSelect.setCustomValidity('Ошибка! 100 комнат не для гостей');
    }
  }
};

roomsSelect.addEventListener('change', validateRoomsGuests);
capacitySelect.addEventListener('change', validateRoomsGuests);

var typeSelect = document.querySelector('#type');
var priceSelect = document.querySelector('#price');

var syncType = function () {
  if (typeSelect.value === 'bungalo') {
    priceSelect.setAttribute('min', '0');
  }
  if (typeSelect.value === 'flat') {
    priceSelect.setAttribute('min', '1000');
  }
  if (typeSelect.value === 'house') {
    priceSelect.setAttribute('min', '5000');
  }
  if (typeSelect.value === 'palace') {
    priceSelect.setAttribute('min', '10000');
  }
};

typeSelect.addEventListener('change', syncType);

document.querySelector('.ad-form').onchange = function (evt) {
  this.timein.value = evt.target.value;
  this.timeout.value = evt.target.value;
};

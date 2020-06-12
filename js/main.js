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
/* var HOUSE_TYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  place: 'Дворец'
}; */
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

var createObject = function (array) {
  var point = {
    x: getRandomNumberInRange(PIN_POS_X_START, width),
    y: getRandomNumberInRange(PIN_POS_Y_START, PIN_POS_Y_END),
  };
  for (var i = FIRST_OBJECT; i < NUMBER_OF_OBJECTS; i++) {
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

// var newObject = createObject([]);

var mapElement = document.querySelector('.map');
// mapElement.classList.remove('map--faded');

/* var pinElement = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var cardObject = newObject[0];
 var renderPins = function (obj) {
  var newpinsElement = pinTemplate.cloneNode(true);
  newpinsElement.querySelector('img').src = obj[i].author.avatar;
  newpinsElement.querySelector('img').alt = obj[i].offer.title;
  newpinsElement.style = 'left:' + (obj[i].location.x - 20) + 'px; top:' + (obj[i].location.y - 20) + 'px;';
  return newpinsElement;
};

var fragment = document.createDocumentFragment();
for (var i = FIRST_OBJECT; i < NUMBER_OF_OBJECTS; i++) {
  fragment.appendChild(renderPins(createObject([])));
}
pinElement.appendChild(fragment);

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var newCardElement = cardTemplate.cloneNode(true);

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(newCardElement);
mapElement.appendChild(fragmentCard);

var photoElement = document.querySelector('.popup__photos');

var photoArray = cardObject.offer.photos;

var photoTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup__photo');

photoElement.innerHTML = '';

var fragmentPhoto = document.createDocumentFragment();

var renderCard = function (obj) {
  newCardElement.querySelector('.popup__title').textContent = obj.offer.title;
  newCardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  newCardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  newCardElement.querySelector('.popup__type').textContent = HOUSE_TYPE[obj.offer.type];
  newCardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  newCardElement.querySelector('.popup__description').textContent = obj.offer.description;
  newCardElement.querySelector('.popup__features').textContent = obj.offer.features;
  newCardElement.querySelector('.popup__avatar').src = obj.author.avatar;
  for (var k = FIRST_OBJECT; k < photoArray.length; k++) {
    var newPhotoElement = photoTemplate.cloneNode(true);
    newPhotoElement.src = photoArray[k];
    fragmentPhoto.appendChild(newPhotoElement);
  }
  photoElement.appendChild(fragmentPhoto);
};

renderCard(cardObject);
*/
var formElement = document.querySelector('.ad-form');
var fieldsetElement = formElement.querySelectorAll('fieldset');

for (var i = 0; i < fieldsetElement.length; i++) {
  fieldsetElement[i].setAttribute('disabled', 'disabled');
}

var addressFieldElement = document.querySelector('#address');

var mainPinElement = document.querySelector('.map__pin--main');

var activateSite = function () {
  for (var j = 0; j < fieldsetElement.length; j++) {
    fieldsetElement[j].removeAttribute('disabled');
    mapElement.classList.remove('map--faded');
  }
};

var fillAddress = function () {
  addressFieldElement.value = (mainPinElement.getBoundingClientRect().x + 20) + ',' + (mainPinElement.getBoundingClientRect().y + 44);
};

fillAddress();

var activateMainPin = function (evt) {
  if (evt.button === 0) {
    activateSite();
    fillAddress(createObject([]));
    mainPinElement.removeEventListener('mouseup', activateMainPin);
  }
};


mainPinElement.addEventListener('mouseup', activateMainPin);


mainPinElement.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateSite();
  }
});

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



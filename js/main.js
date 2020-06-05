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
  for (var i = FIRST_OBJECT; i < NUMBER_OF_OBJECTS; i++) {
    array[i] =
      {
        author: {
          avatar: 'img/avatars/user0' + getRandomNumberInRange(FIRST_AVATAR, LAST_AVATAR) + '.png'
        },
        location: {
          x: getRandomNumberInRange(PIN_POS_X_START, width),
          y: getRandomNumberInRange(PIN_POS_Y_START, PIN_POS_Y_END),
        },
        offer: {
          title: 'Объявление',
          address: location.x + ',' + location.y,
          price: 100,
          type: TYPES[getRandomNumberInRange(FIRST_OBJECT, TYPES.length - 1)],
          rooms: 3,
          guests: 456,
          checkin: CHECKINS[[getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
          checkout: CHECKINS[[getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
          features: getRandomArrayLength(FEAUTERS),
          photos: getRandomArrayLength(PHOTOS),
        }
      };
  }
  return array;
};

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var pinElement = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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

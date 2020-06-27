'use strict';
(function () {
  var FIRST_OBJECT = 0;
  var NUMBER_OF_OBJECTS = 5;
  var TYPES = ['place', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var FEAUTERS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FIRST_AVATAR = 1;
  var LAST_AVATAR = 8;
  var PIN_POS_Y_START = 130;
  var PIN_POS_Y_END = 630;
  var PIN_POS_X_START = 0;

  var mapWidth = document.querySelector('.map').offsetWidth;
  window.data = {
    createArray: function (array) {
      for (var i = FIRST_OBJECT; i < NUMBER_OF_OBJECTS; i++) {
        var point = {
          x: window.util.getRandomNumberInRange(PIN_POS_X_START, mapWidth),
          y: window.util.getRandomNumberInRange(PIN_POS_Y_START, PIN_POS_Y_END),
        };
        array[i] =
          {
            author: {
              avatar: 'img/avatars/user0' + window.util.getRandomNumberInRange(FIRST_AVATAR, LAST_AVATAR) + '.png'
            },
            location: {
              x: point.x,
              y: point.y,
            },
            offer: {
              title: 'Объявление',
              address: point.x + ',' + point.y,
              price: 100,
              type: TYPES[window.util.getRandomNumberInRange(FIRST_OBJECT, TYPES.length - 1)],
              rooms: 3,
              guests: 456,
              checkin: CHECKINS[[window.util.getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
              checkout: CHECKINS[[window.util.getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
              features: window.util.getRandomArrayLength(FEAUTERS),
              description: 'описание',
              photos: window.util.getRandomArrayLength(PHOTOS),
            }
          };
      }
      return array;
    },
    FIRST_OBJECT: FIRST_OBJECT,
    mapWidth: mapWidth
  };
})();

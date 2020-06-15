'use strict';
(function () {
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
  window.getRandomNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  window.getRandomArrayLength = function (array) {
    window.shuffleArray(array);
    return array.slice([window.getRandomNumberInRange(FIRST_OBJECT, array.length + 1)]);
  };

  var width = document.querySelector('.map').offsetWidth;

  window.createArray = function (array) {
    for (var i = FIRST_OBJECT; i < NUMBER_OF_OBJECTS; i++) {
      var point = {
        x: window.getRandomNumberInRange(PIN_POS_X_START, width),
        y: window.getRandomNumberInRange(PIN_POS_Y_START, PIN_POS_Y_END),
      };
      array[i] =
        {
          author: {
            avatar: 'img/avatars/user0' + window.getRandomNumberInRange(FIRST_AVATAR, LAST_AVATAR) + '.png'
          },
          location: {
            x: point.x,
            y: point.y,
          },
          offer: {
            title: 'Объявление',
            address: point.x + ',' + point.y,
            price: 100,
            type: TYPES[window.getRandomNumberInRange(FIRST_OBJECT, TYPES.length - 1)],
            rooms: 3,
            guests: 456,
            checkin: CHECKINS[[window.getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
            checkout: CHECKINS[[window.getRandomNumberInRange(FIRST_OBJECT, CHECKINS.length - 1)]],
            features: window.getRandomArrayLength(FEAUTERS),
            description: 'описание',
            photos: window.getRandomArrayLength(PHOTOS),
          }
        };
    }
    return array;
  };
  window.FIRST_OBJECT = FIRST_OBJECT;
})();

'use strict';
(function () {
  window.util = {
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    },
    getRandomArrayLength: function (array) {
      window.util.shuffleArray(array);
      return array.slice([window.util.getRandomNumberInRange(window.data.FIRST_OBJECT, array.length + 1)]);
    },
    getRandomNumberInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();

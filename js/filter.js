'use strict';
(function () {
  var filterElement = document.querySelector('.map__filters-container');
  var filterFields = filterElement.querySelectorAll('select');
  for (var j = 0; j < filterFields.length; j++) {
    filterFields[j].setAttribute('disabled', true);
  }
  var filterForm = document.querySelector('.map__filters');
  var housingFilterElement = filterElement.querySelector('#housing-type');
  var filterByType = function (array, limit) {
    var array1 = [];
    if (housingFilterElement.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer.type === housingFilterElement.value) {
        array1.push(array[i]);
        if (array1.length === limit) {
          break;
        }
      }
    }

    return array1;
  };
  var roomsFilterElement = filterElement.querySelector('#housing-rooms');
  var filterByRooms = function (array, limit) {
    var array2 = [];
    if (roomsFilterElement.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer.rooms.toString() === roomsFilterElement.value) {
        array2.push(array[i]);
        if (array2.length === limit) {
          break;
        }
      }
    }
    return array2;
  };
  var guestFilterElement = filterElement.querySelector('#housing-guests');
  var filterByGuests = function (array, limit) {
    var array3 = [];
    if (guestFilterElement.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer.guests.toString() === guestFilterElement.value) {
        array3.push(array[i]);
        if (array3.length === limit) {
          break;
        }
      }
    }
    return array3;
  };
  var priceFilterElement = filterElement.querySelector('#housing-price');
  var filterByPrice = function (array, limit) {
    var array4 = [];
    if (priceFilterElement.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (priceFilterElement.value === 'high' && array[i].offer.price > 50000 || priceFilterElement.value === 'low' && array[i].offer.price < 10000 || priceFilterElement.value === 'middle' && array[i].offer.price < 50000 && array[i].offer.price > 10000) {
        array4.push(array[i]);
        if (array4.length === limit) {
          break;
        }
      }
    }
    return array4;
  };

  var feautersFilterElement = filterElement.querySelector('#housing-features');
  var filterByFeauters = function (array, limit) {
    var checkedFeaturesItems = feautersFilterElement.querySelectorAll('input:checked');
    var array5 = [];
    for (var i = 0; i < array.length; i++) {
      for (var k = 0; k < checkedFeaturesItems.length; k++) {
        if (array[i].offer.features.includes(checkedFeaturesItems[k].value)) {
          array5.push(array[i]);
          if (array5.length === limit) {
            break;
          }
        } else {
          array5 = [];
        }
      }
    }
    if (checkedFeaturesItems.length === 0) {
      return array;
    } else {
      return array5;
    }
  };
  filterForm.addEventListener('change', function () {
    window.map.deletePins();
    window.map.closeCard();
    filterByFeauters(window.pinsArray, window.map.MAX_ELEMENTS);
    window.pin.renderPins(filterByType(filterByRooms(filterByGuests(filterByPrice(filterByFeauters(window.pinsArray, window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS));
  });
  window.filter = {
    filterFields: filterFields
  };

})();

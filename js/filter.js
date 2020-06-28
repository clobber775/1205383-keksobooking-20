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
    var filteredArray = [];
    if (housingFilterElement.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer.type === housingFilterElement.value) {
        filteredArray.push(array[i]);
        if (filteredArray.length === limit) {
          break;
        }
      }
    }

    return filteredArray;
  };
  var roomsFilterElement = filterElement.querySelector('#housing-rooms');
  var filterByRooms = function (array, limit) {
    var filteredArray = [];
    if (roomsFilterElement.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer.rooms.toString() === roomsFilterElement.value) {
        filteredArray.push(array[i]);
        if (filteredArray.length === limit) {
          break;
        }
      }
    }
    return filteredArray;
  };
  var guestFilterElement = filterElement.querySelector('#housing-guests');
  var filterByGuests = function (array, limit) {
    var filteredArray = [];
    if (guestFilterElement.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer.guests.toString() === guestFilterElement.value) {
        filteredArray.push(array[i]);
        if (filteredArray.length === limit) {
          break;
        }
      }
    }
    return filteredArray;
  };
  var priceValues = {
    any: function () {
      return true;
    },
    middle: function (price) {
      return price > 10000 && price < 50000;
    },
    low: function (price) {
      return price < 10000;
    },
    high: function (price) {
      return price > 50000;
    }
  };
  var priceFilterElement = filterElement.querySelector('#housing-price');
  var filterByPrice = function (array, limit) {
    var filteredArray = [];
    if (priceFilterElement.value === 'any') {
      return array;
    }
    var filteredPrice = priceValues[priceFilterElement.value];
    for (var i = 0; i < array.length; i++) {
      if (filteredPrice(array[i].offer.price)) {
        filteredArray.push(array[i]);
        if (filteredArray.length === limit) {
          break;
        }
      }
    }
    return filteredArray;
  };

  var feautersFilterElement = filterElement.querySelector('#housing-features');
  var filterByFeauters = function (array, limit) {
    var checkedFeaturesItems = Array.from(feautersFilterElement.querySelectorAll('input:checked'));
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      if (filtrationByFeatures(array[i])) {
        filteredArray.push(array[i]);
        if (filteredArray.length === limit) {
          break;
        }
      }
    }
    if (checkedFeaturesItems.length === 0) {
      return array;
    }
    return filteredArray;
  };
  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = feautersFilterElement.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };
  filterForm.addEventListener('change', function () {
    window.map.deletePins();
    window.map.closeCard();
    window.pin.renderPins(filterByType(filterByRooms(filterByGuests(filterByPrice(filterByFeauters(window.pinsArray, window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS), window.map.MAX_ELEMENTS));
  });
  window.filter = {
    filterFields: filterFields
  };

})();

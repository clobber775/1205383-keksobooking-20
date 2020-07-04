'use strict';
(function () {
  var filterElement = document.querySelector('.map__filters-container');
  var filterFields = filterElement.querySelectorAll('select');
  for (var j = 0; j < filterFields.length; j++) {
    filterFields[j].setAttribute('disabled', true);
  }
  var filtrateArray = function (array, element, key) {
    var filteredArray = [];
    if (element.value === 'any') {
      return array;
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer[key].toString() === element.value) {
        filteredArray.push(array[i]);
        if (filteredArray.length === window.map.MAX_ELEMENTS) {
          break;
        }
      }
    }
    return filteredArray;
  };
  var filterForm = document.querySelector('.map__filters');
  var housingFilterElement = filterElement.querySelector('#housing-type');
  var filterByType = function (array) {
    return filtrateArray(array, housingFilterElement, 'type');
  };
  var roomsFilterElement = filterElement.querySelector('#housing-rooms');
  var filterByRooms = function (array) {
    return filtrateArray(array, roomsFilterElement, 'rooms');
  };
  var guestFilterElement = filterElement.querySelector('#housing-guests');
  var filterByGuests = function (array) {
    return filtrateArray(array, guestFilterElement, 'guests');
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
  var filterByPrice = function (array) {
    var filteredArray = [];
    if (priceFilterElement.value === 'any') {
      return array;
    }
    var filteredPrice = priceValues[priceFilterElement.value];
    for (var i = 0; i < array.length; i++) {
      if (filteredPrice(array[i].offer.price)) {
        filteredArray.push(array[i]);
        if (filteredArray.length === window.map.MAX_ELEMENTS) {
          break;
        }
      }
    }
    return filteredArray;
  };

  var featuresFilterElement = filterElement.querySelector('#housing-features');
  var filterByFeatures = function (array) {
    var checkedFeaturesItems = Array.from(featuresFilterElement.querySelectorAll('input:checked'));
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      if (filtrationByFeatures(array[i])) {
        filteredArray.push(array[i]);
        if (filteredArray.length === window.map.MAX_ELEMENTS) {
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
    var checkedFeaturesItems = featuresFilterElement.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };
  filterForm.addEventListener('change', window.debounce(function () {
    window.map.deletePins();
    window.map.closeCard();
    window.pin.renderPins(filterByType(filterByRooms(filterByGuests(filterByPrice(filterByFeatures(window.pinsArray))))));
  }));
  window.filter = {
    filterFields: filterFields,
  };
})();

'use strict';
(function () {
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

  var formElement = document.querySelector('.ad-form');

  var fieldsetElements = formElement.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsetElements.length; i++) {
    fieldsetElements[i].disabled = true;
  }
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
  window.form = {
    fieldsetElements: fieldsetElements,
    formElement: formElement
  };
})();

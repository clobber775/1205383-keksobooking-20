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
  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;
  var formElement = document.querySelector('.ad-form');

  var fieldsetElements = formElement.querySelectorAll('fieldset');
  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  for (var j = 0; j < fieldsetElements.length; j++) {
    fieldsetElements[j].setAttribute('disabled', true);
  }


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
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainElement = document.querySelector('main');

  var closeSuccess = function () {
    var successElement = document.querySelector('.success');
    successElement.parentNode.removeChild(successElement);
    document.removeEventListener('click', closeSuccess);
    document.removeEventListener('keydown', closeSuccessOnButton);
  };
  var closeError = function () {
    var errorElement = document.querySelector('.error');
    errorElement.parentNode.removeChild(errorElement);
    document.removeEventListener('keydown', closeErrorOnButton);
    document.removeEventListener('click', closeErrorOffClick);
  };
  var closeErrorOffClick = function (evt) {
    if (evt.target.className !== 'error__message') {
      closeError();
    }
  };
  var closeSuccessOnButton = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccess();
    }
  };
  var closeErrorOnButton = function (evt) {
    if (evt.key === 'Escape') {
      closeError();
    }
  };
  var successHandler = function () {
    var successMessage = successTemplate.cloneNode(true);
    mainElement.appendChild(successMessage);
    window.map.deactivateSite();
    window.map.deletePins();
    window.map.closeCard();
    document.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', closeSuccessOnButton);
    formElement.reset();
    window.main.mainPinElement.style.top = MAIN_PIN_DEFAULT_Y + 'px';
    window.main.mainPinElement.style.left = MAIN_PIN_DEFAULT_X + 'px';
  };
  var errorHandler = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    mainElement.appendChild(errorMessage);
    document.addEventListener('click', closeError);
    document.addEventListener('keydown', closeErrorOnButton);
  };
  formElement.addEventListener('submit', function (evt) {
    window.backend.saveData(new FormData(formElement), successHandler, errorHandler);
    evt.preventDefault();
  });
  window.form = {
    fieldsetElements: fieldsetElements,
    formElement: formElement
  };
})();

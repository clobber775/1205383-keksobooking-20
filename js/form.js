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
  var formTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainElement = document.querySelector('main');

  var succesClickHandler = function () {
    var succesElement = document.querySelector('.success');
    succesElement.parentNode.removeChild(succesElement);
    document.removeEventListener('click', succesClickHandler);
    document.removeEventListener('keydown', succesButtonHandler);
  };
  var succesButtonHandler = function (evt) {
    if (evt.key === 'Escape') {
      var succesElement = document.querySelector('.success');
      succesElement.parentNode.removeChild(succesElement);
      document.removeEventListener('keydown', succesButtonHandler);
      document.removeEventListener('click', succesClickHandler);
    }
  };
  var errorClickHandler = function (evt) {
    if (evt.target.className !== 'error__message') {
      var errorElement = document.querySelector('.error');
      errorElement.parentNode.removeChild(errorElement);
      document.removeEventListener('click', errorClickHandler);
      document.removeEventListener('keydown', errorButtonHandler);
    }
  };
  var errorButtonHandler = function (evt) {
    if (evt.key === 'Escape') {
      var errorElement = document.querySelector('.error');
      errorElement.parentNode.removeChild(errorElement);
      document.removeEventListener('keydown', errorButtonHandler);
      document.removeEventListener('click', errorClickHandler);
    }
  };
  var sucessHandler = function () {
    window.form.formElement.classList.add('ad-form--disabled');
    var allpinElements = document.querySelectorAll('.map__pin');
    var successMessage = formTemplate.cloneNode(true);
    mainElement.appendChild(successMessage);
    for (var j = 0; j < window.form.fieldsetElements.length; j++) {
      window.form.fieldsetElements[j].setAttribute('disabled', true);
      window.map.mapElement.classList.add('map--faded');
    }
    for (var i = 1; i < allpinElements.length; i++) {
      allpinElements[i].parentNode.removeChild(allpinElements[i]);
    }
    var isCardOpened = document.querySelector('.map__card');
    if (isCardOpened) {
      isCardOpened.parentNode.removeChild(isCardOpened);
    }
    document.addEventListener('click', succesClickHandler);
    document.addEventListener('keydown', succesButtonHandler);
    formElement.reset();
    window.main.mainPinElement.style.top = MAIN_PIN_DEFAULT_Y + 'px';
    window.main.mainPinElement.style.left = MAIN_PIN_DEFAULT_X + 'px';
  };
  var errorHandler = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    mainElement.appendChild(errorMessage);
    document.addEventListener('click', errorClickHandler);
    document.addEventListener('keydown', errorButtonHandler);
  };
  formElement.addEventListener('submit', function (evt) {
    window.backend.saveData(new FormData(formElement), sucessHandler, errorHandler);
    evt.preventDefault();
  });
  window.form = {
    fieldsetElements: fieldsetElements,
    formElement: formElement
  };
})();

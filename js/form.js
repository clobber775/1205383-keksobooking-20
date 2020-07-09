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
  var filterFormElement = document.querySelector('.map__filters');
  var fieldsetElements = formElement.querySelectorAll('fieldset');
  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  fieldsetElements.forEach(function (it) {
    it.setAttribute('disabled', true);
  });

  var roomsGuestsValidationHandler = function () {
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

  roomsSelect.addEventListener('change', roomsGuestsValidationHandler);
  capacitySelect.addEventListener('change', roomsGuestsValidationHandler);

  var typeSelect = document.querySelector('#type');
  var priceSelect = document.querySelector('#price');
  var typeSyncHandler = function () {
    priceSelect.setAttribute('min', window.card.HOUSE_VARIANTS[(typeSelect.value).toUpperCase()].price);
    priceSelect.setAttribute('placeholder', window.card.HOUSE_VARIANTS[(typeSelect.value).toUpperCase()].price);
  };
  typeSelect.addEventListener('change', typeSyncHandler);

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');

  var timeChangeHandler = function (left, right) {
    right.value = left.value;
  };


  timeInElement.addEventListener('input', function () {
    timeChangeHandler(timeInElement, timeOutElement);
  });

  timeOutElement.addEventListener('input', function () {
    timeChangeHandler(timeOutElement, timeInElement);

  });
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainElement = document.querySelector('main');

  var successCloseClickHandler = function () {
    var successElement = document.querySelector('.success');
    successElement.parentNode.removeChild(successElement);
    document.removeEventListener('click', successCloseClickHandler);
    document.removeEventListener('keydown', successCloseOnEscapeButtonHandler);
  };
  var errorCloseClickHandler = function () {
    var errorElement = document.querySelector('.error');
    errorElement.parentNode.removeChild(errorElement);
    document.removeEventListener('keydown', errorCloseOnEscapeHandler);
    document.removeEventListener('click', errorCloseOffClickHandler);
  };
  var errorCloseOffClickHandler = function (evt) {
    if (evt.target.className !== 'error__message') {
      errorCloseClickHandler();
    }
  };
  var successCloseOnEscapeButtonHandler = function (evt) {
    if (evt.key === window.main.KEYCODES['escape']) {
      evt.preventDefault();
      successCloseClickHandler();
    }
  };
  var errorCloseOnEscapeHandler = function (evt) {
    if (evt.key === window.main.KEYCODES['escape']) {
      errorCloseClickHandler();
    }
  };
  var resetPage = function () {
    window.main.mainPinElement.style.top = MAIN_PIN_DEFAULT_Y + 'px';
    window.main.mainPinElement.style.left = MAIN_PIN_DEFAULT_X + 'px';
    window.main.fillAddress(window.main.MAIN_PIN_WIDTH / 2, window.main.MAIN_PIN_HEIGHT / 2);
    formElement.reset();
    filterFormElement.reset();
    window.map.deletePins();
    window.map.closeCard();
    window.map.deactivateSite();
    window.main.mainPinElement.addEventListener('keydown', window.main.mainPinButtonHandler);
  };
  var successHandler = function () {
    var successMessage = successTemplate.cloneNode(true);
    mainElement.appendChild(successMessage);
    resetPage();
    document.addEventListener('click', successCloseClickHandler);
    document.addEventListener('keydown', successCloseOnEscapeButtonHandler);
    window.main.mainPinElement.style.top = MAIN_PIN_DEFAULT_Y + 'px';
    window.main.mainPinElement.style.left = MAIN_PIN_DEFAULT_X + 'px';
    window.main.fillAddress(window.main.MAIN_PIN_WIDTH / 2, window.main.MAIN_PIN_HEIGHT / 2);
  };
  var errorHandler = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    mainElement.appendChild(errorMessage);
    document.addEventListener('click', errorCloseClickHandler);
    document.addEventListener('keydown', errorCloseOnEscapeHandler);
  };
  formElement.addEventListener('submit', function (evt) {
    window.backend.saveData(new FormData(formElement), successHandler, errorHandler);
    evt.preventDefault();
  });
  window.form = {
    fieldsetElements: fieldsetElements,
    formElement: formElement
  };
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPage();
    window.main.fillAddress(window.main.MAIN_PIN_WIDTH / 2, window.main.MAIN_PIN_HEIGHT / 2);
  });
  resetButton.addEventListener('keydown', function (evt) {
    if (evt.key === window.main.KEYCODES['enter']) {
      evt.preventDefault();
      resetPage();
      window.main.fillAddress(window.main.MAIN_PIN_WIDTH / 2, window.main.MAIN_PIN_HEIGHT / 2);
    }
  });
})();

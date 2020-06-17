'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var TAIL_HEIGHT = 22;
  var addressFieldElement = document.querySelector('#address');
  var offersData = window.data.createArray([]);
  var mainPinElement = document.querySelector('.map__pin--main');
  var fillAddress = function (posX, posY) {
    addressFieldElement.value = (mainPinElement.offsetLeft + posX + ',' + (mainPinElement.offsetTop + posY));
  };
  var mainPinHandler = function (evt) {
    if (evt.button === 0) {
      window.map.activateSite();
      fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT + TAIL_HEIGHT);
      window.form.formElement.classList.remove('ad-form--disabled');
      mainPinElement.removeEventListener('mouseup', mainPinHandler);
    }
  };


  mainPinElement.addEventListener('mouseup', mainPinHandler);

  var mainPinButtonHandler = function (evt) {
    if (evt.key === 'Enter') {
      window.map.activateSite();
      fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT + TAIL_HEIGHT);
      window.form.formElement.classList.remove('ad-form--disabled');
      mainPinElement.removeEventListener('keydown', mainPinHandler);
    }
  };


  mainPinElement.addEventListener('keydown', mainPinButtonHandler);
  fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT / 2);
  var limits = {
    top: window.map.mapElement.offsetTop,
    right: window.map.mapElement.offsetWidth + window.map.mapElement.offsetLeft,
    bottom: window.map.mapElement.offsetHeight + window.map.mapElement.offsetTop,
    left: window.map.mapElement.offsetLeft
  };
  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (moveEvt.pageX > limits.right) {
        mainPinElement.style.left = window.map.mapElement.offsetWidth - MAIN_PIN_WIDTH / 2 + 'px';
      } else if (moveEvt.pageX < limits.left) {
        mainPinElement.style.left = limits.top - MAIN_PIN_WIDTH / 2 + 'px';
      }
      if (moveEvt.pageY > limits.bottom) {
        mainPinElement.style.top = limits.bottom - MAIN_PIN_WIDTH - TAIL_HEIGHT + 'px';
      } else if (moveEvt.pageY < limits.top) {
        mainPinElement.style.top = limits.top + 'px';
      }
      mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT + TAIL_HEIGHT);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPinElement.removeEventListener('click', onClickPreventDefault);
        };
        mainPinElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.main = {
    mainPinElement: mainPinElement,
    offersData: offersData,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    TAIL_HEIGHT: TAIL_HEIGHT,
  };
})();

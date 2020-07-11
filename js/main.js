'use strict';
(function () {
  var MAIN_PIN_WIDTH = 67;
  var MAIN_PIN_HEIGHT = 65;
  var TAIL_HEIGHT = 22;
  var MAIN_PIN_TOP_LIMIT = 130;
  var MAIN_PIN_BOTTOM_LIMIT = 630;
  var addressFieldElement = document.querySelector('#address');
  var KEYCODES = {
    Escape: 'Escape',
    Enter: 'Enter',
    MouseLeftButtonClick: 0,
  };
  var mainPinElement = document.querySelector('.map__pin--main');
  var fillAddress = function (posX, posY) {
    addressFieldElement.value = (Math.floor(mainPinElement.offsetLeft + posX) + ',' + Math.floor(mainPinElement.offsetTop + posY));
  };
  var mainPinClickHandler = function (evt) {
    if (evt.button === KEYCODES['MouseLeftButtonClick']) {
      window.map.activateSite();
      fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT + TAIL_HEIGHT);
      window.form.formElement.classList.remove('ad-form--disabled');
    }
    mainPinElement.removeEventListener('mouseup', mainPinClickHandler);
    mainPinElement.removeEventListener('keydown', mainPinButtonHandler);
  };
  mainPinElement.addEventListener('mouseup', mainPinClickHandler);

  var mainPinButtonHandler = function (evt) {
    if (evt.key === KEYCODES['Enter']) {
      window.map.activateSite();
      fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT + TAIL_HEIGHT);
      window.form.formElement.classList.remove('ad-form--disabled');
    }
    mainPinElement.removeEventListener('mouseup', mainPinClickHandler);
    mainPinElement.removeEventListener('keydown', mainPinButtonHandler);
  };


  mainPinElement.addEventListener('keydown', mainPinButtonHandler);
  fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT / 2);
  var limits = {
    top: MAIN_PIN_TOP_LIMIT - MAIN_PIN_HEIGHT - TAIL_HEIGHT,
    right: window.map.mapElement.offsetWidth - (MAIN_PIN_WIDTH / 2),
    bottom: MAIN_PIN_BOTTOM_LIMIT - MAIN_PIN_HEIGHT - TAIL_HEIGHT,
    left: -(MAIN_PIN_WIDTH / 2)
  };
  var mainPinDragHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;
      fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT + TAIL_HEIGHT);
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var x = Math.max(limits.left, Math.min(mainPinElement.offsetLeft -
        shift.x, limits.right));
      var y = Math.max(limits.top, Math.min(mainPinElement.offsetTop -
        shift.y, limits.bottom));
      mainPinElement.style.left = x + 'px';
      mainPinElement.style.top = y + 'px';
    };
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      if (evt.button === KEYCODES['MouseLeftButtonClick']) {
        if (window.map.mapElement.classList.contains('map--faded')) {
          window.map.activateSite();
        }
        window.form.formElement.classList.remove('ad-form--disabled');
        mainPinElement.removeEventListener('mouseup', mainPinClickHandler);
        mainPinElement.removeEventListener('keydown', mainPinButtonHandler);
      }
      fillAddress(MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT + TAIL_HEIGHT);
      if (dragged) {
        var preventDefaultClickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          mainPinElement.removeEventListener('click', preventDefaultClickHandler);
        };
        mainPinElement.addEventListener('click', preventDefaultClickHandler);
      }
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  mainPinElement.addEventListener('mousedown', mainPinDragHandler);
  window.main = {
    mainPinButtonHandler: mainPinButtonHandler,
    mainPinClickHandler: mainPinClickHandler,
    mainPinDragHandler: mainPinDragHandler,
    fillAddress: fillAddress,
    mainPinElement: mainPinElement,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    TAIL_HEIGHT: TAIL_HEIGHT,
    KEYCODES: KEYCODES
  };
})();


'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadPreview = function (input, element) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        element.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  var avatarFileChooserElement = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  avatarFileChooserElement.addEventListener('change', function () {
    uploadPreview(avatarFileChooserElement, avatarPreviewElement);
  });
  var offerFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');
  var offerPreviewElement = document.querySelector('.ad-form__photo');
  var previewElementImage = document.createElement('img');
  previewElementImage.style.width = '70px';
  previewElementImage.style.height = '70px';
  offerPreviewElement.append(previewElementImage);
  offerFileChooserElement.addEventListener('change', function () {
    uploadPreview(offerFileChooserElement, previewElementImage);
  });
})();

(function (window) {
  'use strict'
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided.');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data)
        .then(function () {
          this.reset();
          this.elements[0].focus();
        }.bind(this));
    });
  };

  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('Setting input handler for form.');
    if (fn === App.Validation.isCompanyEmail) {
      this.$formElement.on('input', '[name="emailAddress"]', function (event) {
        var emailAddress = event.target.value;
        var message = '';
        if (fn(emailAddress)) {
          event.target.setCustomValidity('');
        } else {
          message = emailAddress + ' is not an authorized email address!';
          event.target.setCustomValidity(message);
        }
      });
    } else if (fn === App.Validation.isDecaf) {
      this.$formElement.on('input', '[name="coffee"]', function (event) {
        var coffeeName = event.target.value;
        var $sliderValue = $('[name="strength"]').val();
        var message = '';
        if (fn(coffeeName, $sliderValue)) {
          event.target.setCustomValidity('');
        } else {
          message = coffeeName + ' is not a decaf!';
          event.target.setCustomValidity(message);
        }
      });
      this.$formElement.on('change', '[name="strength"]', function (event) {
        var sliderValue = event.target.value;
        var $name = $('[name="coffee"]').val();
        var message = '';
        if (fn($name, sliderValue)) {
          event.target.setCustomValidity('');
        } else {
          message = $name + ' is not a decaf!';
          event.target.setCustomValidity(message);
        }
      });
    }
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);

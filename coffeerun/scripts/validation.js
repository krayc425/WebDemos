(function (window) {
  'use strict'
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@bignerdranch\.com$/.test(email);
    },

    isDecaf: function (name, concentration) {
      console.log(name, concentration);
      console.log(name.indexOf('decaf') != -1, concentration > 20);
      if (name.indexOf('decaf') != -1 && concentration > 20) {
        return false;
      } else {
        return true;
      }
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);

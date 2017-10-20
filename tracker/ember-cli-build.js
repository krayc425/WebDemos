/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {

  var bootstrapPath = 'bower_components/bootstrap-sass/assets/';
  var fontAwesomePath = 'bower_components/font-awesome/'
  
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        bootstrapPath + 'stylesheets',
        fontAwesomePath + 'scss'
      ]
    },
    'ember-font-awesome': {
      useScss: true, // for ember-cli-sass
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import(bootstrapPath + 'javascripts/bootstrap.js');
  app.import(fontAwesomePath + 'scss/font-awesome.scss')

  return app.toTree();
};

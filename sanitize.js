/**
 * Sanitizations modify values to make sure they conform to the expected format. In addition to
 * the sanitizations, the library provides a mechanism to setup and process a group of sanitizations
 * using the bluebird Promise Library.
 *
 * @exports Sanitize
 * @namespace SuperJS.Sanitize
 * @extends SuperJS.Class
 */

"use strict";

var SuperJS = require('superjs');
var Promise = require('bluebird');


module.exports = SuperJS.Class.extend({



  //setup sanitizations for the given property by creating an array of closures
  //which contain promises to sanitize
  setup: function(sanitizations, context, propertyName) {

    //maintain reference to instance
    var self = this;

    //maintain list of closures
    var list = [];

    //loop through transorms
    for( var sanitization in sanitizations ) {

      var options = sanitizations[sanitization];

      //todo: after transforms store parameters in context object not getter/setter
      list.push(function() {
        return new Promise(function(resolve,reject) {
          context[propertyName] = self[sanitization](value,options);
          resolve();
        });
      });

    }

    return list;
  },

  process: function(list) {

    //maintain list of promises for all parameters of this request
    var sanitizations = [];

    //execute each closure and append each promise to the array
    for( var closure in list ) {
      sanitizations.push(list[closure]());
    }

    //settle all validations and resolve with any exceptions
    return Promise.all(sanitizations);
  },


  lowercase: function(val) {
    return val.toLowerCase();
  },

  uppercase: function (val) {
    return val === val.toUpperCase() ;
  }

});

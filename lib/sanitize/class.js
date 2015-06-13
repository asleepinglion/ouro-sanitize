"use strict";

var Ouro = require('ouro');
var Base = require('ouro-base');
var Promise = require('bluebird');
var Sanitizations = require('../sanitizations/class');

module.exports = Base.extend(Ouro.Meta, Sanitizations, {

  _metaFile: function() {
    this._loadMeta(__filename);
  },

  //setup sanitizations for the given property by creating an array of closures
  //which contain promises to sanitize
  setup: function(sanitizations, context, propertyName, contextName) {

    //maintain reference to instance
    var self = this;

    //maintain list of closures
    var list = [];

    //loop through transorms
    for( var sanitization in sanitizations ) {

      var options = sanitizations[sanitization];

      list.push(function() {
        context[propertyName] = self[sanitization](context[propertyName],options);
      });

    }

    return list;
  },

  process: function(list) {

    return new Promise(function(resolve, reject) {

      //execute each closure
      for( var closure in list ) {
        list[closure]();
      }

      resolve();

    });
  }

});

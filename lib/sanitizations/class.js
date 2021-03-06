"use strict";

var Base = require('ouro-base');
var Ouro = require('ouro');

module.exports = Base.extend({

  _metaFile: function() {
    this._super();
    this._loadMeta(__filename);
  },

  lowercase: function(val) {
    return val.toLowerCase();
  },

  uppercase: function (val) {
    return val.toUpperCase();
  },

  ucFirst: function(val) {
    return val.substr(0,1).toUpperCase() + val.substr(1,val.length-1);
  }

});
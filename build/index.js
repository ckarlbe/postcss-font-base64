'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-font-base64', function (options) {
  // handle options here
  options = options || {};

  return function (css, result) {

    // Runs through all of the nodes (declorations) in the file
    css.walkDecls(function (declaration) {
      declaration.value = declaration.value.split('').reverse().join('');
    });
  };
});
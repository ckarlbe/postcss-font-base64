'use strict';

var postcss = require('postcss');
var path = require('path');
var fs = require('fs');

module.exports = postcss.plugin('postcss-font-base64', function (options) {
  // handle options here
  options = options || {};
  // default options
  options.match = options.match || { 'Scrabble': ['fakefont'] };
  options.format = options.format || ['eot', 'woff', 'woff2', 'ttf'];
  // variables
  var CWD = path.resolve(process.cwd());
  return function (css, result) {
    // Runs through all of the nodes (declarations) in the css
    var fontFaces = [];
    css.walkAtRules('font-face', function (fontFace) {

      fontFace.each(function (kids) {
        var fontValues = [];
        if (kids.prop === 'src') {
          var properties = kids.value.split(',');
          //console.log(properties)
          for (var i = 0; i < properties.length; i++) {}
          //console.log(properties[i].split(','))

          //console.log(fontValues);
          //kids.replaceValues(/\w/, 'ost')
          //console.log('value');
        }
        //console.log(fontValues);
        fontFace.replaceValues(/url\([a-z\.\/\? \# \' \"\-]+\)/, function (attr) {

          var fontSource = attr.match(/[a-z\.\/\? \# \' \" \-]+(?=[\)])/)[0].replace(/\"+/g, '').replace('?#iefix', '');
          console.log(fontSource);
          var res64 = base64Encode(fontSource);

          var newUrlStr = 'url(data:application/'.concat(getFormat(attr)).concat(';charset=utf-8;base64').concat(res64);

          return newUrlStr;
        });
        /*
        for(var i=0; i<fontValues.length; i++){
            console.log(fontValues[i]);
        }
        */
        /*
        //var res64 = base64Encode(options.fontPath + '/fonts/' + 'fakefont.eot');
        //rule.append({prop: 'base64', value: res64});
           //rule.remove()
        // object to store base64 encodings
        //var myMap = {}
        if (rule.prop === 'src'){
          rule.value = 'url(data:application/font-woff)'
        }
         // locate font-family declaration
        //if (decl.prop==='font-family') {
         //TODO: Change this to a smarter map
        //var fonts = getFontList();
         //var res64 = base64Encode(options.fontPath + '/' + 'fakefont.eot');
        //myMap[decl.value] = { 'base64': res64 };
        //decl.value = res64;
        */
      });
    });
    // helper functions

    function getFormat(attribute) {

      var formats = {
        '.woff': 'font-woff',
        '.woff2': 'font-woff2',
        '.ttf': 'font-tiff',
        '.eot': 'font-eot'
      };

      var match = '';
      var extension = attribute.match(/\.[a-z]{3,4}/)[0];

      if (extension in formats) {
        match = formats[extension];
      };
      return match;
    };

    function getFontList(fontPath) {
      var listOfFonts = fs.readdirSync(fontPath);
      return listOfFonts;
    }

    function base64Encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
    }
  };
});
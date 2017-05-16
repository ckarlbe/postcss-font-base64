var postcss = require('postcss');
var path = require('path');
var fs = require('fs')

module.exports = postcss.plugin('postcss-font-base64', function (options) {
  // handle options here

  options = options || {};
  console.log(path.resolve(process.cwd()));
  // variables
  var FONTPATH = path.resolve(process.cwd()) + '/fonts';
  var fontsExists = false;

  // default options
  options.fontPath = options.fontPath || FONTPATH;
  options.match = options.match || {'Scrabble': ['fakefont']}
  options.format = options.format || ['eot', 'woff', 'woff2', 'ttf'];

  return function(css, result) {
    console.log('yah');
    // Runs through all of the nodes (declarations) in the css

    css.walkDecls('font-family', function (decl) {
      var fontsExists = true;

      // object to store base64 encodings
      var myMap = {}

      // locate font-family declaration
      if (decl.prop==='font-family') {

        //TODO: Change this to a smarter map
        //var fonts = getFontList();

        var res64 = base64Encode(options.fontPath + '/' + 'fakefont.eot');
        myMap[decl.value] = { 'base64': res64 };

        decl.value = res64;
      }
    }
  );
  // Ok, let's make some rules!








    // helper functions
    function getFontList() {
        var listOfFonts = fs.readdirSync(options.fontPath);
        return listOfFonts;
    }

    function base64Encode(file) {
      var bitmap = fs.readFileSync(file);
      return new Buffer(bitmap).toString('base64');
    };

  };

})

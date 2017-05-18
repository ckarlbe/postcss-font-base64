# Description
This postcss module takes your local custom font and encode it to a base64 string which is included in your css. The supported formats are currently woff, woff2, ttf, and eot. This module is subject to change. Contribution appreciated!

# Example
## Input
´´´css
@font-face {
    font-family: Scrabble;
    src:
        url("fonts/fakefont.eot?#iefix") format("embedded-opentype"),
        url("fonts/fakefont.woff") format("woff"),
        url("fonts/fakefont.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}
´´´
## Output
´´´css
@font-face {
    font-family: "Scrabble";
    src:
      url(data:application/font-eot;charset=utf-8;base64sZEAABWRAAACAAIABAAAAAIPBwMCA...pc0RTbjSyE+/XjpRgPM1g5rbWwJy1hgQ0rxIVh5Pg1r2DWkvG+KvL95Cmy471YvSjh2sbESIUUsesdIrznF3l54u0ZwZITPeE format("embedded-opentype"),

      url(data:application/font-woff;charset=utf-8;base64d09GRgABAAAAAKTcABEAAAABRswA...AACQHFwQ2aG10eAAAAlAAAAPpAAAHhNlUK9Zsb2NhAAARHAAAA8QAAAPEJgVXKG1heHAAAAHcAAAAIAAAACAE0wfMbmFtZQAA format("woff"),

      url(data:application/font-tiff;charset=utf-8;base64AAEAAAARAQAABAAQR0RFRhtmHS0A...fgAAAeEbG9jYSYFVygAABzYAAADxG1heHAE0wfMAAABeAAAACBuYW1lOotkigAA3VAAAAKacG9zdP+BAG8AAN/sAAAAIHByZXCF7x/xAAAVOAAAA2oAAQAAAAEZma7l/dhfDzz1AAkD6AAAAADSTkhUAAAAANJOeqj/Pf7ZA+8D0QAA format("truetype");

    font-weight: normal;
    font-style: normal;
}
´´´

# Config
In your postcss.config.js add this module:
´´´javascript
module.exports = {
    plugins: [
      ...
      require('postcss-font-base64')({
        //future options will be handled here
      })
    ]
}

´´´
# Options
There are currently no options available. Please suggest!

# Disclaimer
This is my first postCss plugin, feel free to contribute, comment or help out 🍺

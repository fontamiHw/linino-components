//configure webserver restful
var j5 = require("johnny-five");

[
  "KeyBoard",
  "MagneticSwitch",
  "PwmAnlControlled"
].forEach(function(constructor) {
  module.exports[constructor] = require(
    "../lib/" + constructor.toLowerCase()
  );
});
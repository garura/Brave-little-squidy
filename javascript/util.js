(function () {
  if (typeof Squidy === "undefined") {
    window.Squidy = {};
  }

  var Util = Squidy.Util = {};

  // Find distance between two points to calculate 'collision'
  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // builds random radius, based on hero's size
  var randomRadius = Util.randomRadius = function(heroRadius) {
    return Math.min(130, Math.random() * heroRadius + heroRadius / 4);
  };

  // set random velocity, based on direction enemy should be moving
  var randomVelocity = Util.randomVelocity = function(startingLoc) {
    if (startingLoc > 1000) {
      return [(Math.random() * -3) - 0.3, Math.random() * 0.5 - 0.25]; // 1 to 3
    }
    else {
      return [(Math.random() * 3) + 0.3, Math.random() * 0.5 - 0.25]; // -1 to -3
    }
  };

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();

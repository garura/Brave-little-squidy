(function () {
  if (typeof Squidy === "undefined") {
    window.Squidy = {};
  }

  var Enemy = Squidy.Enemy = function(game, heroRadius) {
    var options = {};

    options.game = game;
    options.radius = Squidy.Util.randomRadius(heroRadius);
    var xPos = 1000 * Math.floor((Math.random() * 2) % 2);
    // start "offscreen"
    if (xPos === 1000) {
      xPos += options.radius;
    }
    else {
      xPos -= options.radius + 1;
    }
    // spawn on either left side or right side (x), and gradient of height
    options.pos = [xPos, 600 * Math.random()];
    options.vel = Squidy.Util.randomVelocity(options.pos[0]);
    options.isEnemy = true;
    Squidy.MovingObject.call(this, options)
  };

  Squidy.Util.inherits(Enemy, Squidy.MovingObject);

})();

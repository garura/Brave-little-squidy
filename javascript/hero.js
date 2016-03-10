(function () {
  if (typeof Squidy === "undefined") {
    window.Squidy = {};
  }

  var Hero = Squidy.Hero = function (game) {
    var options = {};
    options.game = game;
    options.radius = Hero.RADIUS;
    options.pos = [500, 400];
    options.vel = [0, 0];
    options.isEnemy = false;
    Squidy.MovingObject.call(this, options)
  };

  Hero.RADIUS = 20;


  Squidy.Util.inherits(Hero, Squidy.MovingObject);

  Hero.prototype.swim = function (impulse) {
    this.vel[0] += impulse[0];
    if (this.vel[0] > 5) {
      this.vel[0] = 5;
    }
    else if (this.vel[0] < -5) {
      this.vel[0] = -5;
    }
    this.vel[1] += impulse[1];
    if (this.vel[1] > 5) {
      this.vel[1] = 5;
    }
    if (this.vel[1] < -5) {
      this.vel[1] = -5;
    }
  };
})();

(function () {
  if (typeof Squidy === "undefined") {
    window.Squidy = {};
  }

  var Game = Squidy.Game = function () {
    this.playing = true;
    this.hero = new Squidy.Hero(this);

    var enemies = [];
    for (var i = 0; i < 15; i++) {
      enemies.push(new Squidy.Enemy(this, this.hero.radius));
    }
    this.enemies = enemies;
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 60;

  Game.prototype.addEnemy = function (object) {
    this.enemies.push(object);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    this.enemies.forEach(function (enemy) {
      if (game.hero.isCollidedWith(enemy)) {
        game.hero.collideWith(enemy);
      }
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.hero.draw(ctx);
    
    this.enemies.forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos, radius) {
    return ((pos[0] < (0 - radius)) || (pos[1] < (0 - radius)) ||
      (pos[0] > Game.DIM_X + radius) || (pos[1] > Game.DIM_Y + radius));
  };

  Game.prototype.moveObjects = function (delta) {
    this.hero.move(delta);
    this.enemies.forEach(function (object) {
      object.move(delta);
    });
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Squidy.Enemy) {
      var idx = this.enemies.indexOf(object);
      this.enemies[idx] = new Squidy.Enemy(this, this.hero.radius);
    }
  };

  Game.prototype.step = function (delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  };
})();

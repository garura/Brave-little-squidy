(function () {
  if (typeof Squidy === "undefined") {
    window.Squidy = {};
  }

  var MovingObject = Squidy.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.isEnemy = options.isEnemy;
  };

  var gameImages = {
    enemyMovingLeft: './assets/Enemy_moving_left.png',
    angryLeft: './assets/Angry_left.png',
    enemyMovingRight: './assets/Enemy_moving_right.png',
    angryRight: './assets/Angry_right.png',
    blooperStill: './assets/Blooper_still_copy.png',
    blooperMovingLeft: './assets/Blooper_moving_left.png',
    blooperMovingRight: './assets/Blooper_moving_right.png'
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Squidy.Util.dist(this.pos, otherObject.pos);

    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    if (otherObject.radius < this.radius) {
      this.radius += 2;
      otherObject.remove();
    }
    else {
      this.game.playing = false;
    }
  };

  MovingObject.prototype.draw = function (ctx) {
    var image = new Image();

    // pick appropriate image to render
    if (this.vel[0] < -0.05) {
      // moving left
      if (this.isEnemy) {
        image.src = gameImages.enemyMovingLeft;
        if (this.vel[0]/this.radius < -0.05 || this.vel[0] < -2.5) {
          image.src = gameImages.angryLeft;
        }
      }
      else {
        // hero
        image.src = gameImages.blooperMovingLeft;
      }
    }
    else if (this.vel[0] > 0.05) {
      // moving right
      if (this.isEnemy) {
        image.src = gameImages.enemyMovingRight;
        if (this.vel[0]/this.radius > 0.05 || this.vel[0] > 2.5) {
          image.src = gameImages.angryRight;
        }
      }
      else {
        image.src = gameImages.blooperMovingRight;
      }
    }
    else {
      // blooper not moving sideways
      image.src = gameImages.blooperStill;
    }

    ctx.drawImage(
      image,
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      this.radius *2.1, this.radius*2.1
    );
  };

  var NORMAL_FRAME_TIME_DELTA = 1000/60;
  MovingObject.prototype.move = function (timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second

    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    var newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    this.pos = newPos;
    if (!this.isEnemy) { // this === hero

        // taper x speed
        this.vel[0] *= 0.95;
        // taper y speed
        this.vel[1] *= 0.95;
        if (this.pos[1] < 595 - this.radius*1.1) {
          this.vel[1] += 0.1;
        }
        this.pos[0] = Math.max(this.radius + 1, this.pos[0]);
        this.pos[0] = Math.min(this.pos[0], (1000 - this.radius - 1));
        this.pos[1] = Math.max(this.radius + 1, this.pos[1]);
        this.pos[1] = Math.min(this.pos[1], (600 - this.radius - 1));
    }

    if (this.isEnemy) {
      if (this.game.isOutOfBounds(this.pos, this.radius+1)) {
        this.remove();
      }
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();

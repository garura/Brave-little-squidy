(function () {
  if (typeof Squidy === "undefined") {
    window.Squidy = {};
  }

  var GameView = Squidy.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.hero = game.hero;
    this.started = false;
    this.highScore = 0;
    this.currentScore = 0;
  };

  GameView.MOVES = {
    87: [ 0, -1],
    65: [-1,  -0.1],
    83: [ 0,  0.25],
    68: [ 1,  -0.1],
  };

  Squidy.movements = {};

  GameView.prototype.swimHero = function(impulse) {
    this.hero.swim(impulse);
  };

  GameView.prototype.bindKeyHandlers = function () {
    // var hero = this.hero;
    var that = this;
    var validKeys = [65, 68, 83, 87];

    document.addEventListener('keydown', function(e){
      if (e.keyCode === 32 && (!that.game.playing || that.game.hero.radius >= 420)) {
        // hit spacebar when game is over
        that.newGame();
      }
      if (validKeys.includes(e.keyCode)) {
        if (!Squidy.movements[e.keyCode]) {
          // dont allow held button to give move (more squid-like feel)
          var impulse = [0, 0];
          impulse[0] += (GameView.MOVES[e.keyCode][0] * 3);
          impulse[1] += (GameView.MOVES[e.keyCode][1] * 5);
          that.swimHero(impulse);
        }
        Squidy.movements[e.keyCode] = true;
      }
    }, false);

    addEventListener('keyup', function(e) {
      delete Squidy.movements[e.keyCode];
    }, false);
  };


  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.lastTime = 0;
    this.game.playing = false;
    this.ctx.fillStyle = "rgb(250, 80, 80)";
    this.ctx.textAlign = 'center';
    this.ctx.font = '30px Arial';

    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function(time){
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    this.currentScore = (this.hero.radius - 20)/2;
    if ((this.hero.radius - 20)/2 > this.highScore) {
      this.highScore = (this.hero.radius - 20)/2;
    }
    if (this.highScore > 0) {
      this.ctx.fillText("High Score: " + this.highScore, 120, 50);
    }
    //every call to animate requests causes another call to animate
    if (this.game.playing && this.hero.radius < 420) {
      this.ctx.fillText("Current Score: " + this.currentScore, 500, 50);
      requestAnimationFrame(this.animate.bind(this));
    }
    else if (this.started){
      if (this.hero.radius < 420 ) {
        this.ctx.fillText("GAME OVER! Score:" + ((this.game.hero.radius - 20)/2), 500, 300);
        this.ctx.fillText("Press Space to play again!", 500, 400);
      }
      else {
        // this.game.playing = false;
        this.ctx.fillText("You won! Little Squidy did it!", 500, 300);
        this.ctx.fillText("Press Space to play again!", 500, 400);
      }
    }
  };

  GameView.prototype.newGame = function() {
    var menu = document.getElementsByClassName('welcome')[0];
    if (menu) {
      menu.className = 'hidePls';
    }
    this.started = true;
    this.game = new Squidy.Game();
    this.hero = this.game.hero;
    this.lastTime = 0;
    this.currentScore = 0;
    requestAnimationFrame(this.animate.bind(this));
  };
})();

'use strict';

enchant();				// enchantライブラリ呼び出し

var gs = {
  height  : 320
  , width : 320
  , fps   : 30		// Gameのfps
};
var  game, stage;		// GameCore,SceneGroupオブジェクト

// 拡張Core
var MyCore = enchant.Class.create(enchant.nineleap.Core, {
  initialize: function(color) {	// コンストラクタ
    enchant.nineleap.Core.call(this, gs.width, gs.height);
    this.fps = gs.fps;
    stage = this.rootScene;
    stage.backgroundColor = color || 'white';
  }
});

//	==================================================
//	Template for enchant.js Normal version
//	==================================================

var RandomLabel = enchant.Class.create(enchant.Label, {
  initialize: function() {
    enchant.Label.call(this);
    this.font = '20px monospace';
    this.text = this.randomNumber() + '点';
    this.color = this.randomColor();
    this.lifetime = 10;
    this.moveRandomPosition();
    this.on('enterframe', this.run);
    game.currentScene.addChild(this);
  },

  random: function(num) {
    return Math.floor(Math.random() * num);
  },

  randomNumber: function() {
    var max = 100;

    return this.random(max);
  },

  randomColor: function() {
    var color = 256;

    return [
      'rgb('
      , [this.random(color), this.random(color), this.random(color)]
      , ')'
    ].join('');
  },

  randomPosition: function() {
    return {
      x: this.random(game.width)
      , y: this.random(game.height)
    };
  },

  moveRandomPosition: function() {
    var position = this.randomPosition();

    this.moveTo(position.x, position.y);
  },

  run: function() {
    this.move();
    if (this.age > this.lifetime) {
      this.remove();
    }
  },

  move: function() {
    this.y--;
  },

  remove: function() {
    this.scene.removeChild(this);
  }
});

window.onload = function() {
  game  = new MyCore('mintcream');

  game.onload = function() {

    stage.on('enterframe', function() {

      if (stage.age > 1000) {
        game.end();
      }

      if ((stage.age % 3) === 0) {
        stage.addChild(new RandomLabel());
      }
    });

  };

  game.start();
};
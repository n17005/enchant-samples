/*
 global enchant, GS, BaseChara, ECore, Generator
*/

'use strict';

enchant(); // enchantライブラリ呼び出し

var game, stage; // GameCore,Sceneオブジェクト
var gs = new GS({
  fps: 15,
  height: 320,
  width: 320,
  assets: {}
});

// 初期背景画像
gs.assets.background = {
  height: 320,
  width: 320,
  path: './assets/background.gif'
};

//  ==================================================
//  Template create 2015-10-30
//  ==================================================

gs.assets.bear = {
  height: 32,
  width: 32,
  frame: [4],
  path: './assets/chara1.png',
  speed: 5
};

var Player = enchant.Class.create(BaseChara, {

  initialize: function() {
    var asset = gs.assets.bear;

    BaseChara.call(this, game, asset);
    this.frame = asset.frame;
    this.speed = asset.speed;
    this.input = game.input;
    this.x = (game.width - this.width) / 2;
    this.y = (game.height + this.height) / 2;
    this.on('enterframe', this.move);
    stage.addChild(this);
  },

  move: function() {

    if (this.input.left && this.isRangeMinX()) {
      this.x -= this.speed;
      this.left();
    }

    if (this.input.right && this.isRangeMaxX()) {
      this.x += this.speed;
      this.right();
    }

    if (this.input.up && this.isRangeMinY()) {
      this.y -= this.speed;
    }

    if (this.input.down && this.isRangeMaxY()) {
      this.y += this.speed;
    }

  }
});

gs.assets.treasure = {
  path: './assets/map0.png',
  width: 16,
  height: 16,
  frame: 25
};

var Treasure = enchant.Class.create(BaseChara, {

  initialize: function() {
    var asset = gs.assets.treasure;

    BaseChara.call(this, game, asset);
    this.x = Generator.number(game.width - this.width);
    this.y = Generator.number(game.height - this.height);
    this.on('enterframe', this.run);
  },

  run: function() {

    if (this.intersect(this.parentNode.player)) {
      game.score += (Generator.number(5, 1)) * 10;
      this.remove();
    }
  }
});

var TresureFactory = enchant.Class.create(enchant.Group, {
  initialize: function(player) {
    enchant.Group.call(this);
    this.player = player;
    for (var i = 0; i < 5; i++) {
      this.addChild(new Treasure());
    }
    game.currentScene.addChild(this);
  },

  create: function() {
    this.addChild(new Treasure());
  }
});


var Enemy = enchant.Class.create(BaseChara, {
  initialize: function() {
    var asset = gs.assets.bear;

    BaseChara.call(this, game, asset);
    this.speed = Generator.number(10, 1);
    this.scaleX = -1;
    this.frame = [5, 5, 5, 6, 6, 6, 5, 5, 5, 7, 7, 7];
    this.x = game.width - this.width;
    this.y = Generator.number(game.height - this.height);
    this.on('enterframe', this.run);
  },

  move: function() {
    this.x -= this.speed;
  },

  run: function() {
    this.move();

    if (this.intersect(this.parentNode.player)) {
      game.end(game.score, 'You win ' + game.score);
    }

    if (!this.isRange()) {
      this.remove();
    }

  }
});

var EnemyFactory = enchant.Class.create(enchant.Group, {
  initialize: function(player) {
    enchant.Group.call(this);
    this.player = player;
    for (var i = 0; i < 3; i++) {
      this.addChild(new Enemy());
    }
    game.currentScene.addChild(this);
  },

  create: function() {
    this.addChild(new Enemy());
  }
});



window.onload = function() {
  game = new ECore(gs);
  stage = game.rootScene;
  game.onload = function() {
    game.setStage(gs.assets.background);
    game.setControlPad();

    var player = new Player();
    var tresureFactory = new TresureFactory(player);
    var enemyFactrory = new EnemyFactory(player);

    stage.on('enterframe', function() {
      if (this.age % (game.fps * 0.5) === 0) {
        tresureFactory.create();
        enemyFactrory.create();
        game.score++;
      }
    });

  };

  game.start();
};

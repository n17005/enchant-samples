'use strict';
enchant();                        // enchantライブラリ呼び出し

var gs = (enchant.Class.create({
  initialize: function() {
    this.fps    = 30;                   // 描画スピード(per second)
    this.width  = 320;                  // 画面の幅
    this.height = 320;                  // 画面の高さ
    this.assets = {};                   // ゲームで使用する画像や音声ファイル
  }
}))();
var game, stage; // GameCore,Sceneオブジェクト

// 拡張Core
var MyCore = enchant.Class.create(enchant.nineleap.Core, {
  initialize: function(background) {
    enchant.nineleap.Core.call(this);   // Coreを継承
    this.fps    = gs.fps;               // fpsをセット
    this.width  = gs.width;             // 画面の幅
    this.height = gs.height;            // 画面の高さ
    this.setStage(background);          // 背景のセット(色)
    this.loadAssets(gs.assets);         // アセットの読み込み
  },

  setStage: function(background) {
    stage = this.rootScene;
    stage.backgroundColor = background || 'white';
  },

  // アセットのパスを配列で返す
  loadAssets: function(assets) {
    var keyname = 'path';
    var assetsPathList = [];

    for (var obj in assets) {
      if (assets[obj].hasOwnProperty(keyname)) {
        assetsPathList.push(assets[obj][keyname]);
      }
    }
    if (assetsPathList !== 0) {
      this.preload(assetsPathList);
    }
  }
});


gs.assets.bear = {
  height : 32,
  width  : 32,
  path   : 'assets/chara1.png',
  frame  : [5, 6, 5, 7]
};

var Bear = enchant.Class.create(enchant.Sprite, {
  initialize: function(asset) {
    enchant.Sprite.call(this, asset.width, asset.height);
    this.image  = game.assets[asset.path];
    this.frame  = asset.frame;
    this.scaleX = 1;
    this.speed  = 3;
    this.on('enterframe', this.run);
  },

  run: function() {
    this.move();
    if (this.isOutOfRange()) {
      this.turn();
    }
  },

  move: function() {
    this.x += this.scaleX * this.speed;
  },

  isOutOfRange: function() {
    return (this.x < 0 || this.x > game.width - this.width);
  },

  turn: function() {
    this.scaleX *= -1;
  }

});

//  ==================================================
//  Template create 2014-07-26
//  ==================================================

window.onload = function() {

  game = new MyCore('mintcream');

  game.onload = function() {
    stage.addChild(new Bear(gs.assets.bear));
  };

  game.start();
};

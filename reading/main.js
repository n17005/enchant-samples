/*eslint spaced-comment:0, newline-after-var:0, no-invalid-this:0*/
/*global Pad, ScoreLabel, TimeLabel*/

'use strict';

enchant(); // enchantライブラリ呼び出し

var gs = (enchant.Class.create({
  initialize: function() {
    this.fps = Number(prompt('速度を入れてください (1 - 10)'));
    this.width  = 800; // 画面の幅
    this.height = 600; // 画面の高さ
    this.assets = {}; // ゲームで使用する画像や音声ファイル
  }
}))();
var game, stage; // GameCore,Sceneオブジェクト

// 拡張Core
var MyCore = enchant.Class.create(enchant.nineleap.Core, {
  initialize: function(background) {
    enchant.nineleap.Core.call(this); // Coreを継承
    this.fps    = gs.fps;             // fpsをセット
    this.width  = gs.width;           // 画面の幅
    this.height = gs.height;          // 画面の高さ
    this.setStage(background);        // 背景のセット(色)
    this.loadAssets(gs.assets);       // アセットの読み込み(game.preload)
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

//  ==================================================
//  Template Normal
//  ==================================================

var Paragraph = enchant.Class.create(enchant.Label, {
  initialize: function() {
    enchant.Label.call(this);
    this.font = '32px serif';
    this.height = 32;
    this.width = game.width;
    this.backgroundColor = 'yellow';
    this.words = book.text.split(' ');
  },

  move: function() {
    this.moveTo(
      ~~(Math.random() * (game.width - this.width))
      , ~~(Math.random() * (game.height - this.height))
    );
  },

  onenterframe: function() {
    var word = this.words.shift();
    if (this.words.length === 0) {
      this.text = (
        '分速:'
        + ~~(book.text.length / ((this.age / gs.fps) / 60))
        + '文字'
      );
      this.width = game.width;
      this.moveTo(0, 0);
      game.end();
    }

//    if (word.length > 1){
    this.text = word;
    this.width = word.length * 33;
    this.move();
//    }
  }
});



window.onload = function() {
  game = new MyCore('yellow');
  game.onload = function() {

    // ==================================================================
    stage.addChild(new Paragraph());
    // ==================================================================
  };
  game.start();
};

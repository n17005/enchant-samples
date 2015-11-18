/*eslint spaced-comment:0, newline-after-var:0, no-invalid-this:0*/
/*global ScoreLabel, TimeLabel, Label, Group*/

'use strict';

enchant(); // enchantライブラリ呼び出し

var gs = (enchant.Class.create({
  initialize: function() {
    this.fps = 30; // 描画スピード(per second)
    this.width = 300; // 画面の幅
    this.height = 300; // 画面の高さ
    this.assets = {}; // ゲームで使用する画像や音声ファイル
  }
}))();
var game, stage; // GameCore,Sceneオブジェクト

// 拡張Core
var MyCore = enchant.Class.create(enchant.nineleap.Core, {
  initialize: function(background) {
    enchant.nineleap.Core.call(this); // Coreを継承
    this.fps = gs.fps; // fpsをセット
    this.width = gs.width; // 画面の幅
    this.height = gs.height; // 画面の高さ
    this.setStage(background); // 背景のセット(色)
    this.loadAssets(gs.assets); // アセットの読み込み(game.preload)
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
//  Template create 2015-10-30
//  ==================================================

var Panel = enchant.Class.create(Label, {
  initialize: function(text, x, y) {
    Label.call(this, text);
    this.backgroundColor = 'white';
    this.font = '98px bold monospace';
    this.textAlign = 'center';
    this.width = 98;
    this.height = 98;
    this.x = x || 0;
    this.y = y || 0;
    this.on('touchstart', this.f1);
    this.on('touchend', this.f2);

  },

  f1: function() {
    if (this.parentNode.index == this.text) {
      this.parentNode.index++;
      this.visible = false;
    } else {
      this.backgroundColor = 'red';
    }
  },
  f2: function() {
    this.backgroundColor = 'white';
  }

});


var Panels = enchant.Class.create(enchant.Group, {
  initialize: function() {
    var list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.index = 1;
    enchant.Group.call(this);
    this.create(list);
    this.on('enterframe', function() {
      if (this.index > 9 || this.age > game.fps * 10) {
        game.end();
      }
    });
  },

  create: function(list) {
    var self = this;
    list.forEach(function(id, index) {
      self.addChild(new Panel(id, index % 3 * 100, Math.floor(index / 3) * 100));
    });
  },

  shuffle: function() {
    this.childNodes.forEach(function(panel, index, panels) {
      var random = Math.floor(Math.random() * 9);
      var tmp = panels[index];
      panels[index] = panels[random];
      panels[random] = tmp;
    });
  },

  relocate: function() {
    this.childNodes.forEach(function(panel, index) {
      panel.moveTo(index % 3 * 100, Math.floor(index / 3) * 100);
    });
  },

  run: function() {
    this.shuffle();
    this.relocate();
  }

});

window.onload = function() {
  // ==================================================================
  game = new MyCore('black');
  game.onload = function() {

    var panels = new Panels();
    stage.addChild(panels);
    panels.run();
    
  };
  // ==================================================================
  game.start();
};

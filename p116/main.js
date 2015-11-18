/*eslint spaced-comment:0, newline-after-var:0, no-invalid-this:0*/
/*global Surface*/

'use strict';

enchant(); // enchantライブラリ呼び出し

var gs = (enchant.Class.create({
  initialize: function() {
    this.fps = 30; // 描画スピード(per second)
    this.width = 320; // 画面の幅
    this.height = 320; // 画面の高さ
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

// ==============================================================
//  template enchant normal
// ==============================================================

// Game Pad
var MyPad = enchant.Class.create(enchant.ui.Pad, {
  initialize: function() {
    enchant.ui.Pad.call(this);
    this.x = 0;
    this.y = game.height - gs.assets.bar.height - this.height;
  }
});

var DIRECTION = { // 方向定数
  RIGHT: 1,
  LEFT: -1
};
var ACTION = { // アニメーション定数
  WAIT: [10],
  WALK: [10, 11, 10, 12],
  JUMP: [11]
};
var STATUS = { // 状態定数
  WAIT: 0,
  WALK: 1,
  JUMP: 2
};

gs.assets.bear = { // クマのアセット
  height: 32,
  width: 32,
  path: 'assets/chara1.png'
};

var Bear = enchant.Class.create(enchant.Sprite, {
  initialize: function() {
    var asset = gs.assets.bear;
    enchant.Sprite.call(this, asset.width, asset.height);
    this.image = game.assets[asset.path];
    this.speed = 3;
    this.moveInitial();
    this.wait();
    this.on('enterframe', this.move);
  },

  moveInitial: function() {
    this.moveTo(~~((game.width - this.width) / 2)
      , game.height - gs.assets.bar.height - this.height);
  },

  walk: function(direction) {
    this.scaleX = direction;
    this.x += (direction * this.speed);
    if (this.status === STATUS.WAIT) {
      this.status = STATUS.WALK;
      this.frame = ACTION.WALK;
    }
  },

  wait: function() {
    this.status = STATUS.WAIT;
    this.frame = ACTION.WAIT;
  },

  readyJump: function() {
    this.status = STATUS.JUMP;
    this.frame = ACTION.JUMP;
    this.age = 0;
  },

  jump: function() {
    var distance = 8;
    var jumpTime = 8;
    if (this.age < jumpTime) {
      this.y -= distance;
    } else if (this.age < (jumpTime * 2) - 1) {
      this.y += distance;
    } else {
      this.wait();
    }
  },

  run: function() {
    this.move();
  },

  move: function() {
    if (game.input.right) {
      this.walk(DIRECTION.RIGHT);
    }
    if (game.input.left) {
      this.walk(DIRECTION.LEFT);
    }
    if (game.input.down) {
      this.wait();
    }
    if (this.status === STATUS.JUMP) {
      this.jump();
    } else if (game.input.up) {
      this.readyJump();
    }
  }
});

gs.assets.bar = {
  height: 16,
  width:  16,
  sx:     16 * 7,
  sy:     0,
  path:   'assets/map0.png'
};

var Bar = enchant.Class.create(enchant.Sprite, {
  initialize: function() {
    enchant.Sprite.call(this, game.width, game.height);
    this.image = this.createbackground();
  },
  createbackground: function() {
    var surface = new Surface(this.width, this.height);
    var tip = gs.assets.bar;
    for (var x = 0; x < game.width; x += tip.width) {
      surface.draw(
        game.assets[tip.path]
        , tip.sx, tip.sy
        , tip.width, tip.height
        , x, (game.height - tip.height)
        , tip.width, tip.height
      );
    }
    return surface;
  }
});

window.onload = function() {
  game = new MyCore('mintcream');
  game.onload = function() {

    stage.addChild(new Bar()); // 背景の設定
    stage.addChild(new MyPad());
    stage.addChild(new Bear());

  };
  game.start();
};

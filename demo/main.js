/*
 global enchant, GS, BaseChara, ECore, Generator
*/

'use strict';

enchant(); // enchantライブラリ呼び出し

var game, stage; // GameCore,Sceneオブジェクト
var gs = new GS({
  fps: 30,
  height: 320,
  width: 320,
  assets: {}
});



//  ==================================================
//  Template create 2015-10-30
//  ==================================================

gs.assets.background1 = {
  path: './assets/avatarBg1.png'
};
gs.assets.background2 = {
  path: './assets/avatarBg2.png'
};
gs.assets.background3 = {
  path: './assets/avatarBg3.png'
};

var AvatarBGDemo = enchant.Class.create(enchant.avatar.AvatarBG, {
  initialize: function() {
    enchant.avatar.AvatarBG.call(this, Generator.number(3));
    this.age = 0;
    this.y = 40;
    this.on('enterframe', this.run);
    game.currentScene.addChild(this);
  },
  run: function() {
    this.scroll(this.age * 2);
  }
});

gs.assets.dragon = {
  path: './assets/bigmonster1.gif'
};
gs.assets.minotaur = {
  path: './assets/bigmonster2.gif'
};
gs.assets.monster1 = {
  path: './assets/monster1.gif'
};
gs.assets.monster2 = {
  path: './assets/monster2.gif'
};
gs.assets.monster3 = {
  path: './assets/monster3.gif'
};
gs.assets.monster4 = {
  path: './assets/monster4.gif'
};
gs.assets.monster5 = {
  path: './assets/monster5.gif'
};
gs.assets.monster6 = {
  path: './assets/monster6.gif'
};
gs.assets.monster7 = {
  path: './assets/monster7.gif'
};


var AvatarMonsterDemo = enchant.Class.create(enchant.avatar.AvatarMonster, {
  initialize: function(x, y) {
    enchant.avatar.AvatarMonster.call(this, game.assets[this.getRandomMonster()]);
    this.x = x || 0;
    this.y = y || 0;
    this.age = 0;
    game.currentScene.addChild(this);
    this.getRandomMonster();
  },

  getRandomMonster: function() {
    var monsters = ['dragon', 'minotaur', 'monster1', 'monster2'
    , 'monster3', 'monster4', 'monster5', 'monster6', 'monster7'];

    return gs.assets[monsters[Generator.number(monsters.length)]].path;
  }
});

var AvatarDemo = enchant.Class.create(enchant.avatar.Avatar, {
  initialize: function(x, y) {
    var code = '2:1:1:2004:21230:22480';

    enchant.avatar.Avatar.call(this, code);
    this.x = x || 0;
    this.y = y || 0;
    this.age = 0;
    this.action = 'demo';
    game.currentScene.addChild(this);
  }
});


window.onload = function() {
  game = new ECore(gs);
  stage = game.rootScene;
  game.onload = function() {
    game.setStage('yellow');
    game.setControlPad();
    new AvatarBGDemo();
    new AvatarDemo(70, 110);
    new AvatarMonsterDemo(140, 100);
  };

  game.start();
};

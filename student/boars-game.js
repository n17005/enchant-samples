'use strict';

enchant();
var CHARA_IMAGE = "./chara2.gif";
var game;

var Boar = Class.create(Sprite,{
  initialize:function(){
    Sprite.call(this,32,32);
    this.x = random(game.width - this.width);
    this.y = random(game.height - this.height);
    this.image = game.assets[CHARA_IMAGE];
    game.currentScene.addChild(this);

    function random(num) {
      return ~~(Math.random() * num);
    }

  },
  remove:function(){
    this.parentNode.removeChild(this);
  },
  hits:function() {
    game.hits++;
  },
  ontouchstart:function(){
    this.hits();
    this.remove();
  }
});

var Boars = Class.create({
  initialize:function(){
    this.max = 5 -1;
    this.boars = [];
    this.createBoars();
  },
  createBoars :function() {
    var random = ~~(Math.random() * this.max + 1);
    for (var i = 0; i < random; i++) {
      this.boars.push(new Boar);
    };
  }
});

window.onload = function() {

  game = new Game();
  game.preload(CHARA_IMAGE);  //画像を読み込み
  game.hits = 0;

  var scene = game.rootScene; 
  scene.backgroundColor = "black"; //背景色

  game.onload = function() {
    var boars = new Boars();
    
    scene.addEventListener('enterframe',function() {

      if (isEnd()) {
        game.end();
      }

      function isEnd(){
        return (game.hits === boars.boars.length);
      }
    });

  };

  game.start();

};

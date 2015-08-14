enchant();
var gsettings = {width:320,height:320,fps:30};

// @require misc.js(gassets)
gassets.treasure = {image:"../images/map0.png",width:16,height:16,frame:25};
var Treasure = enchant.Class.create(BaseChara, {

  initialize: function() {
    BaseChara.call(this,gassets.treasure);
    this.x = Generator.number(gsettings.width - this.width);
    this.y = Generator.number(gsettings.height - this.height);
  }

  ,onenterframe:function(){
    if (this.isCollision(player)){
      game.score += (Generator.number(5,1)) * 10;
      this.remove();
    }

    if (this.isCollision(enemies))
      this.remove();
  }
});

gassets.bear = {image:"../images/chara1.png",width:32,height:32,frame:5};
var Bear = Class.create(BaseChara, {
  initialize: function() {
    BaseChara.call(this,gassets.bear);
  }
});

var Player = Class.create(Bear,{

  initialize:function(){
    Bear.call(this);
    this.speed = 3;
    this.frame = 4;
    this.x = (gsettings.width - this.width) / 2;
    this.y = (gsettings.height + this.height) / 2;
  }

  ,onenterframe:function(){
    if (game.input.up){
      this.y -= this.speed;
    }
    if (game.input.down){
      this.y += this.speed;
    }
    if (game.input.right){
      this.x += this.speed;
      this.right();
    }
    if (game.input.left){
      this.x -= this.speed;
      this.left();
    }
  }
}); 

var Enemy = Class.create(Bear,{
  initialize:function(){
    Bear.call(this);
    //    this.speed = 1 + (Math.floor(game.frame / 100)); 
    this.speed =  Generator.number(10,1);
    this.scaleX = -1;
    this.frame = [5,5,5,6,6,6,5,5,5,7,7,7];
    this.x = gsettings.width - this.width;
    this.y = Generator.number(gsettings.height - this.height);
  }
  ,onenterframe: function(){
    this.x -= this.speed;
    if (!this.isRange()){
      this.remove();
    }
    if (this.isCollision(player))
      game.end(game.score,"You win " + game.score);
  }
}); 

window.onload = function() {
  game = new Game(gsettings.width, gsettings.height);
  game.fps = gsettings.fps;
  game.preload(gassets.loadImages());

  game.rootScene.backgroundColor="yellow";
  game.score = 0;

  game.onload = function() {
    pad = new CrossKey();
    scoreboard = new ScoreBoard();
    player = new Player();

    treasures = [];
    for (var i = 0; i < 5; i++)
      treasures.push(new Treasure());

    enemies = [];
    game.rootScene.on('enterframe', function() {
      if (this.age % (gsettings.fps * 0.5) === 0){
        enemies.push(new Enemy());
        treasures.push(new Treasure());
        game.score++;
      }
    });

  };
  game.start();
};


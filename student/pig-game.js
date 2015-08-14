enchant();
pig = Class.create(Sprite,{ // Spriteクラスを継承
initialize:function(x,y){ //初期化する
Sprite.call(this,16,16); //Spriteオブジェクトを初期化
this.image = game.assets['http://jsrun.it/assets/z/0/M/1/z0M1i.gif'];
this.vx = Math.floor( Math.random()*8+1);
this.vy = Math.floor( Math.random()*8+1);
this.speed = 1;
this.frame= 23;
game.rootScene.addChild(this);
},
onenterframe: function() {
// 更新処理
this.update();
},
update: function() {
  this.x += this.vx * this.speed;
  this.y += this.vy * this.speed;
// 画面外に出ないようにする
this.control();
},
	// 画面からはみ出ないようにする
  control: function() {
   var left   = 0;
   var right  = game.width-this.width;
   var top    = 0;
   var bottom = game.height-this.height;
   if (this.x < left) {
    this.x = left; this.vx *= -1; this.scaleX *= -1;
  }
  if (this.x > right) {
    this.x = right; this.vx *= -1; this.scaleX *= -1;
  }
  if (this.y < top) {
    this.y = left; this.vy *= -1;
  }
  if (this.y > bottom) {
    this.y = right; this.vy *= -1;
  }
}
});
window.onload=function(){
	game = new Game();
	game.preload('http://jsrun.it/assets/a/T/a/K/aTaKJ.gif',//熊
			'http://jsrun.it/assets/z/0/M/1/z0M1i.gif');//敵
  game.onload = function(){
   var scene = game.rootScene;
			scene.backgroundColor = "green";//背景
			//熊移動
			var sprite = new Sprite(32, 32);
			sprite.moveTo(150, 150);
			sprite.image = game.assets['http://jsrun.it/assets/a/T/a/K/aTaKJ.gif'];
			scene.addChild(sprite);
			var SPEED = 10; //熊のスピード
			var MOVE_RANGE_X = game.width - sprite.width;
			var MOVE_RANGE_Y = game.height - sprite.height;
			//砂川作成
			pig1 =new pig(0,0);
			pig1.addEventListener('enterframe',function(){
       if(this.intersect(sprite))
         game.end();
     });
			pig2 =new pig(0,0);
			pig2.addEventListener('enterframe',function(){
       if(this.intersect(sprite))
         game.end();
     });
			pig3 =new pig(0,0);
			pig3.addEventListener('enterframe',function(){
       if(this.intersect(sprite))
         game.end();
     });
			pig4 =new pig(0,0);
			pig4.addEventListener('enterframe',function(){
       if(this.intersect(sprite))
         game.end();
     });
			pig5 =new pig(0,0);
			pig5.addEventListener('enterframe',function(){
       if(this.intersect(sprite))
         game.end();
     });
			// タイム追加
			timerLabel = new Label();
			timerLabel.moveTo(10, 10);
			timerLabel.text = "Time : 00";
			timerLabel.color = "black";
			scene.addChild(timerLabel);
			sprite.onenterframe = function() {
				var input = game.input;
				if (input.left)  { this.x -= SPEED; }
				if (input.right) { this.x += SPEED; }
				if (input.up)    { this.y -= SPEED; }
				if (input.down)  { this.y += SPEED; }
				// 移動可能な範囲を制御
				var left   = 0;
				var right  = MOVE_RANGE_X;
				var top    = 0;
				var bottom = MOVE_RANGE_Y;
				// X軸
				if (this.x < left)		{ this.x = left; }
				else if (this.x > right)	{ this.x = right; }
				// Y軸
				if (this.y < top)		{ this.y = top; }
				else if (this.y > bottom)	{ this.y = bottom; }
				// タイム表示更新
				timerLabel.text = "Time : " + Math.floor( game.frame/game.fps );
			};
		};
   game.start();
 };

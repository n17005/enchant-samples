enchant();							// enchantライブラリ呼び出し
var game,stages;					// GameCore,SceneGroupオブジェクト 

var gs = {fps:15};					// Gameのfps
gs.canvas = {height:320,width:320};	// Windowの高さ，幅

// 拡張Core
var eCore = enchant.Class.create(enchant.nineleap.Core,{
	initialize:function(color){	// コンストラクタ
		enchant.nineleap.Core.call(this,gs.canvas.width,gs.canvas.height);
		this.fps = gs.fps;
		this.rootScene.backgroundColor = color || "white";
	}
});

//	==================================================
//	Template for enchant.js Normal version
//	==================================================

var randomLabel = enchant.Class.create(enchant.Label,{
	initialize:function(){
		enchant.Label.call(this);
		this.font = "20px monospace";
		this.text = this.randomNumber() + "点";
		this.color = this.randomColor();
		this.moveRandomPosition();
		game.currentScene.addChild(this);
	},
	random:function(num){
		return Math.floor(Math.random() * num);
	},
	randomNumber:function(){
		var max = 100;
		return this.random(max);
	},
	randomColor:function(){
		var color = 256;
		return [
			"rgb("
			,[this.random(color),this.random(color),this.random(color)]
			,")"
		].join("");
	},
	moveRandomPosition:function(){
		var position = this.randomPosition();
		this.moveTo(position.x,position.y);
	},
	randomPosition:function(){
		return {
			x:this.random(gs.canvas.width)
			,y:this.random(gs.canvas.height)
		};
	},
	remove:function(){
		this.scene.removeChild(this);
	},
	onenterframe:function(){
		this.y--;
		if(this.age > 10) this.remove(); 
	}
});

window.onload = function(){
	game  = new eCore("mintcream");
	stage = game.rootScene;

	game.onload = function(){
		stage.on("enterframe",function(){
			if (game.frame > 1000) game.end();
			if (!(game.frame % 3)) 
				this.addChild(new randomLabel());
		});
	};

	game.start();
};
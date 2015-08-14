enchant();							// enchantライブラリ呼び出し
var game,stage;					// GameCore,SceneGroupオブジェクト 

var gs = {fps:15};					// Gameのfps
gs.canvas = {height:320,width:320};	// Windowの高さ，幅
gs.assets = {};						// アセット格納オブジェクト
// 全アセットのパスを配列で返す game.preload(gs.assets.loadAssets)
gs.assets.loadAssets = function(){	
	var keyname = "path";
	var assetsPathList = [];
	for (var obj in this){
		if (this[obj].hasOwnProperty(keyname))
			assetsPathList.push(this[obj][keyname]);
	}
	return assetsPathList;
}

// 拡張Core
var eCore = enchant.Class.create(enchant.nineleap.Core,{
	initialize:function(color){	// コンストラクタ
		enchant.nineleap.Core.call(this,gs.canvas.width,gs.canvas.height);
		this.fps = gs.fps;
		this.rootScene.backgroundColor = color || "white";
		// アセットの読み込み
		var gassets = gs.assets.loadAssets();
		if(gassets.length !== 0) this.preload(gassets);
	}
});

var DIRECTION = {
	RIGHT:1
	,LEFT:-1
};

gs.assets.bear={
	height:32
	,width:32
	,path:"images/charactor/chara1.png"
	,frame:[5,6,5,7]
};
var Bear = enchant.Class.create(enchant.Sprite,{
	initialize:function(){
		var asset = gs.assets.bear;
		enchant.Sprite.call(this,asset.width,asset.height);
		this.image = game.assets[asset.path];
		this.frame = asset.frame;
		this.direction = DIRECTION.RIGHT;
		this.speed = 3;
	},
	turn:function(direction){
		this.scaleX = direction;
		this.direction = direction;
	},
	walk:function(){
		this.x += this.direction * this.speed;
	},
	onenterframe:function(){
		if(this.x > gs.canvas.width - this.width) 
			this.turn(DIRECTION.LEFT);
		if(this.x < 0) 
			this.turn(DIRECTION.RIGHT);
		this.walk();
	}
});

//	==================================================
//	Template create 2014-07-26
//	==================================================

window.onload = function(){
	game   = new eCore("mintcream");
	stage = game.rootScene;

	game.onload = function(){
		stage.addChild(new Bear());
	};

	game.start();
};

enchant();							// enchantライブラリ呼び出し
var game,stage;						// GameCore,Scene オブジェクト 

var gs = {fps:30};					// Gameのfps
gs.canvas = {height:384,width:384};	// Windowの高さ，幅
gs.assets = {};						// アセット格納オブジェクト
// 全アセットのパスを配列で返す game.preload(gs.assets.loadAssets)
gs.assets.loadAssets = function(){	
	var keyname = "path";
	var assetsPathList = [];
	for (obj in this)
		if (this[obj].hasOwnProperty(keyname))
			assetsPathList.push(this[obj][keyname]);
	return assetsPathList;
}

// 拡張Core
var eCore = enchant.Class.create(enchant.nineleap.Core,{
	initialize:function(color){	// コンストラクタ
		enchant.nineleap.Core.call(this,gs.canvas.width,gs.canvas.height);
		this.fps = gs.fps;
		this.rootScene.backgroundColor = color || "white";
		// アセットの読み込み
		var assets = gs.assets.loadAssets();
		if(assets.length !== 0)
			this.preload(assets);
	}
});

//背景画像
gs.assets.bg = { 
	height:384
	,width:384
	,path :"./images/numbers.png"
};

var TitleScene = enchant.Class.create(enchant.Scene,{
	initialize:function(){
		enchant.Scene.call(this);
 		if (gs.assets.bg) { 
			this.addChild(this.setbackground(gs.assets.bg));
 		}
 		game.popScene();
	}
	,setbackground:function(asset){
		var bg = new Sprite(asset.width,asset.height);
		bg.image = game.assets[asset.path];
		bg.moveTo(
			~~(gs.canvas.width - asset.width) / 2
			, ~~(gs.canvas.height - asset.height) / 2);
		return bg;
	}
	,ontouchend:function(){
		game.removeScene(this);
	}
});


/*

*/

var Numbers = enchant.Class.create({
	initialize:function(){
		this._numbers = [1,2,3,4,5,6,7,8,9];
		this._lists = [];
		this.listinit();
		this.randomize();
		this.show();
	}
	,listinit:function(){
		for (var i = 0; i < this._numbers.length; i++) {
			var tmpNumber = new Number(this._numbers[i]);
			tmpNumber.frame = i;
			this._lists.push(tmpNumber);
		}
	}
	,randomize:function(){
		for (var i = 0; i <this._lists.length; i++){
			var random = Math.floor(Math.random()*9);
			var temp = this._lists[i];
			this._lists[i] = this._lists[random];
			this._lists[random] = temp;
		}
	}
	,show:function(){
		for (var i = 0; i < this._lists.length; i++) {
			this._lists[i].moveTo(
				(i % 3) * gs.assets.number.width
				, ~~(i / 3) * gs.assets.number.height);
			game.currentScene.addChild(this._lists[i]);
		}
	}
});

gs.assets.number = {
	height:128
	,width:128
	,path:"./images/numbers.png"
};

var Number = enchant.Class.create(enchant.Sprite,{
	initialize:function(id){
		enchant.Sprite.call(this
			,gs.assets.number.width,gs.assets.number.height);
		this.id = id;
		this.image = game.assets[gs.assets.number.path];
	},
	ontouchend:function(){

	}
});

window.onload = function(){
  game  = new eCore();
  stage = new Group();
  
  game.onload = function(){

 	var numbers = new Numbers();
 	game.pushScene(new TitleScene());

  };
  game.start();
};

//背景画像
gs.assets.bg = { 
	height:384
	,width:384
	,path :"./images/numbers.png"
};

var TitleScene = enchant.Class.create(enchant.Scene,{
	initialize:function(){
		enchant.Scene.call(this);
 		if (gs.assets.bg) { 
			this.addChild(this.setbackground(gs.assets.bg));
 		}
 		game.popScene();
	}
	,setbackground:function(asset){
		var bg = new Sprite(asset.width,asset.height);
		bg.image = game.assets[asset.path];
		bg.moveTo(
			~~(gs.canvas.width - asset.width) / 2
			, ~~(gs.canvas.height - asset.height) / 2);
		return bg;
	}
	,ontouchend:function(){
		game.removeScene(this);
	}
});


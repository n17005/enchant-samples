enchant();							// enchantライブラリ呼び出し
var game,stage;						// GameCore,Scene オブジェクト 

var gs = {fps:15};					// Gameのfps
gs.canvas = {height:320,width:320};	// Windowの高さ，幅
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

// Pad用アセット
gs.assets.pad  = {path:"./pad.png"};
gs.assets.apad = {path:"./apad.png"};
gs.assets.font0 = {path:"./font0.png"};
gs.assets.icon0 = {path:"./icon0.png"};

// Game Pad
var ePad = enchant.Class.create(enchant.ui.Pad,{
	initialize:function(){
		enchant.ui.Pad.call(this);
		this.x = 0;
		this.y = gs.canvas.height - gs.assets.bar.height -this.height;
	}
});

//背景画像
gs.assets.bg = { 
	height:225
	,width:225
	,path :"./images/mikubg.jpg"
};

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
	},
	setbackground:function(){			// 背景の設定 game.onload後に
		if (gs.assets.bg) { 
			var bg = new Sprite(gs.assets.bg.width,gs.assets.bg.height);
			bg.image = this.assets[gs.assets.bg.path];
			//センタリング
			bg.moveTo(~~(gs.canvas.width - gs.assets.bg.width)/2
				, ~~(gs.canvas.height - gs.assets.bg.height)/2);
			this.currentScene.addChild(bg);
		}
	}
});

// ==============================================================
//	template enchant sample
// ==============================================================


var DIRECTION = {    // 方向定数
	RIGHT:1,LEFT:-1
};
var ACTION = {       // アニメーション定数
	WAIT:[10],WALK:[10,11,10,12],JUMP:[11]
};
var STATUS = {       // 状態定数
	WAIT:0,WALK:1,JUMP:2
};

gs.assets.bear = {   // クマのアセット
	height:32
	,width:32
	,path:"images/chara1.png"
};

var eBear = enchant.Class.create(enchant.Sprite,{
	initialize:function(){
		enchant.Sprite.call(this,gs.assets.bear.width,gs.assets.bear.height);
		this.image = game.assets[gs.assets.bear.path];
		this.speed = 3;
		this.moveInitial();
		this.wait();
	} 
	,moveInitial:function(){
		this.moveTo(
			~~((gs.canvas.width - this.width) / 2)
			,gs.canvas.height - gs.assets.bar.height - this.height
			);
	} 
	,walk:function(direction){
		this.scaleX = direction;
		this.x += (direction * this.speed);
		if (this.status === STATUS.WAIT){
			this.status = STATUS.WALK;
			this.frame = ACTION.WALK;
		}
	}
	,wait:function(){
		this.status = STATUS.WAIT;
		this.frame = ACTION.WAIT;
	}
	,readyJump:function(){
		this.status = STATUS.JUMP;
		this.frame = ACTION.JUMP;
		this.age = 0;
	}
	,jump:function(){
		var distance = 8;
		var jump_time = 8;
		if (this.age < jump_time) this.y -= distance;
		else if (this.age < (jump_time * 2) -1) this.y += distance;
		else this.wait();
	}
	,onenterframe:function(){
		if (game.input.right) this.walk(DIRECTION.RIGHT);
		if (game.input.left)  this.walk(DIRECTION.LEFT);
		if (game.input.down)  this.wait();

		if (this.status === STATUS.JUMP) this.jump();
		else if (game.input.up) this.readyJump();
	}
});

gs.assets.bar = {
	height:16
	,width:16
	,sx:16*7
	,sy:0
	,path:"images/map0.png"
};

var Bar = enchant.Class.create(enchant.Sprite,{
	initialize:function(){
		enchant.Sprite.call(this,gs.canvas.width,gs.canvas.height);
		this.image = this.createbackground();		
	},
	createbackground:function(){
		var surface = new Surface(this.width,this.height);
		var tip = gs.assets.bar;
		for (var x = 0; x < gs.canvas.width; x += tip.width){
			surface.draw(
				game.assets[tip.path]
				,tip.sx,tip.sy
				,tip.width,tip.height
				,x,(gs.canvas.height - tip.height)
				,tip.width,tip.height
			);
		}
		return surface;
	}
});
window.onload = function(){
  game = new eCore("rgb(0,200,255)");
  stage = game.rootScene;
  game.onload = function(){

	stage.addChild(new Bar()); 	// 背景の設定
  	stage.addChild(new ePad());
  	stage.addChild(new eBear());

  };
  game.start();
};

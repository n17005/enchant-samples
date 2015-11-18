enchant();							// enchantライブラリ呼び出し
var game,stages;					// GameCore,SceneGroupオブジェクト 

var gs = {};					// Gameのfps
gs.fps = Number(prompt("速度を入れてください (1 - 10)"));
gs.canvas = {height:800,width:600};	// Windowの高さ，幅
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
//	==================================================
//	Template create 2014-07-26
//	==================================================

var Paragraph = Class.create(Label,{
	initialize:function(){
		Label.call(this);
		this.font = "32px serif";
		this.height= 32;
		this.width = gs.canvas.width;
		this.backgroundColor = 'yellow';
		this.words = book.text.split(" ");
	},
	move:function(){
		this.moveTo(
			~~(Math.random() * (gs.canvas.width - this.width))
			, ~~(Math.random() * (gs.canvas.height - this.height))
		);
	},
	onenterframe:function(){
		var word = this.words.shift();
		if(this.words.length === 0) {
			this.text = (
				"分速:" 
				+ ~~(book.text.length / ((this.age /gs.fps) / 60))
				+ "文字"
			);
			this.width = gs.canvas.width;
			this.moveTo(0,0);
			game.end();
		}

//		if (word.length > 1){
			this.text = word;
			this.width = word.length * 33;
			this.move();
//		}
	}
});


window.onload = function() {
	game   = new eCore("mintcream");
	stages = game.rootScene;

	game.onload = function(){
		stages.addChild(new Paragraph());
	};

	game.start();
};

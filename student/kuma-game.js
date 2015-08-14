enchant();

var CHARA_IMAGE_NAME = "http://enchantjs.com/assets/images/chara1.gif"
,GAME_LIMIT_TIME = 30
,KUMA_SCORE = 10
,game,scene
;

// 敵クラス
var KumaSprite = Class.create(Sprite, {
	initialize: function() {
		Sprite.call(this, 32, 32);
		this.image = game.assets[CHARA_IMAGE_NAME];
		this.x = ~~(Math.random() * (game.width - this.width));
		this.y = ~~(Math.random() * (game.height - this.height));
		this.setVector();
		game.currentScene.addChild(this);
	},
	// 動きの向きを決める変数をセット
	setVector: function() {
		var deg = ~~(Math.random() * 360 * Math.PI/180);
		this.vx = Math.cos(deg) * 4;
		this.vy = Math.sin(deg) * 4;
	},
	// 現在位置から方向変数向きに動く
	move:function() { // TODO 判定用メソッド実装すべし
		this.moveBy(this.vx , this.vy);
		// 画面外に移動した時の処理
		var left = 0;
		var top = 0;
		var right = game.width - this.width;
		var bottom = game.height - this.height;
		if (this.x < left)   { this.x = left;   this.vx*=-1; }
		if (this.x > right)  { this.x = right;  this.vx*=-1; }
		if (this.y < top)    { this.y = top;    this.vy*=-1; }
		if (this.y > bottom) { this.y = bottom; this.vy*=-1; }
	},
	// 自分自身を削除
	remove:function() {
		this.parentNode.removeChild(this);
	},
	// 
	onenterframe: function() {
		this.move();
		if(game.timer === 0) { // タイムアップしたら，削除
			this.remove();
		}
	},
	// タッチされたら得点を加算し，削除
	ontouchstart: function() {
		game.score += KUMA_SCORE;
		this.remove();
	}
});
// 敵集合クラス
var Enemies = Class.create({
	initialize:function(){
		this.enemies = [];
		this.length = 16;
		this.createEnemies();
	},
	createEnemies:function(){
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this.enemies.push(new KumaSprite());
		};
	}
});
// ベースとなるラベル
var eLabel = Class.create(Label,{
	initialize:function(){
		Label.call(this);
		this.color = 'white';
		this.font = "Bold 16px 'Con solas','Monaco','MS ゴシック'";
		scene.addChild(this);
	}
});
// 得点を表示するラベル
var ScoreLabel = Class.create(eLabel,{
	initialize:function(){
		eLabel.call(this);
		this.text = this.prefix = 'Score: ';
		this.moveTo(10, 10);
	},
	onenterframe:function(){ // フレームごとにスコアを書き換え
		this.text = this.prefix + game.score;
	}
});
// 残り時間を表示するラベル
var TimerLabel = Class.create(eLabel,{
	initialize:function(){
		eLabel.call(this);
		this.text = this.prefix = 'Time: ';
		this.moveTo(250, 10);
	},
	onenterframe:function(){
		this.text = this.prefix + game.timer;
		if (game.timer === 10) { //残り時間が10秒になったら
			this.color = 'red';
		}
	}
});

window.onload = function() {
	game = new Game();
	game.preload(CHARA_IMAGE_NAME);
	game.fps = 30;
	game.frame = 0;
	game.score = 0;
	game.timer = GAME_LIMIT_TIME;

	scene = game.rootScene;
	scene.backgroundColor = 'black';
	game.onload = function() {
		new ScoreLabel(); // スコアラベルの作成
		new TimerLabel(); // タイムラベルの作成
		new Enemies();    // 敵集合クラスの作成
		
		scene.addEventListener('enterframe',function() {
	
			// タイムアップ(GameOver)処理
			if (isEnd()) { // TODO EndingSceneの作成
				game.replaceScene(new Scene());
			}
			
			countDown();
			
			function countDown(){
				if (game.frame % game.fps === 0){
					game.time--;
				}
			}
			
			// ゲーム終了判定
			function isEnd(){
				return (game.time < 0);
			}
		});
	};
	game.start();
};

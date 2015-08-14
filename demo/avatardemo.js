enchant();
var gsettings = {width:320,height:320,fps:30};

window.onload = function() {
  game = new Core(gsettings.width, gsettings.height);
  game.fps = gsettings.fps;
  game.score = 0;
  game.preload(eavatar.loadImages());
  game.rootScene.backgroundColor = Generator.color();

  game.onload = function() {

	var pad = new CrossKey();
        var scoreboard = new ScoreBoard();
        var background = new eAvatarBGDemo(Generator.number(eavatar.background.images.length));
        var player = new eAvatarDemo("2:1:1:2004:21230:22480",70,110);
        var monster = new eAvatarMonsterDemo(eavatar.monster.getRandom(),130,100);

  };

  game.start();
};


/**
    // CrossKey()
    @extends enchant.ui.pad

    @description 十字キー
    @usage var pad = new CrossKey(); 

    // eAvatarBG(stage)
    @extends AvatarBG -> enchant.Group
    @description 背景
    @param stage [background.desert(砂漠),background.field(平野)
                ,background.dungeon(洞窟),background.lake(湖)]
    @method stop(),scroll(speed)
    @usage var bg = new eAvatarBG(background.desert);

    // eAvatar(code,[x,y])
    @extends Avatar->AvatarCharacter->Sprite
    @description アバター
    @param code 性別[1,2]:髪型[1-10]:髪の色[0-5]:武器[]:鎧[]:髪飾り[]
    @url http://9leap.net/games/1383
    @method left(),right()
    @prop action = stop | run | attack | special | damage | dead
    @usage var player = new eAvatar("2:1:1:2004:21230:22480",50,50);

    // eAvatarMonster(image,[x,y]) 
    @extends AvatarMonster->AvatarCharacter->Sprite
    @description モンスター
    @param image
    @prop action = stop | walk | appear | disappear | attack
    @usage var monster = new eAvatarMonster(eavatar.monster.monster2,100,100);

    // sprite method
    intersect(entity) rotate(degree) scale(x,y) within(entity,distance) moveBy(vx,vy) moveTo(x,y)
*/


/*eslint spaced-comment:0, newline-after-var:0, no-invalid-this:0*/
/*global Core*/

'use strict';

enchant();

var gs = {
  height: 320,
  width: 320,
  fps: 15
};
var game, stage;

// Random Generator
var Generator = (function() {
  function Generator() {}

  Generator.number = function(range, offset) {
    var result = Math.floor(Math.random() * range);
    return offset ? result + offset : result;
  };

  Generator.color = function() {
    var color = 255;
    return [
      'rgb(', [this.number(color), this.number(color), this.number(color)], ')'
    ].join('');
  };

  Generator.position = function(x, y) {
    return {
      x: this.number(x),
      y: this.number(y)
    };
  };

  return Generator;
}());


//  ==================================================
//  Template create 2014-07-26
//  ==================================================

var TYPE = {
  LINE: 0,
  RECT: 1,
  CIRCLE: 2
};
var STYLE = {
  STROKE: 0,
  FILL: 1
};

var Shape = enchant.Class.create(enchant.Surface, {
  initialize: function(width, height, color, style) {
    enchant.Surface.call(this, width, height);
    this.color = color || Generator.color();
    this.style = style || STYLE.STROKE;
  },

  beginPath: function() {
    this.context.beginPath();
  },

  drawPath: function() {
    //abstract
  },

  stroke: function() {
    this.context.strokeStyle = this.color;
    this.context.stroke();
  },

  fill: function() {
    this.context.fillStyle = this.color;
    this.context.fill();
  },

  draw: function() {
    this.beginPath();
    this.drawPath();
    if (this.style === STYLE.STROKE) {
      this.stroke();
    } else if (this.style === STYLE.FILL) {
      this.fill();
    }
  }

});

var Line = enchant.Class.create(Shape, {
  initialize: function(width, height, color, path) {
    Shape.call(this, width, height, color);
    this.path = path || {
      start: {x:  0, y: 25}
      , end: {x: 50, y: 25}
    };
  },
  drawPath: function() {
    this.context.moveTo(this.path.start.x, this.path.start.y);
    this.context.lineTo(this.path.end.x, this.path.end.y);
  }
});

var Rect = enchant.Class.create(Shape, {
  initialize: function(width, height, color, style, start, range) {
    Shape.call(this, width, height, color, style);
    this.start = start || {x: 0, y: 0};
    this.range = range || {
      width: 50,
      height: 50
    };
  },
  drawPath: function() {
    this.context.rect(
      this.start.x, this.start.y, this.range.width, this.range.height);
  }
});

var Circle = enchant.Class.create(Shape, {
  initialize: function(width, height, color, style, radius, position) {
    Shape.call(this, width, height, color, style);
    this.radius = radius || 20;
    this.position = position || {x: 25, y: 25};
    this.angle = {start: 0, end: Math.PI * 2};
    this.anticlockwise = true;
  },
  drawPath: function() {
    this.context.arc(this.position.x, this.position.y, this.radius
      , this.angle.start, this.angle.end, this.anticlockwise);
  }
});

var ShapeBuilder = enchant.Class.create(enchant.Sprite, {
  initialize: function() {
    enchant.Sprite.call(this, 50, 50);
    this.build(this.width, this.height);
    this.image.draw();
    this.moveTo(Generator.number(220), Generator.number(220));
    this.on('enterframe', this.run);
  },

  build: function(width, height) {
    var color = Generator.color();

    switch (Generator.number(3)) {
      case TYPE.LINE:
        this.image = new Line(width, height, color);
        break;
      case TYPE.RECT:
        this.image = new Rect(width, height, color, Generator.number(2));
        break;
      case TYPE.CIRCLE:
        this.image = new Circle(width, height, color, Generator.number(2));
        break;
      default:
        break;
    }
  },

  remove: function() {
    this.scene.removeChild(this);
  },

  run: function() {
    if (this.age / gs.fps > 1) {
      this.remove();
    }

    this.scale(1.1, 1.1);
    this.rotate(-36);
  }
});


window.onload = function() {
  game = new Core(gs.width,gs.height);
  stage = game.rootScene;

  game.onload = function() {
    stage.on('enterframe', function() {
      if (this.age % 3 === 0) {
        this.addChild(new ShapeBuilder());
      }
    });
  };

  game.start();
};

(function($) {
  $(function() {
    var canvas = $('div#canvas');
    var dx     = canvas.width();
    var dy     = canvas.height();
    var cx     = dx / 2;
    var cy     = dy / 2;
    var paper  = new Raphael('canvas', dx, dy);
    var shared = {
      'fill'             : '#333',
      'stroke'           : color.white,
      'stroke-width'     : 1
    };

    // circle
    (function() {
      // paper.circle(60, 60, 50).attr(shared);
      var source_path = path.circle(60, 60, 50);
      var source_obj  = paper.path(source_path).attr(shared);
      var target_attr = {
        'path'         : blade_path(1),
        'fill'         : color.blue1,
        'stroke'       : color.blue1,
        'stroke-width' : 3
      };

      var attrs = [target_attr, $.extend({}, shared, { path : source_path })];
      var now   = 0;
      source_obj.click(function handler() {
        source_obj.animate(attrs[now ++], 1000);

        if(now === 2) {
          now = 0;
        }
      });
    })();

    // square
    (function() {
      // paper.square(10, 120, 100, 100).attr(shared);
      var source_path = path.square(10, 120, 100, 100);
      var source_obj  = paper.path(source_path).attr(shared);
      var target_attr = {
        'path'         : blade_path(2),
        'fill'         : color.blue2,
        'stroke'       : color.blue2,
        'stroke-width' : 3
      };

      var attrs = [target_attr, $.extend({}, shared, { path : source_path })];
      var now   = 0;
      source_obj.click(function handler() {
        source_obj.animate(attrs[now ++], 1000);

        if(now === 2) {
          now = 0;
        }
      });
    })();

    // ellipse
    (function() {
      // paper.ellipse(60, 280, 30, 50).attr(shared);
      var source_path = path.ellipse(60, 280, 30, 50);
      var source_obj  = paper.path(source_path).attr(shared);
      var target_attr = {
        'path'         : blade_path(3),
        'fill'         : color.blue3,
        'stroke'       : color.blue3,
        'stroke-width' : 3
      };

      var attrs = [target_attr, $.extend({}, shared, { path : source_path })];
      var now   = 0;
      source_obj.click(function handler() {
        source_obj.animate(attrs[now ++], 1000);

        if(now === 2) {
          now = 0;
        }
      });
    })();

    // triangle
    (function() {
      var source_path = path.triangle();
      var source_obj  = paper.path(source_path).attr(shared);
      var target_attr = {
        'path'         : path.circle(cx, cy, 18),
        'fill'         : color.red,
        'stroke'       : color.white,
        'stroke-width' : 6
      };

      var attrs = [target_attr, $.extend({}, shared, { path : source_path })];
      var now   = 0;
      source_obj.click(function handler() {
        source_obj.animate(attrs[now ++], 1000, function() {
          render_text();
          source_obj.unclick(handler);
        });

        if(now === 2) {
          now = 0;
        }
      });
    })();

    function render_text() {
      var result = paper.set();
      result.push(
        paper.text(cx - 127, cy, 'P'),
        paper.text(cx - 86,  cy, 'I'),
        paper.text(cx - 46,  cy, 'V'),
        paper.text(cx + 1,   cy, 'O').toBack(),
        paper.text(cx + 49,  cy, 'T'),
        paper.text(cx + 89,  cy, 'A'),
        paper.text(cx + 133, cy, 'L')
      ).attr({
        'opacity'     : 0,
        'font-size'   : '42px',
        'font-weight' : 'bold'
      });

      result.push(
        paper.text(cx + 180, cy, 'L'),
        paper.text(cx + 219, cy, 'A'),
        paper.text(cx + 260, cy, 'B'),
        paper.text(cx + 296, cy, 'S')
      ).attr({
        'opacity'     : 0,
        'font-size'   : '42px'
      });

      var index = 0;
      function reveal() {
        result[index].animate({ opacity : 1 }, 250, function() {
          index += 1;
          if(index < result.length) {
            reveal();
          }
        });
      }

      reveal();
      render_text = function render_text() {
        // no-op
      };
    }

    function blade_path(index) {
      switch(index) {
        case 1:
          return [
            path.moveto(cx - 42, cy + 50),
            path.lineto(56, -110),
            path.curve(8, -2, 13, 5),
            path.lineto(-26, 132),
            path.curve(-1, 3, -3, 2),
            path.lineto(-40, -25),
            path.curve (-2, -1, 0, -4),
            path.close()
          ];
        case 2:
          return [
            path.moveto(cx - 84, cy - 56),
            path.lineto(24, -24),
            path.curve(1, -1, 3, 0),
            path.lineto(97, 105),
            path.curve(2, 5, -7, 12),
            path.lineto(-117, -92),
            path.curve(0, -1, 0, -1),
            path.close()
          ];
        case 3:
          return [
            path.moveto(cx - 120, cy + 10),
            path.lineto(215, -44),
            path.curve(7, 3, 8, 13),
            path.lineto(-208, 70),
            path.curve(-1, 0, -2, -1),
            path.lineto(-13, -36),
            path.curve(-1, -2, 0, -2),
            path.close()
          ];
      }
    }
  });

  var color = {
    red   : '#AA1224',
    white : '#FFF',
    black : '#000',
    blue1 : '#005195',
    blue2 : '#CCDCEA',
    blue3 : '#7FA8CA'
  };

  var path = {
    circle : function circle(cx, cy, r) {
      return [
        ['M', [cx, (cy - r)].join(',')].join(),
        ['A', [r, r, 0, 1, 1, (cx - 0.1), (cy - r)].join(',')].join(),
        'z'
      ];
    },

    square : function square(x, y, w, h) {
      return [
        ['M', [x,  y].join(',')].join(),
        ['l', [w,  0].join(',')].join(),
        ['l', [0,  h].join(',')].join(),
        ['l', [-w, 0].join(',')].join(),
        ['l', [0, -h].join(',')].join(),
        'z'
      ];
    },

    ellipse : function ellipse(cx, cy, rx, ry) {
      // TODO: the real math
      var h     = (ry * (Math.PI / 2.35));
      var w     = (rx * (Math.PI / 1.5));
      return "M" + (cx - (w / 2)) + "," + cy + " c0-" + h + " " + w + ",-" + h + " " + w + ",0c0," + h + " -" + w + "," + h + " -" + w + ",0z";
    },

    triangle : function triangle() {
      // TODO: accept args
      return ["M 60,340", "l 50,100", "-100,0z"];
    },

    moveto : function moveto(x, y) {
      return ['M', x, y].join(' ');
    },

    lineto : function lineto(x, y) {
      return ['l', x, y].join(' ');
    },

    curve : function curve(ctrl_x, ctrl_y, x, y) {
      return ['s', [ctrl_x, ctrl_y].join(','), [x, y].join(',')].join(' ');
    },

    close :function close() {
      return 'z';
    }
  };
})(jQuery);

(function() {
"use strict";

var json2yaml = require('json2yaml');
var extend = require('extend');

module.exports = {
  parse: function(json) {
    var data = JSON.parse(json);

    var newData = {
     "meta": data['meta'],
     "sprites": {}
    };
    if(data.meta.image) {
      var imgpath = data.meta.image.split('/');
      newData.meta.image = imgpath[imgpath.length - 1];
    };

    var arr;
    if(data.frames instanceof Array) {
      arr = data.frames;
    }
    else
    {
      arr = Object.keys(data.frames);
    }

    var offset = 0;
    arr.forEach(function(filename, kindex) {
      var frame;
      if(filename instanceof Object) {
        frame = filename;
        filename = filename.filename;
      }
      else
      {
        frame = data.frames[filename];
      }
      var shortfile = filename.substr(0, filename.lastIndexOf('.'));
      var item = newData.sprites;
      var meta;
      var parts = shortfile.split(/(?:-|\s(?=\d+$))/);
      var hasNumber = !Number.isNaN(parseInt(parts[parts.length - 1], 10));
      var number = hasNumber ? parseInt(parts[parts.length - 1], 10) : kindex;
      if(number === 0) {
        offset = 1;
      }
      number += offset;

      parts.forEach(function(part, idx, arr) {
        if(idx === arr.length-2 && hasNumber) {
          item[part] = item[part] || {"frames": [], hitbox: {w: 0, h: 0}};
        }
        else if(idx === arr.length-1) {
          if(!hasNumber) {
            item[part] = item[part] || {"frames": [], hitbox: {w: 0, h: 0}};
            meta = {index: item[part].length || 0, filename: filename};
          }
          else
          {
            meta = {index: number-1, filename: filename};
            return;
          }
        }
        else {
          item[part] = item[part] || {};
        }
        item = item[part];
      });
      extend(true, meta, frame);
      item.frames.push(meta);
      item.hitbox.w = frame.sourceSize.w;
      item.hitbox.h = frame.sourceSize.h;
    });
    return json2yaml.stringify(newData);
  }
};

}());

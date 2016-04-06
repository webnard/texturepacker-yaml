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

    Object.keys(data.frames).forEach(function(filename, kindex) {
      var shortfile = filename.substr(0, filename.lastIndexOf('.'));
      var item = newData.sprites;
      var meta;
      var parts = shortfile.split('-');
      var hasNumber = !Number.isNaN(parseInt(parts[parts.length - 1], 10));
      var number = hasNumber ? parseInt(parts[parts.length - 1], 10) : kindex;

      shortfile.split('-').forEach(function(part, idx, arr) {
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
      extend(true, meta, data.frames[filename]);
      item.frames.push(meta);
      item.hitbox.w = data.frames[filename].sourceSize.w;
      item.hitbox.h = data.frames[filename].sourceSize.h;
    });
    return json2yaml.stringify(newData);
  }
};

}());

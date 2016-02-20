(function() {
"use strict";

var json2yaml = require('json2yaml');
var extend = require('extend');

module.exports = {
  parse: function(json) {
    var data = JSON.parse(json);

    var newData = {
     "meta": data['meta'],
     "frames": {}
    };

    Object.keys(data.frames).forEach(function(filename) {
      var shortfile = filename.substr(0, filename.lastIndexOf('.'));
      var item = newData.frames;
      var meta;

      shortfile.split('-').forEach(function(part, idx, arr) {
        if(idx === arr.length-2) {
          item[part] = item[part] || [];
        }
        else if(idx === arr.length-1) {
          meta = {index: parseInt(part), filename: filename};
          return;
        }
        else {
          item[part] = item[part] || {};
        }
        item = item[part];
      });
      extend(true, meta, data.frames[filename]);
      item.push(meta);
    });
    return json2yaml.stringify(newData);
  }
};

}());

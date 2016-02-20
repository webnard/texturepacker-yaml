#!/usr/bin/env node
"use strict";
var parser   = require('./index'),
    fs       = require('fs'),
    filename = process.argv[2];

if(filename) {
  fs.readFile(filename, 'utf8', function (err, text) {
    if(err) {
      console.error("Could not open " + filename, err);
      process.exit(2);
      return;
    }
    console.info(parser.parse(text));
  })
  return;
}
console.error("No filename provided.");
process.exit(1);

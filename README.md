Code to convert TexturePacker- or Aseprite-produced JSON to a nested YAML file.

Expects filenames to be hyphen- or space-delimited and end with a numeric
index (e.g., "mario-jump-1.png"). For use with Aseprite, spaces are also
supported if they immediately precede a number followed by the file extension
(e.g., "big-mario-jump 1.ase" converts to big.mario.jump[0]).

See test/sprites.json for example JSON files file and the YAML-converted
format.

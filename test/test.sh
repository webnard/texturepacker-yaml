#!/usr/bin/env bash
echo "Checking conversion of test/sprites.json to test/sprites.yml"
./cli.js test/sprites.json | diff test/sprites.yml -

echo "Checking conversion of test/sprites2.json to test/sprites2.yml"
./cli.js test/sprites2.json | diff test/sprites2.yml -

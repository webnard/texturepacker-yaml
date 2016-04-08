#!/usr/bin/env bash
echo "Checking conversion of test/sprites.json to test/sprites.yml"
./cli.js test/sprites.json | diff test/sprites.yml -

echo "Checking conversion of test/sprites2.json to test/sprites2.yml"
./cli.js test/sprites2.json | diff test/sprites2.yml -

echo "Checking conversion of test/sprites3.json to test/sprites3.yml"
./cli.js test/sprites3.json | diff test/sprites3.yml -

echo "Checking conversion of test/sprites4.json to test/sprites4.yml"
./cli.js test/sprites4.json | diff test/sprites4.yml -

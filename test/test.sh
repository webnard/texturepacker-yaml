#!/usr/bin/env bash
./cli.js test/sprites.json | diff test/sprites.yml -
./cli.js test/sprites2.json | diff test/sprites2.yml -

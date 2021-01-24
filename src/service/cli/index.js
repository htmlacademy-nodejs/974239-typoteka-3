"use strict";

const info = require(`./info`);
const version = require(`./version`);
const generate = require(`./generate`);

const Cli = {
  [info.name]: info,
  [version.name]: version,
  [generate.name]: generate,
};

module.exports = {
  Cli
};

const assets = require("express").Router();
const controller = require("../controller");
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

assets.get(pathToRegexp("/:icon"), (req, res) => {
  res.setHeader("content-type", "image/x-icon");

  controller.assets(req, res);
});

module.exports = assets;

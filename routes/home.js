const express = require("express");
const home = require("express").Router();
const controller = require("../controller");

const urlencodedParser = express.urlencoded({ extended: false });

home.get("/", (req, res) => {
  controller.index(req, res);
});

home.post("/", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  controller.index(req, res);
});

module.exports = home;

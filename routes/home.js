const express = require("express");
const home = require("express").Router();
const controller = require("../controller");

home.get("/", (req, res) => {
  controller.index(req, res);
});

home.post("/", (req, res) => {
  if (!req.body) return res.sendStatus(400);

  controller.index(req, res);
});

module.exports = home;

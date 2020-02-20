const express = require("express");
const router = express.Router();

//Models
const DashBoard = require("../models/DashBoard");

//Download dashBoard
router.get("/download", async (req, res) => {
  res.send("hello from dash boad download");
});

//Post Card
router.post("/card", async (req, res) => {
  res.send("hello from dash boad download");
});

//Post column
router.post("/card", async (req, res) => {
  res.send("hello from dash boad download");
});

//delete card
router.delete("/card", async (req, res) => {
  res.send("hello from dash boad download");
});

//delete column
router.delete("/card", async (req, res) => {
  res.send("hello from dash boad download");
});

//delete dashboard
router.delete("/card", async (req, res) => {
  res.send("hello from dash boad download");
});

module.exports = router;

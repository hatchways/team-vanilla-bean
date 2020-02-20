const express = require("express");
const router = express.Router();

//Models
const DashBoard = require("../models/DashBoard");

//Download dashBoard
router.post("/download", async (req, res) => {
  res.send("hello from dash boad download");
});

//add Card
router.post("/addCard", async (req, res) => {
  res.send("hello from dash boad download");
});

//Post column
router.post("/addColumn", async (req, res) => {
  res.send("hello from dash boad download");
});

//delete card
router.delete("/deleteCard", async (req, res) => {
  res.send("hello from dash boad download");
});

//delete column
router.delete("/deleteColumn", async (req, res) => {
  res.send("hello from dash boad download");
});

//delete dashboard
router.delete("/deleteDashBoard", async (req, res) => {
  res.send("hello from dash boad download");
});

module.exports = router;

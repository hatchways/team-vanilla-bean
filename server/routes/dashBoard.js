const express = require("express");
const router = express.Router();

//Models
const DashBoard = require("../models/DashBoard");

//Download dashBoard
router.get("/download", async (req, res) => {
  const id = req.body;
  DashBoard.findOne({ _id: "5e4ec3d5769a0009ce7357e4" }, function(err, data) {
    console.log(">>>> " + data);
    res.send(data);
  });
});

//add Card
router.post("/addColumn", async (req, res) => {
  const testPost = new DashBoard({
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: []
      }
    },
    columnOrder: ["column-1"]
  });

  testPost.save((err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

//Post column
router.post("/addCard", async (req, res) => {
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
  let dashBoardId = req.body.dashBoardId;
  DashBoard.remove({ _id: `${dashBoardId}` }, function(err) {
    if (!err) {
      res.send("deleted");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;

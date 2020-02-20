const express = require("express");
const router = express.Router();

//Models
const DashBoard = require("../models/DashBoard");

//Download dashBoard
router.get("/download", async (req, res) => {
  DashBoard.find({}, function(err, data) {
    console.log(">>>> " + data);
  });
});

//add Card
router.post("/addCard", async (req, res) => {
  const testPost = new DashBoard({
    tasks: {
      "task-1": { id: "task-1", content: "take out the garbage" },
      "task-2": { id: "task-2", content: "Watch movie" },
      "task-3": { id: "task-3", content: "Catch my phone" },
      "task-4": { id: "task-4", content: "cookDinner" }
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1", "task-2", "task-3", "task-4"]
      },
      "column-2": {
        id: "column-2",
        title: "In progress",
        taskIds: []
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: []
      }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
  });

  testPost.save((err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
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

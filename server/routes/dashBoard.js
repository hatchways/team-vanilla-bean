const express = require("express");
const router = express.Router();

// Models;
const { Task, Column, DashBoard } = require("../models/DashBoard");

router.post("/getDashBoard", async (req, res) => {
  const { dashBoardId } = req.body;
  console.log("dashBoardId", dashBoardId);
  try {
    let dashBoard = DashBoard.find({ _id: dashBoardId });
    res.send(dashBoard);
  } catch (err) {
    res.send(err);
  }

  // let data = await Column.find();
  // console.log(data);
});

//Add DashBoard
router.post("/addDashBoard", async (req, res) => {
  const { dashBoardTitle, id } = req.body;
  try {
    //Initial data
    const task1 = new Task({
      content: "This is Your Task!",
      description: "",
      deadline: "",
      comments: [],
      tag: {},
      action: {}
    });
    const column1 = new Column({
      title: "First column",
      taskOrder: [task1.id],
      tasks: { [task1._id]: task1 }
    });
    const column2 = new Column({
      title: "Second column",
      taskOrder: [],
      tasks: {}
    });

    const newDashBoard = new DashBoard({
      user: id,
      dashBoardTitle: dashBoardTitle,
      columns: { [column1._id]: column1, [column2._id]: column2 },
      columnOrder: [column1.id, column2.id]
    });

    let data = await newDashBoard.save();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// Add a column
router.post("/addColumn", async (req, res) => {
  const { dashBoardId, title } = req.body;
  try {
    const newColumn = new Column({
      title,
      tasks: [],
      taskOrder: []
    });
    const newId = newColumn._id;
    let newColumns = {};

    let Board = await DashBoard.findOne({ _id: dashBoardId });

    for (const key of Board.columns.keys()) {
      // Prints "github", "twitter", "instagram"
      let item = Board.columns.get(key);
      newColumns[item.id] = item;
    }

    console.log("old", newColumns);
    newColumns = {
      ...newColumns,
      [newId]: newColumn
    };
    const dashBoard = DashBoard.findOneAndUpdate(
      { _id: dashBoardId },
      { $set: { columns: newColumns } },
      { new: true },
      (err, data) => {
        if (err) console.log(err);
        res.send(data);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// Add a Card
router.post("/addTask", async (req, res) => {
  const { dashboardId, columnId, content, description, tag, action } = req.body;
  try {
    const newTask = new Task({
      content,
      description,
      tag,
      action
    });

    const test = [{ 2: "1" }, { 2: "1" }, { 2: "1" }, { 2: "1" }];

    Column.findOne({ _id: columnId }, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      res.send(data);
    });

    // const dashBoard = Column.findOneAndUpdate(
    //   { _id: 5e50bcf0a5b57d4d3d28b660 },
    //   { $push: { columns: { [newId]: newColumn } } },
    //   { safe: true, upsert: true },
    //   (err, data) => {
    //     if (err) console.log(err);
    //     res.send(data);
    //   }
    // );
  } catch (err) {
    console.log(err);
  }
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

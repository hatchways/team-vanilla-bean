const express = require("express");
const router = express.Router();

// Models;
const { Task, Column, DashBoard } = require("../models/DashBoard");

router.post("/getDashBoard", async (req, res) => {
  const { dashBoardId } = req.body;
  console.log("dashBoardId", dashBoardId);
  try {
    let dashBoard = await DashBoard.find({ _id: dashBoardId });
    res.send(dashBoard);
  } catch (err) {
    res.send(err);
  }

  // let data = await Column.find();
  // console.log(data);
});

//Add DashBoard @in progress need to update UserId
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

// Add a column @Done
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
    newColumns = {
      ...newColumns,
      [newId]: newColumn
    };

    const dashBoard = DashBoard.findOneAndUpdate(
      { _id: dashBoardId },
      { $set: { columns: newColumns }, $push: { columnOrder: newId } },
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

// Add a Card @in progress
router.post("/addTask", async (req, res) => {
  const { dashBoardId, columnId, content, description, tag, action } = req.body;
  try {
    const newTask = new Task({
      content,
      description,
      tag,
      action
    });

    let newTasks = {};
    let Board = await DashBoard.findOne({ _id: dashBoardId });
    let Column = await Board.columns.get(columnId);

    for (const key of Column.tasks.keys()) {
      let item = Column.tasks.get(key);
      newTasks[item.id] = item;
    }

    newTasks = {
      ...newTasks,
      [newTask._id]: newTask
    };

    const danshBoard = DashBoard.findOneAndUpdate(
      { _id: dashBoardId, columns: columnId },
      { $set: { tasks: newTasks }, $push: { taskOrder: newTask._id } },
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

//Update task index within same column
router.put("/updateTaskIndex", async (req, res) => {
  res.send("hello from dash boad download");
});

//Update column index
router.put("/updateColumnIndex", async (req, res) => {
  res.send("hello from dash boad download");
});

//Update task index between Column
router.put("/updateTaskAndColumn", async (req, res) => {
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

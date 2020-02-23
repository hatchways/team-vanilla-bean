const express = require("express");
const router = express.Router();
const updateData = require("../util/util");
const jwt = require("jsonwebtoken");

// Models;
const { Task, Column, DashBoard } = require("../models/DashBoard");

//@CreateBoard
router.post("/getDashBoard", async (req, res) => {
  const { dashBoardId } = req.body;
  try {
    let dashBoard = await DashBoard.find({ _id: dashBoardId });
    res.send(dashBoard);
  } catch (err) {
    res.status(404).json({ error: "dashboard does not exist" });
  }
});

//Add DashBoard @in progress need to update UserId
router.post("/addDashBoard", async (req, res) => {
  const { dashBoardTitle, token } = req.body;

  let user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  let userId = user.id;

  if (!user) {
    return res.status(401).json({ error: "token is not valid" });
  }

  try {
    // Initial states
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
      user: userId,
      dashBoardTitle: dashBoardTitle,
      columns: { [column1._id]: column1, [column2._id]: column2 },
      columnOrder: [column1.id, column2.id]
    });

    let data = await newDashBoard.save();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to add dashboard" });
  }
});

// Add a column @Done
router.post("/addColumn", async (req, res) => {
  const { dashBoardId, columnTitle } = req.body;
  try {
    const newColumn = new Column({
      columnTitle,
      tasks: [],
      taskOrder: []
    });

    //
    let newColumns = {};
    let Board = await DashBoard.findOne({ _id: dashBoardId });

    for (const key of Board.columns.keys()) {
      let item = Board.columns.get(key);
      newColumns[item.id] = item;
    }

    newColumns = {
      ...newColumns,
      [newColumn._id]: newColumn
    };

    //manipulate data
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns"] = newColumns;
    updateCond["$push"] = {};
    updateCond["$push"]["columnOrder"] = newColumn._id;

    const result = await updateData(DashBoard, dashBoardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add column" });
  }
});

// Add a Card @Done
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

    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnId + ".tasks"] = newTasks;
    updateCond["$push"] = {};
    updateCond["$push"]["columns." + columnId + ".taskOrder"] = newTask._id;

    const result = await updateData(DashBoard, dashBoardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

//Update task index within same column @Done
router.put("/updateTaskIndex", async (req, res) => {
  try {
    const { dashBoardId, columnId, taskOrder } = req.body;

    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnId + ".taskOrder"] = taskOrder;

    const result = await updateData(DashBoard, dashBoardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to move task" });
  }
});

//Update column index @Done
router.put("/updateColumnIndex", async (req, res) => {
  const { dashBoardId, columnOrder } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columnOrder"] = columnOrder;

    const result = await updateData(DashBoard, dashBoardId, updateCond);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

//Update task index between Column @Done
router.put("/moveTasksToOther", async (req, res) => {
  const {
    columnSourceId,
    columnSourceTasks,
    columnSourceTaskOrder,
    columnToSourceId,
    columnToTasks,
    columnToTaskOrder,
    dashBoardId
  } = req.body;

  try {
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnSourceId + ".tasks"] = columnSourceTasks;
    updateCond["$set"]["columns." + columnSourceId + ".taskOrder"] = columnSourceTaskOrder;
    updateCond["$set"]["columns." + columnToSourceId + ".tasks"] = columnToTasks;
    updateCond["$set"]["columns." + columnToSourceId + ".taskOrder"] = columnToTaskOrder;

    const result = await updateData(DashBoard, dashBoardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to move task to the column" });
  }
});

//delete card @done
router.put("/deleteTask", async (req, res) => {
  const { dashBoardId, columnId, taskId } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$unset"] = {};
    updateCond["$unset"]["columns." + columnId + ".tasks." + taskId] = "";
    updateCond["$pull"] = {};
    updateCond["$pull"]["columns." + columnId + ".taskOrder"] = taskId;

    const result = await updateData(DashBoard, dashBoardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

//delete column @done
router.put("/deleteColumn", async (req, res) => {
  const { dashBoardId, columnId } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$unset"] = {};
    updateCond["$unset"]["columns." + columnId] = "";
    updateCond["$pull"] = {};
    updateCond["$pull"]["columnOrder"] = columnId;

    const result = await updateData(DashBoard, dashBoardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete column" });
  }
});

//delete dashboard @done
router.delete("/deleteDashBoard", async (req, res) => {
  const { dashBoardId } = req.body;
  DashBoard.remove({ _id: dashBoardId }, function(err) {
    if (!err) {
      res.send("Dashboard deleted");
    } else {
      res.status(500).json({ error: "Failed to delete dashboard" });
    }
  });
});

module.exports = router;

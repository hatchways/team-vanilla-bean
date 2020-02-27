const express = require("express");
const router = express.Router();
const updateData = require("../util/util");
const checkToken = require("../auth/validateToken");

// Models;
const { Task, Column, Dashboard } = require("../models/Dashboard");

//@CreateBoard
router.get("/dashboard", checkToken, async (req, res) => {
  let userId = req.decoded.id;

  try {
    let result = await Dashboard.findOne({ user: userId });
    res.status(200).json({ result });
  } catch (err) {
    res.status(404).json({ error: "Dashboard does not exist" });
  }
});

//Add Dashboard @Done
router.post("/dashboard", checkToken, async (req, res) => {
  const { dashboardTitle } = req.body;
  let userId = req.decoded.id;

  if (!dashboardTitle) {
    return res.status(401).json({ error: "Please Enter dashboard name" });
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

    const newDashBoard = new Dashboard({
      user: userId,
      dashboardTitle: dashboardTitle,
      columns: { [column1._id]: column1, [column2._id]: column2 },
      columnOrder: [column1.id, column2.id]
    });

    let result = await newDashBoard.save();
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to add dashboard" });
  }
});

// Add a column @Done
router.post("/column", checkToken, async (req, res) => {
  const { dashboardId, columnTitle } = req.body;
  try {
    const newColumn = new Column({
      columnTitle,
      tasks: [],
      taskOrder: []
    });

    let newColumns = {};
    let board = await Dashboard.findOne({ _id: dashboardId });

    for (const key of board.columns.keys()) {
      let item = board.columns.get(key);
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

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to add column" });
  }
});

// Add a Card @Done
router.post("/task", checkToken, async (req, res) => {
  const { dashboardId, columnId, content, description, tag, action } = req.body;
  try {
    const newTask = new Task({
      content,
      description,
      tag,
      action
    });

    let newTasks = {};
    let board = await Dashboard.findOne({ _id: dashboardId });
    let Column = await board.columns.get(columnId);

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

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to add task" });
  }
});

//Update task index within same column @Done
router.put("/task", checkToken, async (req, res) => {
  try {
    const { dashboardId, columnId, taskOrder } = req.body;

    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnId + ".taskOrder"] = taskOrder;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to move task" });
  }
});

//Update column index @Done
router.put("/column", checkToken, async (req, res) => {
  const { dashboardId, columnOrder } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columnOrder"] = columnOrder;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete column" });
  }
});

//Update task index between Column @Done
router.put("/task-column", checkToken, async (req, res) => {
  const {
    columnSourceId,
    columnSourceTasks,
    columnSourceTaskOrder,
    columnToSourceId,
    columnToTasks,
    columnToTaskOrder,
    dashboardId
  } = req.body;

  try {
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnSourceId + ".tasks"] = columnSourceTasks;
    updateCond["$set"]["columns." + columnSourceId + ".taskOrder"] = columnSourceTaskOrder;
    updateCond["$set"]["columns." + columnToSourceId + ".tasks"] = columnToTasks;
    updateCond["$set"]["columns." + columnToSourceId + ".taskOrder"] = columnToTaskOrder;

    const result = await updateData(Dashboard, dashboardId, updateCond);

    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to move task to the column" });
  }
});

//delete card @done
router.put("/remove-task", checkToken, async (req, res) => {
  const { dashboardId, columnId, taskId } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$unset"] = {};
    updateCond["$unset"]["columns." + columnId + ".tasks." + taskId] = "";
    updateCond["$pull"] = {};
    updateCond["$pull"]["columns." + columnId + ".taskOrder"] = taskId;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete task" });
  }
});

//delete column @done
router.put("/remove-column", checkToken, async (req, res) => {
  const { dashboardId, columnId } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$unset"] = {};
    updateCond["$unset"]["columns." + columnId] = "";
    updateCond["$pull"] = {};
    updateCond["$pull"]["columnOrder"] = columnId;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete column" });
  }
});

//delete dashboard @done
router.delete("/dashboard", checkToken, async (req, res) => {
  const { dashboardId } = req.body;
  Dashboard.remove({ _id: dashboardId }, function(err) {
    if (!err) {
      res.status(200).json({ result: "Dashboard deleted" });
    } else {
      res.status(400).json({ error: "Failed to delete dashboard" });
    }
  });
});

module.exports = router;

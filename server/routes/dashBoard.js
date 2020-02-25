const express = require("express");
const router = express.Router();
const { updateData, decodeToken } = require("../util/util");

// Models;
const { Task, Column, Dashboard } = require("../models/Dashboard");

//@CreateBoard
router.post("/getDashboard", async (req, res) => {
  const { token } = req.body;

  let userId = await decodeToken(token);

  try {
    let dashboard = await Dashboard.findOne({ user: userId });
    res.send(dashboard);
  } catch (err) {
    res.status(404).json({ error: "Dashboard does not exist" });
  }
});

//Add Dashboard @in progress need to update UserId
router.post("/addDashBoard", async (req, res) => {
  const { dashboardTitle, token } = req.body;

  let userId = await decodeToken(token);

  if (!userId) {
    return res.status(401).json({ error: "Token is not valid" });
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
      title: "progress",
      taskOrder: [task1.id],
      tasks: { [task1._id]: task1 }
    });
    const column2 = new Column({
      title: "completed",
      taskOrder: [],
      tasks: {}
    });

    const newDashBoard = new Dashboard({
      user: userId,
      dashboardTitle: dashboardTitle,
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
  const { dashboardId, columnTitle } = req.body;
  console.log(req.body);

  try {
    const newColumn = new Column({
      columnTitle,
      tasks: [],
      taskOrder: []
    });

    //
    let newColumns = {};
    let Board = await Dashboard.findOne({ _id: dashboardId });

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

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add column" });
  }
});

// Add a Card @Done
router.post("/addTask", async (req, res) => {
  const { dashboardId, columnId, content, description, tag, action } = req.body;
  try {
    const newTask = new Task({
      content,
      description,
      tag,
      action
    });

    let newTasks = {};
    let Board = await Dashboard.findOne({ _id: dashboardId });
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
    console.log(updateCond);

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

//Update task index within same column @Done
router.put("/updateTaskIndex", async (req, res) => {
  try {
    const { dashboardId, columnId, taskOrder } = req.body;
    console.log(dashboardId, columnId, taskOrder);

    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnId + ".taskOrder"] = taskOrder;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to move task" });
  }
});

//Update column index @Done
router.put("/updateColumnIndex", async (req, res) => {
  try {
    const { dashboardId, columnOrder } = req.body;
    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columnOrder"] = columnOrder;
    console.log(updateCond);

    const result = await updateData(Dashboard, dashboardId, updateCond);
    console.log(result);

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
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to move task to the column" });
  }
});

//delete card @done
router.put("/deleteTask", async (req, res) => {
  const { dashboardId, columnId, taskId } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$unset"] = {};
    updateCond["$unset"]["columns." + columnId + ".tasks." + taskId] = "";
    updateCond["$pull"] = {};
    updateCond["$pull"]["columns." + columnId + ".taskOrder"] = taskId;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

//delete column @done
router.put("/deleteColumn", async (req, res) => {
  const { dashboardId, columnId } = req.body;
  try {
    //data manipulation
    let updateCond = {};
    updateCond["$unset"] = {};
    updateCond["$unset"]["columns." + columnId] = "";
    updateCond["$pull"] = {};
    updateCond["$pull"]["columnOrder"] = columnId;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete column" });
  }
});

//delete dashboard @done
router.delete("/deleteDashBoard", async (req, res) => {
  const { dashboardId } = req.body;
  Dashboard.remove({ _id: dashboardId }, function(err) {
    if (!err) {
      res.send("Dashboard deleted");
    } else {
      res.status(500).json({ error: "Failed to delete dashboard" });
    }
  });
});

module.exports = router;

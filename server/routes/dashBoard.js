const express = require("express");
const router = express.Router();
const updateData = require("../util/util");
const checkToken = require("../auth/validateToken");

// Models;
const { Task, Column, Dashboard } = require("../models/Dashboard");

//@CreateBoard

//to get SpecificBoard @ need update
router.post("/:dashboardId", checkToken, async (req, res) => {
  let userId = req.decoded.id;
  let id = req.params.dashboardId;

  console.log(req.body);

  try {
    let result = await Dashboard.findOne({ user: userId, _id: id });
    console.log(result);

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Dashboard does not exist" });
  }
});

//Add Dashboard @Done

router.post("/", checkToken, async (req, res) => {
  const { title } = req.body;
  let userId = req.decoded.id;

  if (!title) {
    return res.status(401).json({ error: "Please Enter dashboard title" });
  }

  try {
    // Initial states
    const task1 = new Task({
      title: "This is Your Task!",
      description: "",
      deadline: "",
      comments: [],
      tag: {},
      action: {}
    });
    const column1 = new Column({
      title: "in progress",
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
      title: title,
      columns: { [column1._id]: column1, [column2._id]: column2 },
      columnOrder: [column1.id, column2.id]
    });

    let result = await newDashBoard.save();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to add dashboard" });
  }
});

//delete dashboard @done
router.delete("/:dashboardId", checkToken, async (req, res) => {
  const { dashboardId } = req.body;
  Dashboard.remove({ _id: dashboardId }, function(err) {
    if (!err) {
      res.status(200).json({ result: "Dashboard deleted" });
    } else {
      console.log(err);
      res.status(400).json({ error: "Failed to delete dashboard" });
    }
  });
});

// Add a column @Done

router.post("/:dashboardId/columns", checkToken, async (req, res) => {
  const { dashboardId, title, position } = req.body;
  try {
    if (!title) {
      return res.status(401).json({ error: "Please Enter column title" });
    }
    let board = await Dashboard.findOne({ _id: dashboardId });

    const newColumn = new Column({
      title,
      tasks: [],
      taskOrder: []
    });

    board.columns.set(newColumn._id.toString(), newColumn);

    if (position === "left") {
      board.columnOrder.unshift(newColumn._id.toString());
    } else {
      board.columnOrder.push(newColumn._id);
    }

    const result = await board.save();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to add column" });
  }
});

//delete column @done
router.delete("/:dashboardId/columns/:columnId", checkToken, async (req, res) => {
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
    console.log(err);
    res.status(400).json({ error: "Failed to delete column" });
  }
});

// Add a task @Done
router.post("/:dashboardId/columns/:columnId/tasks", checkToken, async (req, res) => {
  const { dashboardId, columnId, title, description, tag, action } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      tag,
      action
    });

    if (!title) {
      return res.status(401).json({ error: "Please Enter task title" });
    }

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
    console.log(err);
    res.status(400).json({ error: "Failed to add task" });
  }
});

//delete card @done
router.delete("/:dashboardId/columns/:columnId/tasks/:taskId", checkToken, async (req, res) => {
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
    console.log(err);
    res.status(400).json({ error: "Failed to delete task" });
  }
});
//Update column index @Done
router.put("/:dashboardId/columns/:columnId/columnOrder", checkToken, async (req, res) => {
  try {
    const dashboardId = req.params.dashboardId;
    const { columnOrder } = req.body;

    // const
    // const { dashboardId, columnOrder } = req.body;
    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columnOrder"] = columnOrder;

    const result = await updateData(Dashboard, dashboardId, updateCond);

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to delete column" });
  }
});

//Update task index within same column @Done
router.put("/:dashboardId/columns/:columnId/taskOrder", checkToken, async (req, res) => {
  try {
    const { dashboardId, columnId, taskOrder } = req.body;

    //data manipulation
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnId + ".taskOrder"] = taskOrder;

    const result = await updateData(Dashboard, dashboardId, updateCond);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to move task" });
  }
});

//Update task index between Column @Done
router.put("/:dashboardId/columns/:columnId/taskColumnOrder", checkToken, async (req, res) => {
  console.log(req.body);

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
    console.log(err);
    res.status(400).json({ error: "Failed to move task to the column" });
  }
});

module.exports = router;

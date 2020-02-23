const express = require("express");
const router = express.Router();
const checkToken = require("../auth/validateToken");

// Models;
const { Task, Column, DashBoard } = require("../models/DashBoard");

//@CreateBoard, how to decode Token?
router.post("/getDashBoard", async (req, res) => {
  const { dashBoardId } = req.body;
  console.log("dashBoardId", dashBoardId);
  try {
    let dashBoard = await DashBoard.find({ _id: dashBoardId });
    res.send(dashBoard);
  } catch (err) {
    res.send(err);
  }
});

//Add DashBoard @in progress need to update UserId
router.post("/addDashBoard", async (req, res) => {
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU0MGE3YTFjOGM1OGQwM2Q3YmRiZWNkIn0sImlhdCI6MTU4MTI5NTUyMSwiZXhwIjoxNTgxNjU1NTIxfQ.XClpjFBKjD2tY2BYirTunhdE4bFsnKQa6FXawkyU4QM";
  const { dashBoardTitle, id, token } = req.body;
  // const { decoded } = req.decoded;
  console.log(req.body);

  try {
    let userId = "";

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
      let item = Board.columns.get(key);
      newColumns[item.id] = item;
    }
    newColumns = {
      ...newColumns,
      [newId]: newColumn
    };

    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns"] = newColumns;
    updateCond["$push"] = {};
    updateCond["$push"]["columnOrder"] = newId;

    const dashBoard = DashBoard.findOneAndUpdate(
      { _id: dashBoardId },
      updateCond,
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

    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnId + ".tasks"] = newTasks;
    updateCond["$push"] = {};
    updateCond["$push"]["columns." + columnId + ".taskOrder"] = newTask._id;

    const danshBoard = DashBoard.findOneAndUpdate(
      { _id: dashBoardId },
      updateCond,
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

//Update task index within same column @Done
router.put("/updateTaskIndex", async (req, res) => {
  try {
    const { dashBoardId, columnId, newOrder } = req.body;
    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnId + ".taskOrder"] = newOrder;

    const dashboard = DashBoard.findOneAndUpdate(
      { _id: dashBoardId },
      updateCond,
      { new: true },
      (err, data) => {
        if (err) console.log(err);
        res.send(data);
      }
    );
  } catch (err) {
    res.send(err);
  }
});

//Update column index @Done
router.put("/updateColumnIndex", async (req, res) => {
  const { dashBoardId, newOrder } = req.body;
  try {
    DashBoard.findOneAndUpdate(
      { _id: dashBoardId },
      { $set: { columnOrder: newOrder } },
      { new: true },
      (err, data) => {
        if (err) console.log(err);
        res.send(data);
      }
    );
  } catch (error) {
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
    console.log(dashBoardId);

    let updateCond = {};
    updateCond["$set"] = {};
    updateCond["$set"]["columns." + columnSourceId + ".tasks"] = columnSourceTasks;
    updateCond["$set"]["columns." + columnSourceId + ".taskOrder"] = columnSourceTaskOrder;
    updateCond["$set"]["columns." + columnToSourceId + ".tasks"] = columnToTasks;
    updateCond["$set"]["columns." + columnToSourceId + ".taskOrder"] = columnToTaskOrder;
    console.log("after", updateCond);

    DashBoard.findOneAndUpdate({ _id: dashBoardId }, updateCond, { new: true }, (err, data) => {
      if (err) console.log(err);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

//delete card
router.delete("/deleteTask", async (req, res) => {
  const { dashBoardId, columnOrder, taskId } = req.body;
  DashBoard.remove({ _id: dashBoardId }, function(err) {
    if (!err) {
      res.send("deleted");
    } else {
      res.send(err);
    }
  });
});

//delete column @done
router.put("/deleteColumn", async (req, res) => {
  const { dashBoardId, columnId } = req.body;
  try {
    let updateCond = {};
    updateCond["$unset"] = {};
    updateCond["$unset"]["columns." + columnId] = "";
    updateCond["$pull"] = {};
    updateCond["$pull"]["columnOrder"] = columnId;

    DashBoard.findOneAndUpdate({ _id: dashBoardId }, updateCond, { new: true }, (err, data) => {
      if (err) console.log(err);
      res.send(data);
    });
  } catch (err) {
    res.send(err);
  }
});

//delete dashboard
router.delete("/deleteDashBoard", async (req, res) => {
  const { dashBoardId } = req.body;
  DashBoard.remove({ _id: dashBoardId }, function(err) {
    if (!err) {
      res.send("deleted");
    } else {
      res.send(err);
    }
  });
});

module.exports = router;

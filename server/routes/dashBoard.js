const express = require("express");
const router = express.Router();

// Models;
const { Task, Column, DashBoard } = require("../models/DashBoard");

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
    console.log(newColumn);

    const dashBoard = DashBoard.findOneAndUpdate(
      { _id: dashBoardId },
      { $push: { columns: { [newId]: newColumn } } },
      { safe: true, upsert: true },
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

router.get("/testPopulate", async (req, res) => {
  Column.find({ title: "Im title" }, (err, res) => {
    if (err) console.log("err", err);
    console.log(res);
  });
  // let data = await Column.find();
  // console.log(data);
});

//Download dashBoard
// router.get("/download", async (req, res) => {
//   const id = req.body;
//   DashBoard.findOne({ _id: "5e4ec3d5769a0009ce7357e4" }, function(err, data) {
//     console.log(">>>> " + data);
//     res.send(data);
//   });
// });

//add Card
router.post("/addColumn", async (req, res) => {
  const testPost = new DashBoard({
    tasks: {
      "task-1": {}
    },
    columns: {
      "column-1": {}
    }
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

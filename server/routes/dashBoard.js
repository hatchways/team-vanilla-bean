const express = require("express");
const router = express.Router();

// Models;
const { Task, Column, DashBoard } = require("../models/DashBoard");

//Add DashBoad
router.post("/addDashBoard", async (req, res) => {
  const { dashBoardTitle, id } = req.body;

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
    dashBoardTitle: "Im your dashboard",
    columns: { [column1._id]: column1, [column2._id]: column2 },
    columnOrder: [column1.id, column2.id]
  });

  //return dashboard ID and dashBoard Title
  await newDashBoard.save((err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

//testPart
// router.post("/addColumn", async (req, res) => {
//   const task1 = new Task({
//     content: "task1 content"
//   });
//   const task2 = new Task({
//     content: "task2 content"
//   });
//   const column = new Column({
//     title: "Im title",
//     taskOrder: [task1.id, task2.id],
//     tasks: { [task1._id]: task1, [task2._id]: task2 }
//   });
//   // this is for demo, you will want to create a method to add the tasks to avoid mistakes
//   let data = await column.save();
//   res.send(data);
// });

router.get("/testPopulate", async (req, res) => {
  Column.find({ title: "Im title" }, (err, res) => {
    if (err) console.log("err", err);
    console.log(res);
  });
  // let data = await Column.find();
  // console.log(data);
});

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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("../models/User");

const TaskSchema = new Schema({
  content: { type: String },
  description: { type: String },
  deadline: { type: String },
  comments: [{ type: String }],
  tag: { tag: { type: String }, color: { type: Number } },
  action: { tag: { type: String }, color: { type: Number } }
});

const ColumnSchema = new Schema({
  taskOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: TaskSchema }], //don't populate this, it's for ordering
  title: { type: String },
  tasks: { type: Map, of: TaskSchema }
});

const DashBoardSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  dashBoardTitle: String,
  columns: { type: Map, of: ColumnSchema },
  columnOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: ColumnSchema }]
});

module.exports = {
  DashBoard: mongoose.model("DashBoard", DashBoardSchema),
  Column: mongoose.model("Column", ColumnSchema),
  Task: mongoose.model("Task", TaskSchema)
};

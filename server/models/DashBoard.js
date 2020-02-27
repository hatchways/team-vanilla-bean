const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User");

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: String },
  comments: [{ type: String }],
  tag: { type: String },
  action: { tag: { type: String }, color: { type: Number } }
});

const ColumnSchema = new Schema({
  title: { type: String, required: true },
  tasks: { type: Map, of: TaskSchema },
  taskOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: TaskSchema }] //don't populate this, it's for ordering
});

const DashBoardSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  title: { type: String, required: true },
  columns: { type: Map, of: ColumnSchema },
  columnOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: ColumnSchema }]
});

module.exports = {
  Dashboard: mongoose.model("Dashboard", DashBoardSchema),
  Column: mongoose.model("Column", ColumnSchema),
  Task: mongoose.model("Task", TaskSchema)
};

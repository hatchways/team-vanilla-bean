const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("../models/User");

const TaskSchema = new Schema(
  {
    content: { type: String, required: true },
    description: { type: String },
    deadline: { type: String },
    comments: [{ type: String }],
    tag: { tag: { type: String }, color: { type: Number } },
    action: { tag: { type: String }, color: { type: Number } }
  }
  // { strict: false }
);

const ColumnSchema = new Schema(
  {
    columnTitle: { type: String },
    tasks: { type: Map, of: TaskSchema },
    taskOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: TaskSchema }] //don't populate this, it's for ordering
  }
  // { strict: false }
);

const DashBoardSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
    dashBoardTitle: String,
    columns: { type: Map, of: ColumnSchema },
    columnOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: ColumnSchema }]
  }
  // { strict: false }
);

module.exports = {
  DashBoard: mongoose.model("DashBoard", DashBoardSchema),
  Column: mongoose.model("Column", ColumnSchema),
  Task: mongoose.model("Task", TaskSchema)
};

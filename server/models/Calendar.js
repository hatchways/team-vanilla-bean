const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deadlineSchema = new Schema({
  start: { type: String },
  title: { type: String },
  column: { type: mongoose.Schema.Types.ObjectId, ref: "Column" },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
});

const calendarSchema = new Schema({
  dashboard: { type: mongoose.Schema.Types.ObjectId, ref: "Dashboard" },
  deadlines: [deadlineSchema],
  deadline: deadlineSchema
});

module.exports = mongoose.model("Calendar", calendarSchema);

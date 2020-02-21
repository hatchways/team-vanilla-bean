const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    Task_id: {
      id: { type: mongoose.Schema.Types.ObjectId },
      content: { type: String }
    }
  },
  { strict: false }
);

const ColumnSchema = new Schema(
  {
    Column_id: {
      id: { type: mongoose.Schema.Types.ObjectId },
      title: { type: String },
      taskIds: { type: Array }
    }
  },
  { strict: false }
);

const DashBoardSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    tasks: {
      TaskSchema
    },
    columns: {
      ColumnSchema
    },
    columnOrder: {
      type: Array
    }
  },
  { strict: false }
);

module.exports = mongoose.model("DashBoard", DashBoardSchema);

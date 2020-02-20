const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    Task_id: {
      id: { type: String },
      content: { type: String }
    }
  },
  { strict: false }
);

const ColumnSchema = new Schema(
  {
    Columun_id: {
      id: { type: String },
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
      Columun_id: {
        id: { type: String },
        title: { type: String },
        taskIds: { type: Array }
      }
    },
    columnOrder: {
      type: Array
    }
  },
  { strict: false }
);

module.exports = mongoose.model("DashBoard", DashBoardSchema);
module.exports = mongoose.model("Task", TaskSchema);
// module.exports = mongoose.model("Column", ColumnSchema);

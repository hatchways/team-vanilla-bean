const mongoose = require("mongoose");

const DashBoardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tasks: {
    task: {
      id: String,
      content: String
    }
  },
  columns: {
    column: {
      id: String,
      title: String,
      taskIds: [String],
      tag: Number
    }
  },
  columnOrder: {
    type: [String]
  }
});

module.exports = mongoose.model("DashBoard", DashBoardSchema);

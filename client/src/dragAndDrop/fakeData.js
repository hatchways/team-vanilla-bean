export const fakeData = {
  _id: "12345",
  tasks: {
    "task-1": { _id: "task-1", content: "take out the garbage" },
    "task-2": { _id: "task-2", content: "Watch movie" },
    "task-3": { _id: "task-3", content: "Catch my phone" },
    "task-4": { _id: "task-4", content: "cookDinner" }
  },
  columns: {
    "column-1": {
      _id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
      tasks: {
        "task-1": {
          _id: "task-1",
          title: "take out the garbage",
          description: "",
          deadline: "",
          tag: ""
        },
        "task-2": { _id: "task-2", content: "Watch movie" },
        "task-3": { _id: "task-3", content: "Catch my phone" },
        "task-4": { _id: "task-4", content: "cookDinner" }
      }
    },
    "column-2": {
      _id: "column-2",
      title: "In progress",
      taskIds: []
    },
    "column-3": {
      _id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

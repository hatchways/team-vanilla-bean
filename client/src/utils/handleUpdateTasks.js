import { handleError } from "./handleAlerts";
import { Redirect } from "react-router-dom";

export const fetchOption = (method, body) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
};

export const updateTaskIndexInColumn = async (dashboardId, columnId, taskOrder) => {
  try {
    let body = { dashboardId, columnId, taskOrder };
    await fetch("/dashboard/updateTaskIndex", fetchOption("put", body));
  } catch (err) {
    handleError(err);
  }
};

export const moveTasksToOther = async (dashboardId, newStart, newFinish) => {
  try {
    let body = {
      columnSourceId: newStart._id,
      columnSourceTasks: newStart.tasks,
      columnSourceTaskOrder: newStart.taskOrder,
      columnToSourceId: newFinish._id,
      columnToTasks: newFinish.tasks,
      columnToTaskOrder: newFinish.taskOrder,
      dashboardId
    };
    await fetch("/dashboard/moveTasksToOther", fetchOption("put", body));
  } catch (err) {
    handleError(err);
  }
};

export const updateColumnIndex = async (dashboardId, columnOrder) => {
  try {
    let body = {
      dashboardId,
      columnOrder
    };
    await fetch("/dashboard/updateColumnIndex", fetchOption("put", body));
  } catch (err) {
    handleError(err);
  }
};

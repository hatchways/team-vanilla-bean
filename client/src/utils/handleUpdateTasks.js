import { handleError } from "./handleAlerts";
import { authFetch } from "../AuthService";

export const updateTaskIndexInColumn = async (dashboardId, columnId, taskOrder) => {
  try {
    let body = { dashboardId, columnId, taskOrder };
    authFetch("/dashboards/task", { method: "put", body: JSON.stringify(body) });
  } catch (err) {
    handleError(err);
  }
};

export const moveTasksToOther = async (dashboardId, newStart, newFinish, cd) => {
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
    authFetch("/dashboards/task-column", { method: "put", body: JSON.stringify(body) });
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
    authFetch("/dashboards/column", { method: "put", body: JSON.stringify(body) });
  } catch (err) {
    handleError(err);
  }
};

export const addColumn = (dashboardId, columnTitle, position, cb) => {
  try {
    console.log(position);

    let body = {
      dashboardId,
      columnTitle,
      position
    };

    authFetch("/dashboards/column", {
      method: "post",
      body: JSON.stringify(body)
    }).then(res => {
      cb(res);
    });
  } catch (err) {
    handleError(err);
  }
};

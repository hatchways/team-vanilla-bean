import { handleError } from "./handleAlerts";
import { authFetch } from "../AuthService";

//ToDo remove this after implementing create board function

export const updateTaskIndexInColumn = async (
  dashboardId,
  columnId,
  taskOrder
) => {
  let body = { dashboardId, columnId, taskOrder };
  authFetch(`/dashboards/${dashboardId}/columns/${columnId}ß/taskOrder`, {
    method: "put",
    body: JSON.stringify(body)
  }).catch(err => handleError(err));
};

export const moveTasksToOther = async (dashboardId, newStart, newFinish) => {
  const columnId = newStart._id;

  let body = {
    columnSourceId: newStart._id,
    columnSourceTasks: newStart.tasks,
    columnSourceTaskOrder: newStart.taskOrder,
    columnToSourceId: newFinish._id,
    columnToTasks: newFinish.tasks,
    columnToTaskOrder: newFinish.taskOrder,
    dashboardId
  };
  authFetch(`/dashboards/${dashboardId}/columns/${columnId}/taskColumnOrder`, {
    method: "put",
    body: JSON.stringify(body)
  }).catch(err => handleError(err));
};

export const updateColumnIndex = (dashboardId, columnOrder, columnId) => {
  let body = {
    dashboardId,
    columnOrder
  };

  authFetch(`/dashboards/${dashboardId}/columns/${columnId}/columnOrder`, {
    method: "put",
    body: JSON.stringify(body)
  }).catch(err => handleError(err));
};

//done
export const addColumn = (dashboardId, title, position, cb) => {
  let body = {
    dashboardId,
    title,
    position
  };

  authFetch(`/dashboards/${dashboardId}/columns`, {
    method: "post",
    body: JSON.stringify(body)
  })
    .then(res => {
      cb(res.result);
    })
    .catch(err => {
      handleError(err);
      return null;
    });
};

export const addDashboard = (title, cb) => {
  let body = {
    title
  };

  authFetch("/dashboards", {
    method: "post",
    body: JSON.stringify(body)
  })
    .then(res => {
      cb(res.result);
    })
    .catch(err => {
      console.log(err);
      handleError(err);
    });
};

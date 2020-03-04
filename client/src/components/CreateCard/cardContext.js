import React, { createContext, useState, useContext, useEffect } from "react";
import moment from "moment";
import { authFetch } from "../../AuthService";
import { UserContext } from "../../userContext";
import { handleError, handleSuccess } from "../../utils/handleAlerts";
import { CalendarContext } from "../../calendarContext";

const CardContext = createContext();

//To Handle state and comments globally
const CardProvider = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openCard, setOpenCard] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [openDeadline, setOpenDeadline] = useState(false);
  const [tag, setTag] = useState("");
  const [deadline, setDeadline] = useState("");
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");
  const [task, setTask] = useState("");
  const [columnId, setColumnId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  //get dashboard values from user context
  const { value1 } = useContext(UserContext);
  let [dashboard, setDashboard] = value1;
  let dashboardId = dashboard && dashboard._id;

  const handleCurrentTask = (taskId, columnId, hist) => {
    const columnName = dashboard.columns[columnId].title;
    if (!taskId) {
      setTitle("");
      setDescription("");
      setDeadline("");
      setTag("");
      setTask("");
      handleOpenCard();
    }
    if (taskId) {
      setTask(taskId);
      fetchCard(taskId, columnId, dashboard);
    }
    routeChange(taskId, columnId, dashboardId, hist);
    setColumnId(columnId);
    setColumnName(columnName);
  };

  const routeChange = (taskId, columnId, dashboardId, hist) => {
    if (!taskId) {
      hist.push("/dashboards");
    } else {
      let path = `/dashboards/${dashboardId}/columns/${columnId}/tasks/${taskId}`;
      hist.push(path);
    }
  };

  const fetchCard = (taskId, columnId, dashboard) => {
    const task = dashboard.columns[columnId].tasks[taskId];
    const columnName = dashboard.columns[columnId].title;
    if (task) {
      handleOpenCard();
      setTask(taskId);
      setTitle(task.title);
      setDescription(task.description);
      setTag(task.tag);
      setDeadline(task.deadline);
      setColumnName(columnName);
      setColumnId(columnId);
      task.deadline && setOpenDeadline(true);
    }
  };

  const handleSubmit = () => {
    if (!title) {
      setError(true);
    } else {
      if (!task) {
        const createTask = {
          deadline,
          title,
          description,
          tag
        };
        authFetch(`dashboards/${dashboardId}/columns/${columnId}/tasks`, {
          method: "POST",
          body: JSON.stringify(createTask)
        })
          .then(res => updateUser(res))
          .then(() => handleCloseCard())
          .then(() => handleSuccess(`${title} has been saved!`))
          .catch(err => {
            handleError(err);
          });
      } else {
        const updatedTask = {
          deadline,
          title,
          description,
          tag
        };

        if (deadline) {
          authFetch(
            `/calendar/${dashboardId}/columns/${columnId}/tasks/${task}`,
            {
              method: "PUT",
              body: JSON.stringify({ deadline, title })
            }
          );
        }

        authFetch(
          `/dashboards/${dashboardId}/columns/${columnId}/tasks/${task}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedTask)
          }
        )
          .then(res => updateUser(res))
          .then(() => handleCloseCard())
          .then(() => handleSuccess(`${title} has been updated!`))
          .catch(err => {
            handleError(err);
          });
      }
    }
  };

  const updateUser = res => {
    setDashboard(res.result);
  };

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    setOpenTag(false);
    setOpenDeadline(false);
    setOpenDelete(false);
    setError(false);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleOpenTag = () => {
    setOpenTag(true);
  };

  const handleTagChange = color => {
    setTag(color);
    setOpenTag(false);
  };

  const handleDeadlineChange = date => {
    if (!date) {
      setDeadline(moment().format("YYYY-MM-DD"));
    } else {
      setDeadline(moment(date).format("YYYY-MM-DD"));
    }
  };

  const handleOpenDeadline = () => {
    if (!openDeadline) {
      if (!deadline) {
        setDeadline(moment().format("YYYY-MM-DD"));
      }
      setOpenDeadline(true);
    } else {
      setDeadline("");
      setOpenDeadline(false);
    }
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = history => {
    authFetch("", {
      method: "DELETE"
    })
      .then(res => updateUser(res))
      .then(history.push("/dashboards"))
      .then(() => handleCloseCard())
      .then(() => handleSuccess(`Task has been deleted`))
      .catch(err => {
        handleError(err);
      });
  };

  return (
    <CardContext.Provider
      value={{
        title,
        task,
        handleTitleChange,
        handleCurrentTask,
        handleCloseCard,
        openCard,
        error,
        handleOpenCard,
        columnName,
        description,
        handleSubmit,
        handleDescriptionChange,
        tag,
        openTag,
        handleOpenTag,
        handleTagChange,
        deadline,
        handleDeadlineChange,
        handleOpenDeadline,

        openDeadline,
        fetchCard,
        handleOpenDelete,
        handleCloseDelete,
        handleDelete,
        openDelete
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export { CardProvider, CardContext };

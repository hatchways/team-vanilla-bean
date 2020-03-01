import React, { createContext, useState, useContext, useMemo } from "react";
import moment from "moment";
import { authFetch } from "../../AuthService";
import { UserContext } from "../../userContext";
import { handleError, handleSuccess } from "../../utils/handleAlerts";

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
  const [taskId, setTaskId] = useState("");
  const [columnId, setColumnId] = useState("");

  //get dashboard values from user context
  const { value1 } = useContext(UserContext);
  const [dashboard] = value1;
  const dashboardId = dashboard && dashboard._id;

  console.log(dashboardId);

  const handleCurrentTask = (taskId, columnId) => {
    const columnName = dashboard.columns[columnId].title;
    if (!taskId) {
      setTitle("");
      setDescription("");
      setDeadline("");
      setTag("");
      setTaskId("");
    }
    if (taskId) {
      setTaskId(taskId);
      fetchCard(taskId, columnId);
    }
    setColumnId(columnId);
    setColumnName(columnName);
    handleOpenCard();
  };

  const fetchCard = (taskId, columnId) => {
    columnId = "column-1";
    taskId = "task-1";
    const task = dashboard.columns[columnId].tasks[taskId];
    setTitle(task.title);
    setDescription(task.description);
    setTag(task.tag);
    setDeadline(task.deadline);
    task.deadline && setOpenDeadline(true);
  };

  const handleSubmit = () => {
    if (!title) {
      setError(true);
    } else {
      if (!taskId) {
        const createTask = {
          columnId,
          dashboardId,
          deadline,
          title,
          description,
          tag
        };
        authFetch("/dashboards/task", {
          method: "POST",
          body: JSON.stringify(createTask)
        })
          .then(res => handleUpdateContext(res))
          .then(handleCloseCard())
          .then(() => handleSuccess(`${title} has been saved!`))
          .catch(err => {
            handleError(err);
          });
      } else {
        const updatedTask = {
          columnId,
          dashboardId,
          taskId,
          deadline,
          title,
          description,
          tag
        };
        authFetch("/dashboards/task", {
          method: "PUT",
          body: JSON.stringify(updatedTask)
        })
          .then(() => handleCloseCard())
          .then(() => handleSuccess(`${title} has been updated!`))
          .catch(err => {
            handleError(err);
          });
      }
    }
  };

  const handleUpdateContext = res => {
    console.log(res);
  };

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    setOpenTag(false);
    setOpenDeadline(false);
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

  return (
    <CardContext.Provider
      value={{
        title,
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
        openDeadline
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export { CardProvider, CardContext };

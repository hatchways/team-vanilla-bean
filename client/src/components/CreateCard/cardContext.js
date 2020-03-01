import React, { createContext, useState, useContext } from "react";
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
  const [task, setTask] = useState("");
  const [columnId, setColumnId] = useState("");

  //get dashboard values from user context
  const { value1 } = useContext(UserContext);
  const [dashboard, setDashboard] = value1;
  const dashboardId = dashboard && dashboard._id;

  const handleCurrentTask = (taskId, columnId) => {
    const columnName = dashboard.columns[columnId].title;
    if (!taskId) {
      setTitle("");
      setDescription("");
      setDeadline("");
      setTag("");
      setTask("");
    }
    if (taskId) {
      setTask(taskId);
      fetchCard(taskId, columnId);
    }
    setColumnId(columnId);
    setColumnName(columnName);
    handleOpenCard();
  };

  const fetchCard = (taskId, columnId) => {
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
          .then(handleCloseCard())
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
        authFetch(
          `dashboards/${dashboardId}/columns/${columnId}/tasks/${task}`,
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

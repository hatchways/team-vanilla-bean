import React, { createContext, useState, useContext } from "react";
import moment from "moment";
import authFetch from "../../AuthService";
import { UserContext } from "../userContext";

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
  const [taskID, setTaskID] = useState("");

  const handleCurrentTask = (id, columnName) => {
    setColumnName(columnName);
    setTaskID(id);
    fetchCard(id);
    handleOpenCard();
  };

  const createNewCard = name => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setTag("");
    setTaskID("");
    setColumnName(name);
    handleOpenCard();
  };

  const fetchCard = id => {
    setTitle("title with id " + id);
    setDescription("description with id " + id);
    setTag("");
    setDeadline("");
  };

  const handleSubmit = () => {
    if (!title) {
      setError(true);
    } else {
      if (!taskID) {
        console.log(value1);
        //POST REQUEST . in body:
        //dashboards/task
        // dashboardId, columnId
        alert("create");
      } else {
        //PUT REQUEST . in body:
        //dashboards/task
        // dashboardId, columnId, taskId
        console.log("submitted Data = ", deadline, tag, title, description);
      }
    }
  };

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    setOpenTag(false);
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
        createNewCard,
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

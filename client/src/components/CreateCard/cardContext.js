import React, { createContext, useState } from "react";
import moment from "moment";

const CardContext = createContext();

//To Handle state and comments globally
const CardProvider = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openCard, setOpenCard] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [tag, setTag] = useState("");
  const [deadline, setDeadline] = useState("");
  const [columnName, setColumnName] = useState("");

  const handleCurrentTask = (id, columnName) => {
    setColumnName(columnName);
    fetchCard(id);
    handleOpenCard();
  };

  const createNewCard = name => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setTag("");
    setColumnName(name);
    handleOpenCard();
  };

  const fetchCard = id => {
    setTitle("title with id " + id);
    setDescription("description with id " + id);
    setTag("");
    setDeadline("");
  };

  const handleOpenCard = () => {
    setOpenCard(true);
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    setOpenTag(false);
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
    setDeadline(moment(date).format("YYYY-MM-DD"));
  };

  return (
    <CardContext.Provider
      value={{
        title,
        handleTitleChange,
        handleCurrentTask,
        handleCloseCard,
        openCard,
        handleOpenCard,
        columnName,
        createNewCard,
        description,
        handleDescriptionChange,
        tag,
        openTag,
        handleOpenTag,
        handleTagChange,
        deadline,
        handleDeadlineChange
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export { CardProvider, CardContext };

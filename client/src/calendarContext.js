import React, { createContext, useState, useContext, useEffect } from "react";

export const CalendarContext = createContext();

//To Handdle state and comments globally
const CalendarProvider = props => {
  const [deadlines, setDeadlines] = useState(null);
  const [boardId, setBoardId] = useState(null);

  return (
    <CalendarContext.Provider
      value={{
        calendar: [deadlines, setDeadlines],
        board: [boardId, setBoardId]
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;

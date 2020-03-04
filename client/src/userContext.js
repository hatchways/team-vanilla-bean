import React, { createContext, useState } from "react";

export const UserContext = createContext();

//To Handdle state and comments globally
const UserProvider = props => {
  const [taskState, setTaskState] = useState("");
  const [isInDashboard, setIsInDashboard] = useState(true);
  const [dbTitles, setDbTitles] = useState({});

  return (
    <UserContext.Provider
      value={{
        value1: [taskState, setTaskState],
        topNavState: [isInDashboard, setIsInDashboard],
        dashboardTitles: [dbTitles, setDbTitles]
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

import React, { createContext, useState } from "react";

export const UserContext = createContext();

//To Handdle state and comments globally
const UserProvider = props => {
  const [taskState, setTaskState] = useState(null);
  const [isInDashboard, setIsInDashboard] = useState(true);

  return (
    <UserContext.Provider
      value={{
        value1: [taskState, setTaskState],
        topNavState: [isInDashboard, setIsInDashboard]
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

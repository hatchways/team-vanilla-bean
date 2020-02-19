import React, { createContext, useState } from "react";
import { newFakeData } from "../dragAndDrop/fakeData";

export const UserContext = createContext();

//To Handdle state and comments globally
const UserProvider = props => {
  const [taskState, setTaskState] = useState(newFakeData);

  return (
    <UserContext.Provider value={{ value1: [taskState, setTaskState] }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./userContext";
import { authFetch } from "./AuthService";

export const CalendarContext = createContext();

//To Handdle state and comments globally
const CalendarProvider = props => {
  const [deadlines, setDeadlines] = useState(null);

  const { value1 } = useContext(UserContext);
  let [dashboard] = value1;
  let loadedDashboardId = dashboard && dashboard._id;
  const [dashboardId, setDashboardId] = useState(loadedDashboardId);

  useEffect(() => {
    if (!dashboardId) {
      authFetch(`/dashboards`).then(res => setDashboardId(res.result._id));
    }
  }, [dashboardId]);

  return (
    <CalendarContext.Provider
      value={{
        calendar: [deadlines, setDeadlines],
        dashboardId
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;

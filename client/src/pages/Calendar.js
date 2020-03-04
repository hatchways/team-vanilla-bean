import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";
import { UserContext } from "../userContext";
import { authFetch } from "../AuthService";
import moment from "moment";

const CardsCalendar = props => {
  const { value1 } = useContext(UserContext);
  let [dashboard] = value1;
  let loadedDashboardId = dashboard && dashboard._id;
  const [dashboardId, setDashboardId] = useState(loadedDashboardId);
  const [events, setEvents] = useState([]);

  const fetchCalendar = async () => {
    try {
      const res = await authFetch(`/calendar/${dashboardId}`);
      setEvents(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!dashboardId) {
      authFetch(`/dashboards`)
        .then(res => setDashboardId(res.result._id))
        .then(fetchCalendar);
    } else {
      fetchCalendar();
    }
  }, [dashboardId]);

  const eventDrop = info => {
    const deadline = moment(info.event.start).format("YYYY-MM-DD");
    const title = info.event.title;
    const columnId = info.event.extendedProps.column;
    const task = info.event.extendedProps.task;

    authFetch(`/calendar/${dashboardId}/columns/${columnId}/tasks/${task}`, {
      method: "PUT",
      body: JSON.stringify({ deadline, title })
    });

    authFetch(`/dashboards/${dashboardId}/columns/${columnId}/tasks/${task}`, {
      method: "PUT",
      body: JSON.stringify({ deadline, title })
    });
  };

  const eventClick = info => {
    const columnId = info.event.extendedProps.column;
    const task = info.event.extendedProps.task;

    console.log(columnId, task, dashboardId);

    props.history.push(
      `/dashboards/${dashboardId}/columns/${columnId}/tasks/${task}`
    );
    console.log(props.history);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <FullCalendar
          defaultView="dayGridMonth"
          height={550}
          header={{
            left: "",
            center: "title",
            right: "prev,next"
          }}
          events={events}
          editable={true}
          eventDrop={info => eventDrop(info)}
          eventClick={info => eventClick(info)}
          plugins={[dayGridPlugin, interactionPlugin]}
          fixedWeekCount={false}
        />
      </Container>
    </div>
  );
};

export default CardsCalendar;

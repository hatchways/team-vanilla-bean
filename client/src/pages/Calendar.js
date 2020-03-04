import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";
import { authFetch } from "../AuthService";
import { CalendarContext } from "../calendarContext";
import moment from "moment";

const CardsCalendar = props => {
  const { calendar, dashboardId } = useContext(CalendarContext);
  let [deadlines, setDeadlines] = calendar;

  useEffect(() => {
    authFetch(`/calendar/${dashboardId}`).then(res => {
      if (res) {
        setDeadlines(res);
      }
    });
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

    props.history.push(
      `/calendar/${dashboardId}/columns/${columnId}/tasks/${task}`
    );
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
          events={deadlines}
          editable={true}
          eventBackgroundColor="white"
          eventTextColor="black"
          eventBorderColor="rgba(117,156,252,0.3)"
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

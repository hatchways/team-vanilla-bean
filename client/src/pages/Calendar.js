import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";
import { authFetch } from "../AuthService";
import { CalendarContext } from "../calendarContext";
import moment from "moment";

const Calendar = props => {
  const { calendar, board } = useContext(CalendarContext);
  let [deadlines, setDeadlines] = calendar;
  let [boardId] = board;

  useEffect(() => {
    authFetch(`/calendar/${boardId}`).then(res => {
      if (res) {
        setDeadlines(res);
      }
    });
  }, [boardId]);

  const eventDrop = info => {
    const columnId = info.event.extendedProps.column;
    const task = info.event.extendedProps.task;

    const card = {
      deadline: moment(info.event.start).format("YYYY-MM-DD"),
      title: info.event.title,
      tag: info.event.extendedProps.tag,
      description: info.event.extendedProps.description
    };

    authFetch(`/calendar/${boardId}/columns/${columnId}/tasks/${task}`, {
      method: "PUT",
      body: JSON.stringify(card)
    });

    authFetch(`/dashboards/${boardId}/columns/${columnId}/tasks/${task}`, {
      method: "PUT",
      body: JSON.stringify(card)
    });
  };

  const eventClick = info => {
    const columnId = info.event.extendedProps.column;
    const task = info.event.extendedProps.task;

    props.history.push(
      `/calendar/${boardId}/columns/${columnId}/tasks/${task}`
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

export default Calendar;

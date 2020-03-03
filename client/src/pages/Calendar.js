import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CardsCalendar = () => {
  return (
    <FullCalendar
      defaultView="dayGridMonth"
      header={{
        left: "",
        center: "title",
        right: "prev,next today"
      }}
      plugins={[dayGridPlugin]}
    />
  );
};

export default CardsCalendar;

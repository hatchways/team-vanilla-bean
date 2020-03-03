import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Navbar from "./Navbar";

const CardsCalendar = () => {
  return (
    <div>
      <Navbar />
      <FullCalendar
        defaultView="dayGridMonth"
        height={550}
        header={{
          left: "",
          center: "title",
          right: "prev,next today"
        }}
        fixedWeekCount={false}
        plugins={[dayGridPlugin]}
      />
    </div>
  );
};

export default CardsCalendar;

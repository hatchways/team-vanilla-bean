import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Container } from "@material-ui/core";
import Navbar from "./Navbar";

const CardsCalendar = () => {
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
            right: "prev,next today"
          }}
          fixedWeekCount={false}
          plugins={[dayGridPlugin]}
        />
      </Container>
    </div>
  );
};

export default CardsCalendar;

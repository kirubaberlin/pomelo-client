import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const ConsultantCalendar = ({ bookedDates }) => {
  if (!bookedDates) {
    return "No up coming sessions";
  }

  const events = bookedDates.map((date) => ({
    title: "Booked",
    start: date,
  }));

  return (
    <div className="consultant-calendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default ConsultantCalendar;

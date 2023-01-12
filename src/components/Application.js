import React from "react";
import { useState } from "react";

import "components/Application.scss";
import Appointment, {appointments} from 'components/Appointment/index';

import DayList from "./DayList";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {

  const [day, setDay] = useState('Monday');

  // console.log('application', Object.values(appointments));

  const listItems = Object.values(appointments).map((app) => {
    // console.log(app.interview);
    const interview = {...app.interview}
    // console.log('inter', interview);
    return (
      < Appointment 
      key={app.id}
      {...app}
      />
    );
  });
  // console.log('list item', listItems);
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{" "}
      </section>
      <section className="schedule">
     

        {listItems}
        <Appointment key="last" time="5pm" />
       
      </section>
    </main>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
import DayList from "./DayList";

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state , state.day);
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  
  const listItems = dailyAppointments.map((app) => {
    const interviewers = getInterviewersForDay(state, state.day)
    console.log('app', app);
    const interview = getInterview(state, app.interview);
    return <Appointment key={app.id} {...app} interview={interview} interviewers={interviewers} />;
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      console.log(all[2].data);
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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

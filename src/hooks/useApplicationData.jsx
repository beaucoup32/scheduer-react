import { useState, useEffect } from "react";
import axios from "axios";
import updateSpots from "../helpers/updateSpots";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    }).catch((err) => console.log(err))
  }, []);

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        const days = updateSpots(state, appointments)
        return setState(history => ({...history, appointments, days}));
      })
  };

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments)
        return setState(prev => ({...prev, appointments, days}))
      })
  }


  // return obj w 4 keys
  // state, setDay, bookInterview, cancelInterview
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

export default useApplicationData

const updateSpots = (state, appointments) => {

  const dayObj = state.days.find(day => day.name === state.day);

  // count null apps
  let spots = 0;
  for (let id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }

  const day = {...dayObj, spots}

  return (
    state.days.map(d => d.name === state.day ? day : d)
  )
}

export default updateSpots;
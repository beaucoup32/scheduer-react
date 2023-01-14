
export const getAppointmentsForDay = (state, day) => {
  if (state.days.length === 0) {
    return [];
  }

  if (!day) {
    return [];
  }

  const appEntries = Object.entries(state.appointments);

  const filteredDays = state.days.filter((da) => da.name === day);

  if (filteredDays.length === 0) {
    return [];
  }

  const select = appEntries.filter((appointment) => {
    for (let app of [...filteredDays[0].appointments]) {
      if (Number(appointment[0]) === app) {
        return true;
      }
    }
  });

  const formatted = select.map((item) => {
    return item[1];
  });

  return formatted;
};

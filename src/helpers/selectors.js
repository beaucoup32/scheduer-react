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
    return false;
  });

  const formatted = select.map((item) => {
    return item[1];
  });

  return formatted;
};


export const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  
  for (let interviewer in state.interviewers) {
    if (interview.interviewer === Number(interviewer)) {
      const appointment = {
        ...interview,
        interviewer: { ...state.interviewers[interviewer] },
      };
      return appointment;
    }
  }
  return null;
};

export const getInterviewersForDay = (state, day) => {
  if (state.days.length === 0) {
    return [];
  }

  if (!day) {
    return [];
  }

  const interArr = Object.values(state.interviewers);

  const filteredDays = state.days.filter((da) => da.name === day);

  if (filteredDays.length === 0) {
    return [];
  }

  const select = interArr.filter((interviewer) => {
    for (let app of [...filteredDays[0].interviewers]) {
      if (interviewer.id === app) {
        return true;
      }
    }
    return false;
  });

  return select;
}

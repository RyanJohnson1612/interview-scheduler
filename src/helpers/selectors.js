export function getAppointmentsForDay(state, day) {
  let appointments = [];
  state.days.forEach((dayState) => {
    if (dayState.name === day) {
      appointments = dayState.appointments
    }
  })
  
  if (appointments.length > 0) {
    let filteredAppoinments = appointments.map((appointment) => state.appointments[appointment])
    return filteredAppoinments;
  } 
  return appointments;
}

export function getInterview(state, interview) {
  if(interview) {
    return {...interview, interviewer: state.interviewers[interview.interviewer]};
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  let interviewers = [];
  state.days.forEach((dayState) => {
    if (dayState.name === day) {
      interviewers = dayState.interviewers
    }
  })
  
  if (interviewers.length > 0) {
    let filteredAppoinments = interviewers.map((interviewer) => state.interviewers[interviewer])
    return filteredAppoinments;
  } 
  return interviewers;
}
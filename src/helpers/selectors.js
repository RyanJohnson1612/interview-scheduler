/* Gets all appointments for current day 
 * @param: {object} 'state' the current state from useApplicationData hook
 * @param: {string} 'day' the day to get appointments for 
 * @return {array} 
 */
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

/* Gets interviewer details for interview and adds it to interview object
 * @param: {object} 'state' the current state from useApplicationData hook
 * @param: {object} 'interview' the interview object to get interviewer details for
 * @return {object || null} 
 */
export function getInterview(state, interview) {
  if(interview) {
    return {...interview, interviewer: state.interviewers[interview.interviewer]};
  }
  return null;
}

/* Gets the available interviewers for the current day 
 * @param: {object} 'state' the current state from useApplicationData hook
 * @param: {string} 'day' the day to get available interviews for
 * @return {array} 
 */
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
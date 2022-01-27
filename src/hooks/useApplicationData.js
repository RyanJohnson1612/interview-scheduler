import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";

/* Handles fetching and updating of appilcation data and state
 * @return {object} returns state object, setDay(), bookInterview() and deleteInterview() 
 */
function useApplicationData() {
  // Initialize state object
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  /* Gets the initial data for application then updates state
   * @return {void}
   */ 
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers}));
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  // Watch for changes to appointments state, then udpate spots count
  useEffect(() => {
    updateSpots();
  }, [state.appointments])

  /* Sets state of day to day param 
   * @param: {string} day to set 
   * @return {void}
   */
  const setDay = (day) => {
    setState({...state, day})
  };

  /* Makes put request to the appointment api, then updates local appointment state
   * @param: {number} id of the interview to book 
   * @param: {object} interview object containing data to insert into db 
   * @return {Promise}
   */
  const bookInterview = (id, interview) => {
    return (
      axios.put(`/api/appointments/${id}`, {interview})
        .then(res => {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };
      
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          setState(prev => ({...prev, appointments}));
        })
    )
  };

  /* Makes delete request to the appointment api, then updates local appointment state
   * @param: {number} id of the interview to delete 
   * @return {Promise}
   */
  const deleteInterview = (id) => {
    return (
      axios.delete(`/api/appointments/${id}`)
        .then(res => {
          const appointment = {
            ...state.appointments[id] 
          };
      
          const appointments = {...state.appointments, [id]: {...appointment, interview: null}}
          setState(prev => ({...prev, appointments}));
        })
    ) 
  }

  /* Updates number of spots for current day, called when an interview is booked or deleted
   * @return {void}
   */
  const updateSpots = () => {
    const updatedSpots = getAppointmentsForDay(state, state.day).filter(appointment => appointment.interview === null).length; 
    const index = state.days.findIndex(day => day.name === state.day);
    const updatedDay = {...state.days[index], spots: updatedSpots};
    const updatedDays = [...state.days.slice(0, index), updatedDay, ...state.days.slice(index + 1)];

    setState(prev => ({...prev, days: updatedDays}));
  }

  return { state, setDay, bookInterview, deleteInterview };
}

export default useApplicationData;
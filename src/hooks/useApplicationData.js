import { useState, useEffect } from 'react';
import axios from 'axios';

function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Get all inital application data 
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

  const setDay = (day) => {
    setState({...state, day})
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, {interview})
        .then(res => {
          setState(prev => ({...prev, appointments}));
        })
    )
  };

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id] 
    };

    const appointments = {...state.appointments, [id]: {...appointment, interview: null}}
    
    return (
      axios.delete(`/api/appointments/${id}`)
        .then(res => {
          setState(prev => ({...prev, appointments}))
        })
    ) 
  }

  return { state, setDay, bookInterview, deleteInterview };
}

export default useApplicationData;
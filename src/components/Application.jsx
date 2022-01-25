import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});
  let dailyAppointments = [];

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
  },[])

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
        setState({
          ...state,
          appointments
        });
      })
      .catch(err => {
        console.log(err);
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
          setState({
            ...state,
            appointments
          })
        })
        .catch(err => {
          console.log(err);
        })
    )
  }
  
  dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  })

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
            days={state.days}
            value={state.day}
            onChange={setDay}  
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}

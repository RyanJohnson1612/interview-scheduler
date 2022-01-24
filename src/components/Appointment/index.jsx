import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import './styles.scss';

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const STATUS = "STATUS"
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(STATUS);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  } 

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}  
      {mode === SHOW && <Show  {...props.interview} />}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === STATUS && <Status message="Saving..." />}
    </article>
  );
}

export default Appointment;
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import './styles.scss';

function Appointment(props) {
  // Mode variables
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // useVisualMode hook state and functions
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  /* Creates interview object, then calls prop bookInterview() and responds based on returned promise 
   * @param: {string} 'student' name of the student
   * @param: {number} 'interviewer' id of the interviewer 
   * @return {void} 
   */
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  } 

  /* Calls prop deleteInterview() and responds based on returned promise 
   * @param: {number} id of the interview to delete
   * @return {void} 
   */
  const destroy = (id) => {
    transition(DELETING, true);

    props
      .deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {/* Default modes */}
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)}/>
      )}
      {mode === SHOW && (
        <Show 
          {...props.interview}  
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {/* Form modes */}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form 
          {...props.interview}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}

      {/* Confirm modes */}
      {mode === CONFIRM && (
        <Confirm 
          id={props.id}
          message="Are you sure you want to delete this interview"
          onCancel={() => transition(SHOW)}
          onConfirm={destroy}
        />
      )}

      {/* Status modes */}
      {mode === SAVING && (
        <Status message="Saving..." />
      )}
      {mode === DELETING && (
        <Status message="Deleting..." />
      )}
      

      {/* Error modes */}
      {mode === ERROR_SAVE && (
        <Error 
          message="Error saving appointment" 
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Error deleting appointment" 
          onClose={() => back()}
        />
      )}
    </article>
  );
}

export default Appointment;
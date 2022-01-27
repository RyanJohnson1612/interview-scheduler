import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';

function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {
          props.interviewers.map((interviewer) => {
            return(
              <InterviewerListItem
                name={interviewer.name}
                avatar={interviewer.avatar}
                setInterviewer={() => props.onChange(interviewer.id)}
                selected={props.value === interviewer.id}
                key={interviewer.id}
              />
            );
          })
        }
      </ul>
    </section>
  );
}


export default InterviewerList;
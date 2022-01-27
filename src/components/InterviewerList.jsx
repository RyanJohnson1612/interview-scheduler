import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';
import PropTypes from 'prop-types';

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

InterviewerList.propTypes = {
  interviews: PropTypes.array.isRequired
};

export default InterviewerList;
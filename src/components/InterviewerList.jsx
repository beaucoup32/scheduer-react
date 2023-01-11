import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {


  // console.log('interviewer list props:',props);
  const listItems = props.interviewers.map((interviewer) => {

    const data = {
      key: interviewer.id,
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar
    }
    return (
      <InterviewerListItem 
      {...data}
      selected={data.id === props.value}
      setInterviewer={() => {props.onChange(data.id)}}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listItems}
      </ul>
    </section>
  );
};

export default InterviewerList;
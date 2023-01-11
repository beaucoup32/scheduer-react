import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem.scss";

const InterviewerListItem = (props) => {

  // console.log('inter list item :', props);
  const IntListItemClass = classNames('interviewers__item', {
   'interviewers__item--selected': (props.selected ? true : false),

  })

  return (
    <li 
    className={IntListItemClass} 
    onClick={props.setInterviewer}
    selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;

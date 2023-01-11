import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

const DayList = function (props) {

  // console.log('Day List props', props);

  const listItems = props.days.map((day) => {
    const data = {
      key:day.id,
      name:day.name,
      spots:day.spots
    };     

    return (
      <DayListItem 
      {...data} 
      selected={data.name === props.day}
      setDay={props.setDay}
      />
    );
    
  });

  return (
  <ul>
    {listItems }
  </ul>
  );
};

export default DayList;

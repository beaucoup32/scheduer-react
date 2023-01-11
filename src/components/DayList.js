import React from "react";
import DayListItem from "./DayListItem";

const DayList = function (props) {
  const listItems = props.days.map((day) => {
    const data = {
      key: day.id,
      name: day.name,
      spots: day.spots,
    };

    return (
      <DayListItem
        {...data}
        selected={data.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{listItems}</ul>;
};

export default DayList;
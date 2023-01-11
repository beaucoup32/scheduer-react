import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  
  const dayItemClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0 ? true: false),
  });
  
  // const formatSpots = function(props) {
  //   if (props.spots === 0) {
  //      return 'no spots remaining';
  //   }

  //   if (props.spots === 1) {
  //     return `${props.spots} spot remaining`;
  //   }

  //   return `${props.spots} spots remaining`;
  // }

  return (
    <li className={dayItemClass}
       onClick={() => props.setDay(props.name)}
       selected={props.selected}
       >
      <h2 className="text--regular">{props.name}</h2> 
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}      
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}

    </li>
  );
}
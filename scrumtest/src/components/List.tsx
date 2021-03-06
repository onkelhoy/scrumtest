import React from 'react';

import 'styles/list.css';
import { STATES } from './Brain';

export interface Props {
  count:number,
  state:STATES,
  score:number,
  loadQuestion:(index?:number)=>void;
}

export default function View ({ count, score, state, loadQuestion }:Props) {
  const [selected, setSelected] = React.useState(-1);

  function submit(index:number) {
    if (index <= score) {
      loadQuestion(index);
      setSelected(index);
    }
  }

  return (
    <div className="list-view">
      <h1>SCRUM<sub>test</sub></h1>

      <div className="container">
      <ul>
        {new Array(count).fill(0).map((v, index) => (
          <li 
            key={index}
            tabIndex={index + 2}
            onClick={() => state === STATES.notification ? null : submit(index)}
            className={[
              selected === index ? 'selected' : '',
              index <= score ? 'available' : 'disabled',
              state === STATES.notification ? 'notification' : ''
            ].join(' ')}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
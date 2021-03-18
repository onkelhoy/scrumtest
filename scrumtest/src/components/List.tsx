import React from 'react';

import 'styles/list.css';

export interface Props {
  count:number,
  score:number,
  loadQuestion:(index?:number)=>void;
}

export default function View ({ count, score, loadQuestion }:Props) {
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

      <ul>
        {new Array(count).fill(0).map((v, index) => (
          <li 
            key={index}
            tabIndex={index + 2}
            onClick={() => submit(index)}
            className={[
              selected === index ? 'selected' : '',
              index <= score ? 'available' : ''
            ].join(' ')}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
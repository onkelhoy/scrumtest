import React from 'react';

import 'styles/question.css';
import { IQuestion } from 'types/question';

export interface Props {
  question:IQuestion
}

type Answers = {
  [key:number]:boolean
}

enum ErrorTypes {
  nothing,
  answer,
  picking,
}

export default function View ({ question }:Props) {
  const [error, setError] = React.useState(ErrorTypes.picking);
  const [answers, setAnswers] = React.useState({} as Answers);

  function toggleAnswer(index:number) {
    const copy = { ...answers };
    if (copy[index])
      delete copy[index];

    copy[index] = true;
    setAnswers(copy);

    if (Object.keys(copy).length !== question.answers.length) 
      setError(ErrorTypes.picking);
  }

  function submit() {
    console.log('we are picking these', answers);
  }

  const size = Object.keys(answers).length;
  const classList = ['question'];
  return (
    <div className={classList.join(' ')}>
      <h4>Question:</h4>
      <div className="frame">
        <h1>{question.text}</h1>
        <span></span>
      </div>

      {error === ErrorTypes.answer && <em style={{color:'red'}}>Your answers are wrong!</em>}

      <button onClick={submit} className={error === ErrorTypes.nothing ? 'success' : 'error'}>
        <span>{size}</span>/<span>{question.answers.length}</span> Answers
        {/* {!question.desiredAnswers && <><span>{count}</span> out of <span>{question.options.length}</span> Answers Choosen</>} */}
      </button>

      <h4>Options</h4>
      <ul>
        {question.options.map((option, index) => 
          <li 
            key={option.toString()} 
            className={answers[index] ? 'selected' : ''} 
            onClick={() => toggleAnswer(index)}
          >
            {option}
          </li>
        )}
      </ul>
    </div>
  )
}
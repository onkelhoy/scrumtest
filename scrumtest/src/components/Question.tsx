import React from 'react';

import 'styles/question.css';
import { IQuestion } from 'types/question';

export interface Props {
  question:IQuestion,
  index: number,
  total: number,
  Answer: (answers:number[]) => boolean;
}

type Answers = {
  [key:number]:boolean
}

enum ErrorTypes {
  nothing,
  answer = "answer",
  picking = 2,
}

export default function View ({ question, Answer, index, total }:Props) {
  const [error, setError] = React.useState(ErrorTypes.picking);
  const [loading, setLoading] = React.useState(false);
  const [answers, setAnswers] = React.useState({} as Answers);
  const [errors, setErrors] = React.useState({} as Answers);
  const [success, setSuccess] = React.useState({} as Answers);

  const timer = React.useRef<null | number>(null);

  function toggleAnswer(index:number) {
    if (!loading) {
      const copy = { ...answers };
      if (copy[index])
        delete copy[index];
      else copy[index] = true;
  
      setAnswers(copy);
  
      if (Object.keys(copy).length !== question.answers.length) 
        setError(ErrorTypes.picking);
      else setError(ErrorTypes.nothing);
    }
  }

  function submit() {
    const ans = Object.keys(answers).map(v => Number(v));

    setLoading(true);
    timer.current = window.setTimeout(() => {
      const correct = {} as Answers;
      const falsly = {} as Answers;

      for (const ans in answers) {
        if (question.answers.find(v => {
          if (ans === "0") console.log(v, ans, v.toString(), v.toString() === ans);
          return v.toString() === ans
        })) {
          correct[ans] = true;
        }
        else {
          falsly[ans] = true;
        }
      }

      setErrors(falsly);
      setSuccess(correct);

      if (!Answer(ans)) {
        setError(ErrorTypes.answer);
      }

      setLoading(false);
    }, 250);
  }

  React.useEffect(() => {
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    }
  }, [])

  const arr = Object.keys(answers);
  const size = arr.length;
  const classList = ['question'];

  React.useEffect(() => {
    setAnswers({});
    setErrors({});
    setSuccess({});
    setAnswers({});
    setError(ErrorTypes.picking);
  }, [question]);

  let isCorrect = true;
  for (const ans of question.answers) {
    if (!success[ans]) {
      isCorrect = false;
      break;
    }
  }

  return (
    <div className={classList.join(' ')}>
      <span id="question-info"><span>{index + 1}</span>/<span>{total}</span></span>
      <div className={`frame ${isCorrect ? 'next' : ''}`}>
        <span></span>
        <h1>{question.text}</h1>
      </div>

      <button 
        disabled={loading} 
        onClick={submit} 
        className={isCorrect ? 'qsuccess' : error === ErrorTypes.nothing ? 'success' : `error ${error}`}
      >
        <span><span>{size}</span>/<span>{question.answers.length}</span> Answers</span>
      </button>

      <ul>
        <h2>Options</h2>
        {question.options.map((option, index) => {

          const classNames = [];
          if (answers[index + 1]) {
            classNames.push('selected');

            if (errors[index + 1]) classNames.push('error');
            if (success[index + 1]) classNames.push('success');
          }
          return (
<li 
            key={option.toString()} 
            className={classNames.join(' ')} 
            onClick={() => toggleAnswer(index + 1)}
          >
            {option}
          </li>
          )
        }
          
        )}
      </ul>
    </div>
  )
}
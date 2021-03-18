import React from 'react';
import AppContext from 'AppContext';

type B = {
  [key:string]: boolean
}

export default function View () {
  const { index, questions, setIndex, score } = React.useContext(AppContext);
  const [picks, setPicks] = React.useState({} as B);
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState(false);


  const question = questions[index];
  question.desiredAnswers = question.answers.length

  function submit() {
    const pks = Object.entries(picks).filter(v => v[1]).map(v => v[0]);
    if (pks.length === question.answers.length) {
      for (let i=0; i<pks.length; i++) {
        if (pks[i] !== question.answers[i].toString()) {
          setError(true);
          return;
        }
      }

      window.localStorage.setItem('score', (score + 1).toString());

      if (index < questions.length) {
        setIndex(index + 1);
      }

      setPicks({});

      setError(false);
      return;
    }

    setError(true);
  }

  function itemClick(index:number) {
    let copy = {...picks}
    copy[index] = !copy[index];

    if (copy[index]) setCount(count + 1);
    else setCount(count - 1);

    setPicks(copy);
  }

  let buttonClassnames = 'success';
  if (error) buttonClassnames = 'error';

  if (question.desiredAnswers) {
    if (count !== question.desiredAnswers)
      buttonClassnames = 'error'
  }
  else if (count <= 0)  
    buttonClassnames = 'error'

  return (
    <section className={`question ${index !== null ? 'show' : 'hide'}`}>
      <h4>Question:</h4>
      <div>
        <h1>{question.question}</h1>
        <span></span>
      </div>

      {error && <em style={{color:'red'}}>Your answers are wrong!</em>}

      <button onClick={submit} className={buttonClassnames}>
        {question.desiredAnswers && <><span>{count}</span>/<span>{question.desiredAnswers}</span> Answers</>}
        {!question.desiredAnswers && <><span>{count}</span> out of <span>{question.options.length}</span> Answers Choosen</>}
      </button>

      <h4>Options</h4>
      <ul>
        {question.options.map((option, index) => 
          <li key={option.toString()} className={picks[index] ? 'selected' : ''} onClick={() => itemClick(index)}>{option}</li>
        )}
      </ul>
    </section>
  );
}
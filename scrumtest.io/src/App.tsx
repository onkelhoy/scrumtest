import React from 'react';

import AppContext, { IContext } from 'AppContext';
import { IQuestion } from 'types';

import List from 'components/List';
import Notification from 'components/Notification';
import Question from 'components/Question';

import 'app.css';

import data from 'data.json';

function App() {
  const questions: IQuestion[] = data;
  const [score, setScore] = React.useState(-1);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [popup, setPopup] = React.useState(false);
  

  React.useEffect(() => {
    const s = window.localStorage.getItem('score');
    if (!s) {
      setPopup(true);
    }

    setScore(Number(s) || 0);
    setIndex(Number(s) || 0)

    setLoading(false);
  }, []);

  const contextValue:IContext = {
    questions,
    score,
    index,
    setIndex,
  }

  if (loading) return <div className="loading">loading...</div>
  
  return (
    <div className="app">
      <AppContext.Provider value={contextValue}>
        <Notification popup={popup} setPopup={setPopup} />
        {/* <List hej="hejsan" /> */}
        <Question />
      </AppContext.Provider>
    </div>
  );
}

export default App;

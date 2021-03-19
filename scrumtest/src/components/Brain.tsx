import React from 'react';
import DATA from 'data.json';
import { IQuestion } from 'types/question';

import Notification from './Notification';
import Loading from './Loading';
import Question from './Question';
import List from './List';
import Blank from './Blank';


export enum STATES {
  loading,
  question,
  list,
  notification,
  blank,
}

interface State {
  score:number,
  index:number,
  state:STATES,
  finished:{[key:number]:boolean},
  question:IQuestion|null
}


export default class Brain extends React.Component<{}, State> {

  state = {
    score: 0,
    index: 0,
    finished: {},
    state: STATES.loading,
    question: null
  }

  static Timer:null | number;
  
  componentDidMount() {
    const score = window.localStorage.getItem('score');
    console.log(score)
    if (score === null) {
      this.setState({ state: STATES.notification });
    }
    else {
      console.log(STATES.list);
      this.setState({
        state: STATES.list,
        score: Number(score)
      });
    }
  }

  componentWillUnmount() {
    if (Brain.Timer) {
      window.clearTimeout(Brain.Timer);
    }
  }

  agree = () => {
    window.localStorage.setItem("score", "0");
    this.setState({ state: STATES.list, score: 0 });
  }

  disagree = () => {
    window.localStorage.clear();
    this.setState({ state: STATES.blank });
  }

  loadQuestion = (index?:number):void => {
    let _i = this.state.score;
    if (index && index <= this.state.score)
       _i = index;
    
    const question = DATA[_i] as IQuestion;
    this.setState({ question, state: STATES.question, index: _i });
  }

  Answer = (answers:number[]):boolean => {
    if (this.state.question === null) return false;
    if (answers.length === (this.state.question || { answers: [] }).answers.length) {
      for (let i=0; i<answers.length; i++) {
        if (answers[i] !== (this.state.question || { answers: [] }).answers[i]) {
          return false;
        }
      }

      if (this.state.index === this.state.score) {
        this.setState({ score: this.state.score + 1});
        window.localStorage.setItem("score", (this.state.score + 1).toString());
      }
      Brain.Timer = window.setTimeout(() => this.loadQuestion(this.state.index + 1), 1000);
      return true;
    }
    return false;
  }

  overlay() {
    switch(this.state.state) {
      case STATES.loading: 
        return <Loading />
      case STATES.question: 
        if (this.state.question) 
          return <Question index={this.state.index} total={DATA.length} Answer={this.Answer} question={this.state.question || {} as IQuestion} />
        return null;
      case STATES.notification:
        return <Notification 
                  toggle={this.state.state === STATES.notification} 
                  agree={this.agree} disagree={this.disagree} 
                />
      default:
        return null;
    }
  }

  render () {
    if (this.state.state === STATES.blank)
      return <Blank />

    const overlay = this.overlay();

    return (
      <div className="brain">
        <List score={this.state.score} state={this.state.state} count={DATA.length} loadQuestion={this.loadQuestion} />
        {overlay}
      </div>
    )
  }
}
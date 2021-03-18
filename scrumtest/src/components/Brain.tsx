import React from 'react';
import DATA from 'data.json';
import { IQuestion } from 'types/question';

import Notification from './Notification';
import Loading from './Loading';
import Question from './Question';
import List from './List';
import Blank from './Blank';


export interface Props {

}

export enum STATES {
  loading,
  question,
  list,
  notification,
  blank,
}

interface State {
  score:number,
  state:STATES,
  finished:{[key:number]:boolean},
  question:IQuestion|null
}


export default class Brain extends React.Component {

  state:State = {
    score: 0,
    finished: {},
    state: STATES.loading,
    question: null
  }

  constructor(props:Props) {
    super(props);

    console.log("useless constructor");
  }

  agree = () => {
    window.localStorage.setItem("score", "0");
    this.setState({ sate: STATES.list });
  }

  disagree = () => {
    window.localStorage.clear();
    this.setState({ sate: STATES.blank });
  }

  loadQuestion(index?:number):void {
    let _i = this.state.score;
    if (index && index <= this.state.score)
       _i = index;
    
    const question = DATA[_i] as IQuestion;
    this.setState({ question });
  }

  overlay() {
    switch(this.state.state) {
      case STATES.loading: 
        return <Loading />
      case STATES.question: 
        if (this.state.question) 
          return <Question question={this.state.question} />
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

    console.log(DATA)

    return (
      <div className="brain">
        {overlay}
        <List score={this.state.score} count={DATA.length} loadQuestion={this.loadQuestion} />
      </div>
    )
  }
}
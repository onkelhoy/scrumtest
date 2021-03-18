import React from 'react';

export interface Props {

}

interface State {
  index:number,
  score:number,
  finished:{[key:number]:boolean},
}

export default class Brain extends React.Component {

  state:State = {
    index: 0,
    score: 0,
    finished: {}
  }

  static 

  constructor(props:Props) {
    super(props);

    console.log("useless constructor");
  }
}
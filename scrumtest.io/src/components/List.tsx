import React from 'react';

export interface Props {
  hej?:string
}

export default function View (props:Props) {

  return (
    <h1>hejsan {props.hej}</h1>
  );
}
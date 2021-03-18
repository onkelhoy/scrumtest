import React from 'react';

export interface Props {
  toggle:boolean, 
  agree:()=>void, 
  disagree:()=>void,
}

export default function View ({ toggle, agree, disagree }:Props) {
  return (
    <div className={`popup ${toggle ? "show" : "hide"}`}>
      <h1>OBS</h1>
      <p>We store score on your machine</p>

      <div className="button-group">
        <button onClick={agree}>Agree</button>
        <button onClick={disagree}>Disagree</button>
      </div>
    </div>
  );
}
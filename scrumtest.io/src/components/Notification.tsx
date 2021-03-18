import React from 'react';

export interface Props {
  popup:boolean,
  setPopup:(value:boolean)=>void;
}

export default function View ({ popup, setPopup }:Props) {

  function agree() {
    window.localStorage.setItem("score", "0");
    setPopup(false);
  }

  function disagree() {
    window.localStorage.clear();
    setPopup(false);
  }

  return (
    <div className={`popup ${popup ? "show" : "hide"}`}>
      <h1>OBS</h1>
      <p>We store score on your machine</p>

      <div className="button-group">
        <button onClick={agree}>Agree</button>
        <button onClick={disagree}>Disagree</button>
      </div>
    </div>
  );
}
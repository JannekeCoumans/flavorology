import React from "react";

const AlertPopup = ({
  cancelFunction,
  cancelText,
  continueFunction,
  continueText,
  title,
  text,
}) => {
  return (
    <div className="alertPopup">
      <div className="alertPopup__content">
        <h1>{title}</h1>
        <p>{text}</p>
        <button onClick={cancelFunction}>{cancelText}</button>
        <button onClick={continueFunction}>{continueText}</button>
      </div>
    </div>
  );
};

export default AlertPopup;

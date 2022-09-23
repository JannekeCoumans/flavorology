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
        <div className="btn-wrapper">
          <button className="btn" onClick={cancelFunction}>
            {cancelText}
          </button>
          <button className="btn btn-inverse" onClick={continueFunction}>
            {continueText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;

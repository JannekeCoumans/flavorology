import React, { useEffect } from "react";

const Modal = ({ modalIsOpen, children, clickOnBackground }) => {
  useEffect(() => {
    document.body.style = "overflow-y: hidden";

    return () => {
      document.body.style = "overflow-y: auto";
    };
  }, [modalIsOpen]);

  return (
    <div className="modal">
      <div className="modal__bg" onClick={() => clickOnBackground && modalIsOpen(false)} style={{cursor: clickOnBackground ? 'cursor' : 'default'}}/>
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;

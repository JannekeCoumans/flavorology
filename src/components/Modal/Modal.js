import React, { useEffect } from "react";

const Modal = ({ modalIsOpen, children }) => {
  useEffect(() => {
    document.body.style = "overflow-y: hidden";

    return () => {
      document.body.style = "overflow-y: auto";
    };
  }, [modalIsOpen]);

  return (
    <div className="modal">
      <div className="modal__bg" onClick={() => modalIsOpen(false)} />
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;

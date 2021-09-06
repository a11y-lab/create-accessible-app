import React from "react";
import "./Modal.css";

const Modal = ({ onClose }) => {
  return (
    <div className={"modal"}>
      <button className={"close"} onClick={onClose}>
        close
      </button>
    </div>
  );
};

export default Modal;

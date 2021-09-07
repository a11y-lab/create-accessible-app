import React from "react";
import "./Modal.css";

const Modal = ({ onClose, results }) => {
  return (
    <div className={"modal"}>
      <button className={"close"} onClick={onClose}>
        close
      </button>
      <section className={"issues"}>
        <article className={"article"}>
          <h1>ISSUES</h1>
          <ul className={"list"}>
            {results?.violations?.map((item) => (
              <li key={item.id}>{item.description}</li>
            ))}
            {results?.incomplete?.map((item) => (
              <li key={item.id}>{item.description}</li>
            ))}
            {results?.violations?.length === 0 &&
              results?.incomplete?.length === 0 && (
                <li>No issues, great job!</li>
              )}
          </ul>
        </article>
        {results?.inapplicable && (
          <article className={"article"}>
            <h1>NEEDS CHECK MANUALLY</h1>
            <ul className={"list"}>
              {results?.inapplicable?.map((item) => (
                <li key={item.id}>{item.description}</li>
              ))}
            </ul>
          </article>
        )}
        <ul></ul>
      </section>
      <section className={"details"}></section>
    </div>
  );
};

export default Modal;

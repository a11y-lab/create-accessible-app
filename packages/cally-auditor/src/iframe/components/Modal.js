import React, { useState } from "react";
import Issues from "./Issues";
import "./Modal.css";
import IssueDetail from "./IssueDetail";

const Modal = ({ onClose, results }) => {
  const { violations = [], incomplete = [], inapplicable = [] } = results;

  const [selectedItem, setSelectedItem] = useState(
    violations?.[0] || incomplete?.[0] || inapplicable?.[0] || null
  );

  const failureItems = [...violations, ...incomplete];

  return (
    <div className={"modal"}>
      <button className={"close"} onClick={onClose}>
        close
      </button>
      <section className={"issues"}>
        <Issues
          title={"ISSUES"}
          list={failureItems}
          onClickIssue={(item) => setSelectedItem(item)}
        />
        {results?.inapplicable && (
          <Issues
            title={"NEEDS CHECK MANUALLY"}
            list={inapplicable}
            onClickIssue={(item) => setSelectedItem(item)}
          />
        )}
        <ul></ul>
      </section>
      <section className={"details"}>
        {selectedItem ? (
          <IssueDetail item={selectedItem} />
        ) : (
          <>Select item to learn more</>
        )}
      </section>
    </div>
  );
};

export default Modal;

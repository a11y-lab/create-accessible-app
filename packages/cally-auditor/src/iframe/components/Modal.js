import React, { useState } from "react";
import * as axe from "axe-core";
import Issues from "./Issues";
import "./Modal.css";

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
          <>
            <div className={"details-header"}>
              {selectedItem?.impact && (
                <span className={`impact-tag ${selectedItem.impact}`}>
                  {selectedItem.impact}
                </span>
              )}
              {selectedItem.description}
            </div>
            <div className={"details-body"}>
              <h2>Issue Description</h2>
              {selectedItem.help}{" "}
              <a target={"_blank"} href={selectedItem.helpUrl}>
                Learn more
              </a>
              {selectedItem?.nodes?.[0]?.target?.[0] && (
                <>
                  <h3>Element location</h3>
                  {selectedItem?.nodes?.[0]?.target?.[0]}
                </>
              )}
              {selectedItem?.nodes?.[0]?.element && (
                <>
                  <h3>Element Source</h3>
                  {
                    new axe.utils.DqElement(selectedItem?.nodes?.[0]?.element)
                      .source
                  }
                </>
              )}
              {selectedItem?.nodes?.[0] && (
                <>
                  <h3>To solve this issue, you need to...</h3>
                  {(!!selectedItem?.nodes?.[0].none?.length ||
                    !!selectedItem?.nodes?.[0].all?.length) && (
                    <>
                      <h4>Fix all of the following:</h4>
                      {[
                        ...(selectedItem?.nodes?.[0]?.none || []),
                        ...(selectedItem?.nodes?.[0]?.all || []),
                      ]?.map((item) => (
                        <div className={"node-message"}>{item.message}</div>
                      ))}
                    </>
                  )}
                  {!!selectedItem?.nodes?.[0].any?.length && (
                    <>
                      <h4>Fix any of the following:</h4>
                      {selectedItem?.nodes?.[0]?.any?.map((item) => (
                        <div className={"node-message"}>{item.message}</div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <>Select item to learn more</>
        )}
      </section>
    </div>
  );
};

export default Modal;

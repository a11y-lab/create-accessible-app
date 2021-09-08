import React, { useState } from "react";
import * as axe from "axe-core";
import "./Modal.css";

const Modal = ({ onClose, results }) => {
  const [selectedItem, setSelectedItem] = useState(
    results?.violations?.[0] ||
      results?.incomplete?.[0] ||
      results?.inapplicable?.[0] ||
      null
  );

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
              <li key={item.id} onClick={() => setSelectedItem(item)}>
                {item.description}
              </li>
            ))}
            {results?.incomplete?.map((item) => (
              <li key={item.id} onClick={() => setSelectedItem(item)}>
                {item.description}
              </li>
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
                <li key={item.id} onClick={() => setSelectedItem(item)}>
                  {item.description}
                </li>
              ))}
            </ul>
          </article>
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

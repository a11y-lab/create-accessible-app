import * as axe from "axe-core";
import React from "react";

const IssueNode = ({ item }) => {
  if (!item) {
    return null;
  }

  const {
    target: [target] = [],
    element,
    none = [],
    all = [],
    any = [],
  } = item;

  return (
    <>
      {target && (
        <>
          <h3>Element location</h3>
          {target}
        </>
      )}
      {/* DqElement is serialized HTMLElement */}
      {/* https://github.com/dequelabs/axe-core/blob/f62f0cf18f7b69b247b0b6362cf1ae71ffbf3a1b/doc/developer-guide.md#dqelement-class */}
      {element && (
        <>
          <h3>Element Source</h3>
          {new axe.utils.DqElement(element).source}
        </>
      )}
      <h3>To solve this issue, you need to...</h3>
      {(!!none?.length || !!all?.length) && (
        <>
          <h4>Fix all of the following:</h4>
          {[...none, ...all].map((checkResult) => (
            <div className={"node-message"}>{checkResult.message}</div>
          ))}
        </>
      )}
      {!!any?.length && (
        <>
          <h4>Fix any of the following:</h4>
          {any.map((checkResult) => (
            <div className={"node-message"}>{checkResult.message}</div>
          ))}
        </>
      )}
    </>
  );
};

export default IssueNode;

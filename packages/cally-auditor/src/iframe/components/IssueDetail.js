import React from "react";
import IssueNode from "./IssueNode";

const IssueDetail = ({ item }) => {
  return (
    <>
      <div className={"details-header"}>
        {item?.impact && (
          <span className={`impact-tag ${item.impact}`}>{item.impact}</span>
        )}
        {item.description}
      </div>
      <div className={"details-body"}>
        <h2>Issue Description</h2>
        {item.help}{" "}
        <a target={"_blank"} href={item.helpUrl}>
          Learn more
        </a>
        <IssueNode item={item?.nodes?.[0]} />
      </div>
    </>
  );
};

export default IssueDetail;

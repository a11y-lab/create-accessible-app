import React from "react";
const Issues = ({ title, list, onClickIssue }) => {
  return (
    <article className={"article"}>
      <h1>{title}</h1>
      {!list?.length ? (
        <div>No issues, Great job!</div>
      ) : (
        <ul className={"list"}>
          {list?.map((item) => (
            <li key={item.id} onClick={() => onClickIssue(item)}>
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
export default Issues;

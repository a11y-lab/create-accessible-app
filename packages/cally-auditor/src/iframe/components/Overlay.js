import React from "react";

const overlayStyle = {
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  height: "100%",
  width: "1024px",
  maxWidth: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  padding: "0.5rem",
  boxSizing: "border-box",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

let iframeWindow = null;

const Overlay = ({ children }) => {
  const getIframeWindow = (element) => {
    if (element) {
      const document = element.ownerDocument;
      iframeWindow = document.defaultView;
    }
  };

  return (
    <div style={overlayStyle} ref={getIframeWindow}>
      {children}
    </div>
  );
};

export default Overlay;

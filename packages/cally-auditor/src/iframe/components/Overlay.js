import React, { useState } from "react";
import Modal from "./Modal";
import Progress from "./Progress";

const overlayStyle = {
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  padding: "0px",
  boxSizing: "border-box",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

let iframeWindow = null;

const Overlay = ({ onClickOverlay, currentValue, results }) => {
  const [isShowDialog, setIsShowDialog] = useState(false);

  const getIframeWindow = (element) => {
    if (element) {
      const document = element.ownerDocument;
      iframeWindow = document.defaultView;
    }
  };

  return (
    <div style={overlayStyle} ref={getIframeWindow}>
      {isShowDialog ? (
        <Modal
          results={results}
          onClose={() => {
            onClickOverlay(false);
            setIsShowDialog(false);
          }}
        ></Modal>
      ) : (
        <div
          onClick={() => {
            onClickOverlay(true);
            setIsShowDialog(true);
          }}
        >
          <Progress value={currentValue} />
        </div>
      )}
    </div>
  );
};

export default Overlay;

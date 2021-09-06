import React from "react";
import ReactDOM from "react-dom";
import Overlay from "./components/Overlay";
import { overlayStyle } from "./styles";
import { applyStyles } from "../utils/css";
import Progress from "./components/Progress";

let iframeRoot = null;

function render({ currentValue }) {
  return (
    <Overlay>
      <Progress value={currentValue} />
    </Overlay>
  );
}

window.updateContent = function updateContent(overlayProps) {
  let renderedElement = render(overlayProps);

  if (renderedElement === null) {
    ReactDOM.unmountComponentAtNode(iframeRoot);
    return false;
  }
  ReactDOM.render(renderedElement, iframeRoot);
  return true;
};

document.body.style.margin = "0";
// Keep popup within body boundaries for iOS Safari
document.body.style["max-width"] = "100vw";
document.body.style["background-color"] = "transparent";
iframeRoot = document.createElement("div");
applyStyles(iframeRoot, overlayStyle);
document.body.appendChild(iframeRoot);
window.parent.__CALLY_AUDITOR_GLOBAL_HOOK__.iframeReady();

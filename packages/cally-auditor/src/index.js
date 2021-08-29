import { applyStyles } from "./utils/css";
import { iframeStyle } from "./iframe/styles";

// Importing iframe-bundle generated in the pre build step as
// a text using webpack raw-loader. See webpack.config.js file.
import iframeScript from "!!raw-loader!../lib/iframe-bundle.js";

let iframe = null;
let isLoadingIframe = false;
let isIframeReady = false;
let onSourceCodeChange = null;

// use an iframe to identify auditor easily in document
export const update = () => {
  if (isLoadingIframe) {
    return;
  }

  if (isIframeReady) {
    updateIframeContent();
    return;
  }

  isLoadingIframe = true;
  const loadingIframe = window.document.createElement("iframe");
  applyStyles(loadingIframe, iframeStyle);
  loadingIframe.onload = function () {
    const iframeDocument = loadingIframe.contentDocument;
    if (iframeDocument != null && iframeDocument.body != null) {
      iframe = loadingIframe;
      const script =
        loadingIframe.contentWindow.document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = iframeScript;
      iframeDocument.body.appendChild(script);
    }
  };
  const appDocument = window.document;
  appDocument.body.appendChild(loadingIframe);
};

export const setSourceCodeHandler = (handler) => {
  onSourceCodeChange = handler;
  if (iframe) {
    update();
  }
};

export const updateIframeContent = () => {
  if (!iframe) {
    throw new Error("Iframe has not been created yet.");
  }

  const isRendered = iframe.contentWindow.updateContent({
    onSourceCodeChange,
  });

  if (!isRendered) {
    window.document.body.removeChild(iframe);
    iframe = null;
    isIframeReady = false;
  }
};

export const iframeReady = () => {
  isIframeReady = true;
  isLoadingIframe = false;
  updateIframeContent();
};

window.__CALLY_AUDITOR_GLOBAL_HOOK__ =
  window.__CALLY_AUDITOR_GLOBAL_HOOK__ || {};
window.__CALLY_AUDITOR_GLOBAL_HOOK__.iframeReady = iframeReady;

import { applyStyles } from "./utils/css";
import { expandedIframeStyle, iframeStyle } from "./iframe/styles";

// Importing iframe-bundle generated in the pre build step as
// a text using webpack raw-loader. See webpack.config.js file.
import iframeScript from "!!raw-loader!../lib/iframe-bundle.js";
import runAxe from "./utils/runAxe";

let iframe = null;
let isLoadingIframe = false;
let isIframeReady = false;

const onClickOverlay = (willShowDialog) => {
  if (!iframe) return;
  applyStyles(iframe, willShowDialog ? expandedIframeStyle : iframeStyle);
};

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
  loadingIframe.id = "__CREATE_ACCESSIBLE_APP_AUDIT_IFRAME__";
  loadingIframe.title = "accessibility audits overlay";
  loadingIframe.allowtransparency = "true";

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

export const updateIframeContent = () => {
  if (!iframe) {
    throw new Error("Iframe has not been created yet.");
  }

  // delay to wait until react render
  setTimeout(() => {
    runAxe({
      onSuccess: (score, results) => {
        // render accessibility score to overlay
        const isRendered = iframe.contentWindow.updateContent({
          currentValue: score,
          results,
          onClickOverlay,
        });

        if (!isRendered) {
          window.document.body.removeChild(iframe);
          iframe = null;
          isIframeReady = false;
        }
      },
    });
  }, 1000);
};

export const iframeReady = () => {
  isIframeReady = true;
  isLoadingIframe = false;
  updateIframeContent();
};

window.__CALLY_AUDITOR_GLOBAL_HOOK__ =
  window.__CALLY_AUDITOR_GLOBAL_HOOK__ || {};
window.__CALLY_AUDITOR_GLOBAL_HOOK__.iframeReady = iframeReady;

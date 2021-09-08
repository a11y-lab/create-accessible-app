import * as axe from "axe-core";
import { calcScore } from "./scoring";

axe.configure({
  branding: {
    application: "create-accessible-app",
  },
  noHtml: true,
});

const AxeOptions = {
  selectors: true,
  source: true,
  elementRef: true,
  ancestry: true,
  xpath: true,
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"],
  },
  resultTypes: ["violations", "inapplicable"],
  rules: {
    tabindex: { enabled: true },
    accesskeys: { enabled: true },
    "heading-order": { enabled: true },
    "meta-viewport": { enabled: true },
    "duplicate-id": { enabled: false },
    "table-fake-caption": { enabled: false },
    "td-has-header": { enabled: false },
    marquee: { enabled: false },
    "area-alt": { enabled: false },
    "html-xml-lang-mismatch": { enabled: false },
    blink: { enabled: false },
    "server-side-image-map": { enabled: false },
    "identical-links-same-purpose": { enabled: false },
    "no-autoplay-audio": { enabled: false },
    "svg-img-alt": { enabled: false },
    "audio-caption": { enabled: false },
    "aria-treeitem-name": { enabled: true },
    // https://github.com/dequelabs/axe-core/issues/2958
    "nested-interactive": { enabled: false },
    "frame-focusable-content": { enabled: false },
  },
};

const runAxe = ({ onSuccess }) => {
  axe
    .run(
      {
        exclude: [["#__CREATE_ACCESSIBLE_APP_AUDIT_IFRAME__"]],
      },
      AxeOptions
    )
    .then((results) => {
      const numericScore = calcScore(results);
      const scoreOutOf100 = Math.round(numericScore * 100);
      onSuccess(scoreOutOf100, results);
    })
    .catch((err) => {
      console.error("Something bad happened:", err.message);
    });
};

export default runAxe;

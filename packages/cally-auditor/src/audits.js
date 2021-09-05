// grouping audits refs lighthouse
// https://github.com/GoogleChrome/lighthouse/pull/2057

const auditsGroup = {
  "a11y-best-practices": {
    title: "Best practices",
    description: "These items highlight common accessibility best practices.",
  },
  "a11y-color-contrast": {
    title: "Contrast",
    description:
      "These are opportunities to improve the legibility of your content.",
  },
  "a11y-names-labels": {
    title: "Names and labels",
    description:
      "These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.",
  },
  "a11y-navigation": {
    title: "Navigation",
    description:
      "These are opportunities to improve keyboard navigation in your application.",
  },
  "a11y-aria": {
    title: "ARIA",
    description:
      "These are opportunities to improve the usage of ARIA in your application which may enhance the experience for users of assistive technology, like a screen reader.",
  },
  "a11y-language": {
    title: "Internationalization and localization",
    description:
      "These are opportunities to improve the interpretation of your content by users in different locales.",
  },
  "a11y-audio-video": {
    title: "Audio and video",
    description:
      "These are opportunities to provide alternative content for audio and video. This may improve the experience for users with hearing or vision impairments.",
  },
  "a11y-tables-lists": {
    title: "Tables and lists",
    description:
      "These are opportunities to improve the experience of reading tabular or list data using assistive technology, like a screen reader.",
  },
};

// Audit weights are meant to match the aXe scoring system of
// minor, moderate, serious, and critical.
// See the audits listed at dequeuniversity.com/rules/axe/4.3
// https://github.com/dequelabs/axe-core/blob/396774511adbcac7833cb239863f0cacf9783af1/doc/rule-descriptions.md
// Refs lighthouse

export const accessibilityAudits = [
  { id: "accesskeys", weight: 3, group: "a11y-navigation" },
  { id: "aria-alt", weight: 10, group: "a11y-aria" },
  { id: "aria-allowed-attr", weight: 10, group: "a11y-aria" },
  { id: "aria-command-name", weight: 3, group: "a11y-aria" },
  { id: "aria-hidden-body", weight: 10, group: "a11y-aria" },
  { id: "aria-hidden-focus", weight: 3, group: "a11y-aria" },
  { id: "aria-input-field-name", weight: 3, group: "a11y-aria" },
  { id: "aria-meter-name", weight: 3, group: "a11y-aria" },
  { id: "aria-progressbar-name", weight: 3, group: "a11y-aria" },
  { id: "aria-required-attr", weight: 10, group: "a11y-aria" },
  { id: "aria-required-children", weight: 10, group: "a11y-aria" },
  { id: "aria-required-parent", weight: 10, group: "a11y-aria" },
  { id: "aria-roledescription", weight: 3, group: "a11y-aria" },
  { id: "aria-roles", weight: 10, group: "a11y-aria" },
  { id: "aria-toggle-field-name", weight: 3, group: "a11y-aria" },
  { id: "aria-tooltip-name", weight: 3, group: "a11y-aria" },
  { id: "aria-valid-attr-value", weight: 10, group: "a11y-aria" },
  { id: "aria-valid-attr", weight: 10, group: "a11y-aria" },
  { id: "audio-caption", weight: 10, group: "a11y-names-labels" },
  { id: "blink", weight: 3, group: "a11y-names-labels" },
  { id: "button-name", weight: 10, group: "a11y-names-labels" },
  { id: "bypass", weight: 3, group: "a11y-navigation" },
  { id: "color-contrast", weight: 3, group: "a11y-color-contrast" },
  { id: "definition-list", weight: 3, group: "a11y-tables-lists" },
  { id: "dlitem", weight: 3, group: "a11y-tables-lists" },
  { id: "document-title", weight: 3, group: "a11y-names-labels" },
  { id: "duplicate-id-active", weight: 3, group: "a11y-navigation" },
  { id: "duplicate-id-aria", weight: 10, group: "a11y-aria" },
  { id: "form-field-multiple-labels", weight: 2, group: "a11y-names-labels" },
  { id: "frame-focusable-content", weight: 3, group: "a11y-names-labels" },
  { id: "frame-title", weight: 3, group: "a11y-names-labels" },
  { id: "html-has-lang", weight: 3, group: "a11y-language" },
  { id: "html-lang-valid", weight: 3, group: "a11y-language" },
  { id: "image-alt", weight: 10, group: "a11y-names-labels" },
  { id: "input-button-name", weight: 10, group: "a11y-names-labels" },
  { id: "input-image-alt", weight: 10, group: "a11y-names-labels" },
  { id: "label", weight: 10, group: "a11y-names-labels" },
  { id: "link-name", weight: 3, group: "a11y-names-labels" },
  { id: "list", weight: 3, group: "a11y-tables-lists" },
  { id: "listitem", weight: 3, group: "a11y-tables-lists" },
  { id: "nested-interactive", weight: 3, group: "a11y-names-labels" },
  { id: "object-alt", weight: 3, group: "a11y-names-labels" },
  { id: "role-img-alt", weight: 3, group: "a11y-names-labels" },
  { id: "select-name", weight: 10, group: "a11y-names-labels" },
  { id: "tabindex", weight: 3, group: "a11y-navigation" },
  { id: "td-headers-attr", weight: 3, group: "a11y-tables-lists" },
  { id: "th-has-data-cells", weight: 3, group: "a11y-tables-lists" },
  { id: "valid-lang", weight: 3, group: "a11y-language" },
  { id: "video-caption", weight: 10, group: "a11y-audio-video" },
  // Manual audits
  { id: "duplicate-id", weight: 0 },
  { id: "logical-tab-order", weight: 0 },
  { id: "focusable-controls", weight: 0 },
  { id: "interactive-element-affordance", weight: 0 },
  { id: "managed-focus", weight: 0 },
  { id: "focus-traps", weight: 0 },
  { id: "custom-controls-labels", weight: 0 },
  { id: "custom-controls-roles", weight: 0 },
  { id: "visual-order-follows-dom", weight: 0 },
  { id: "offscreen-content-hidden", weight: 0 },
  { id: "use-landmarks", weight: 0 },
];

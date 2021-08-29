export const applyStyles = (element, styles) => {
  element.setAttribute("style", "");
  for (const key in styles) {
    if (!styles.hasOwnProperty(key)) {
      continue;
    }
    element.style[key] = styles[key];
  }
};

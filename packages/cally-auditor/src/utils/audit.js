export const audit = (aRule, axeResult) => {
  // Indicate if a test is not applicable.
  // This means aXe did not find any nodes which matched these checks.
  const notApplicables = axeResult.inapplicable || [];
  const isNotApplicable = notApplicables.find(
    (result) => result.id === aRule.id
  );
  if (isNotApplicable) {
    return {
      score: null,
      notApplicable: true,
    };
  }

  // Detect errors reported within aXe 'incomplete' results
  // aXe uses this result type to indicate errors, or rules which require manual investigation
  // If aXe reports an error, then bubble it up to the caller
  const incomplete = axeResult.incomplete || [];
  const incompleteResult = incomplete.find((result) => result.id === aRule.id);
  if (incompleteResult && incompleteResult.error) {
    return {
      score: null,
      errorMessage: `axe-core Error: ${
        incompleteResult.error.message || "Unknown error"
      }`,
    };
  }

  const violations = axeResult.violations || [];
  const failureCases = violations.concat(incomplete);
  const rule = failureCases.find((result) => result.id === aRule.id);

  return {
    score: Number(rule === undefined),
  };
};

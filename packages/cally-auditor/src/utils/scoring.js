// Computes the weighted-average of the score of the list of items.
import { clampTo2Decimals } from "./math";
import { accessibilityAudits } from "../audits";
import { audit } from "./audit";

// https://github.com/GoogleChrome/lighthouse/blob/v6.5.0/docs/scoring.md#how-is-the-accessibility-score-calculated

const arithmeticMean = (items) => {
  // Filter down to just the items with a weight as they have no effect on score
  items = items.filter((item) => item.weight > 0);
  // If there is 1 null score, return a null average
  if (items.some((item) => item.score === null)) return null;

  const results = items.reduce(
    (result, item) => {
      const score = item.score;
      const weight = item.weight;

      return {
        weight: result.weight + weight,
        sum: result.sum + score * weight,
      };
    },
    { weight: 0, sum: 0 }
  );

  return clampTo2Decimals(results.sum / results.weight || 0);
};

export const calcScore = (auditResult) => {
  const scores = accessibilityAudits.map((auditRef) => {
    const auditRefResult = audit(auditRef, auditResult);

    return {
      score: auditRefResult.score,
      weight: auditRefResult.notApplicable ? 0 : auditRef.weight,
    };
  });
  console.log(scores);
  return arithmeticMean(scores);
};

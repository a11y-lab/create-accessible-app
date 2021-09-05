import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const getScoreColor = (score) => {
  if (score >= 90) return "#0CCE6B";
  if (score < 50) return "#FF4E42";
  return "#FFA400";
};

const Progress = ({ value }) => {
  // use state for animation
  const [displayScore, setDisplayScore] = useState(0);
  const scoreColor = getScoreColor(value);

  useEffect(() => {
    setDisplayScore(value);
  }, [value]);

  return (
    <CircularProgressbar
      value={displayScore}
      text={`${value}%`}
      styles={buildStyles({
        pathColor: scoreColor,
        textColor: "#999",
        // Text size
        textSize: "20px",
      })}
      strokeWidth={12}
    />
  );
};

export default Progress;

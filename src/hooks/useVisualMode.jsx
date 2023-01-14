import React, { useState } from "react";

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([mode]);

  const transition = (mode, replace = false) => {
    setHistory([...history, mode]);

    if (replace === true) {
      const newHist = history.pop();
      setHistory([...history, mode]);
    }

    return setMode(mode);
  };

  const back = () => {
    if (mode === initial && history.length <= 1) {
      return;
    }

    const newHist = history.pop();
    setHistory(history);

    return setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
};

export default useVisualMode;

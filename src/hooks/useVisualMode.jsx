import { useState } from "react";

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([mode]);

  const transition = (mode, replace = false) => {
    setHistory([...history, mode]);

    if (replace === true) {
      const newHist = history;
      newHist.pop();
      setHistory((prev) => [...prev, mode]);
    }

    return setMode(mode);
  };

  const back = () => {
    if (mode === initial && history.length <= 1) {
      return;
    }

    const newHist = history;
    newHist.pop()
    setHistory(newHist);

    return setMode(newHist[newHist.length - 1]);
  };

  return { mode, transition, back };
};

export default useVisualMode;

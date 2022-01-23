import { useState, useEffect } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setMode(mode);
    if(replace) {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory.splice(prev.length - 1, mode);
        return newHistory;
      });
    } else {
      setHistory([...history, mode]);
    }
  };

  const back = () => {
    setHistory((prev) => {
      if(history.length > 1) {
        const newHistory = [...prev];
        newHistory.pop();
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return history;
    })
  };
  
  return { mode, transition, back };
}

export default useVisualMode;
import { useState } from 'react';

/* Handles mode and history states for Appointment component
 * @param: {string} 'initial' the mode default mode
 */
function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /* Sets state of mode to mode param then updates history 
   * @param: {string} 'mode' the mode to transistion to
   * @param: {boolean} 'replace' if true the new mode replaces the previous mode in history 
   */
  const transition = (mode, replace = false) => {
    setMode(mode);
    if(replace) {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory.splice(prev.length - 1, mode);
        return newHistory;
      });
    } else {
      setHistory(prev => ([...prev, mode]));
    }
  };

  /* Sets state of mode to previous mode in history, then updates history
   * Only works with more than one item in the history  
   */
  const back = () => {
    setHistory(prev => {
      if(prev.length > 1) {
        const newHistory = [...prev].pop();
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return prev;
    })
  };
  
  return { mode, transition, back };
}

export default useVisualMode;
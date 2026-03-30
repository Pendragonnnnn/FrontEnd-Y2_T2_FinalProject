import { useState, useEffect, useRef } from "react";
function Pomodoro() {
  const [isRunning, setRunning] = useState(false);
  const [second, setSecond] = useState(1800);
  const id = useRef(null); // Use null for initial ref

  useEffect(() => {
    if (isRunning) {
      // Correct Syntax: setInterval(callback, delay)
      id.current = setInterval(() => {
        setSecond((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      //  Cleanup when stopping or unmounting
      return () => clearInterval(id.current);
    }
  }, [isRunning]);

  function start() {
    setRunning(true);
  }
  function stop() {
    setRunning(false);
  }
  function reset() {
    setRunning(false);
    setSecond(1800); // Back to original time
  }

  function displayTime() {
    // Correct Math Logic
    const h = Math.floor(second / 3600);
    const m = Math.floor((second % 3600) / 60);
    const s = second % 60;

    const hours = String(h).padStart(2, "0");
    const mins = String(m).padStart(2, "0");
    const seconds = String(s).padStart(2, "0");

    return `${hours} : ${mins} : ${seconds}`;
  }

  return (
    <>
    <div>
        <button onClick={() => setSecond(1800)}>pomodoro</button>
        <button onClick={ ()=> setSecond(300)}>short break</button>
        <button onClick={() => setSecond(600)}>long break</button>
    </div>
      <h1>{displayTime()}</h1>
      <div className="flex flex-row justify-center align-center gap-2 ">
        <button className = " bg-green-400 " onClick={start}>start</button>
        <button onClick={stop}>stop</button>
        <button onClick={reset}>reset</button>
      </div>
    </>
  );
}
export default Pomodoro;

import { useState, useEffect, useRef } from "react";
import {urls, modes} from "../../assets/data";
import Setting from "./Setting";
function Pomodoro( { main}) {
   const [isRunning, setRunning] = useState(false);
  const [second, setSecond] = useState(1800);
  const [selectMode, setSelectMode] = useState ("pomodoro");
  const [isSetting, setSetting] = useState(false);

  const [ timer, setTimer] = useState( () => {
    const saved = localStorage.getItem( 'timer');
    return saved ? JSON.parse((saved)) : [
      { name: "pomodoro", time: 1800 },
    { name: "short break", time: 300 },
    { name: "long break", time: 600 }
    ]
  })
  const id = useRef(null); // Use null for initial ref
  const [indexPic, setIndexPic] = useState(() => {
    const index = localStorage.getItem('bgIndex');
    return index ? parseInt(index) : 0;
  });

  const choice = [
    { option: "start"}, {option: "reset"}
  ];  

  const fullScreen = () => {
    if (!document.fullscreenElement) { // root web page entire
      
      // document.documentElement.requestFullscreen(); // root like head or body tag
      main.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  useEffect(() => {
    if (isRunning) {
      //  setInterval(callback, delay)
      id.current = setInterval(() => {
        setSecond((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(id.current);
    }
  }, [isRunning]);

  useEffect ( () => {
    setSecond( timer.find((mode) => mode.name === selectMode)?.time)
    setRunning(false);
  }, [timer]);
  useEffect( () => {
    localStorage.setItem( 'timer', JSON.stringify(timer));
  }, [timer])
  useEffect ( () => {
    localStorage.setItem( 'bgIndex', indexPic.toString());
  }, [ indexPic])
  function start() {
    setRunning(true);
  }
  function stop() {
    setRunning(false);
  }
  function reset() {
    setRunning(false);
    setSecond(timer.find((mode) => mode.name === selectMode)?.time);
  }

  function displayTime() {
    const m = Math.floor((second % 3600) / 60) ;
    const s = second % 60;

    // const hours = String(h).padStart(2, "0");
    const mins = String(m).padStart(2, "0");
    const seconds = String(s).padStart(2, "0");

    return `${mins} : ${seconds}`;
  }
  return (
    <>
    <div className = {`bg-cover h-screen flex flex-col justify-center  items-center gap-10 z-0 `}
     style={ {backgroundImage: `url('${urls[indexPic].url}')`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              margin: '-20px', 
              overflow: "hidden",
              }} alt = "background" >
      <div className = "flex flex-col justify-center items-center gap-10 w-full " >
        <div className = "flex justify-center items-center sm:gap-5 md:gap-8 w-full h-auto   " >
          {timer.map((mode, index) => (
            <button key = {index} className = { ` !py-3 !px-7 text-2xl border rounded-full bg-transparent mt-7  border-black hover:text-black hover:bg-white cursor-pointer
               ${ selectMode === mode.name ? "bg-white text-black" : "bg-green "}`} 
              onClick = { () => {
                setSelectMode( mode.name);             
                setSecond(mode.time);
              if (isRunning){
                setRunning(false);
              }
              }} >
            {mode.name}  
          </button>
          ))}
        </div>
          <h1 className = "sm:text-6xl md:text-8xl font-bold text-white"> {displayTime()} </h1>
        <div className="flex flex-row justify-center items-center md:gap-15 sm:gap-7  ">
          {choice.map((option, index) => (
            <button key = {index} className = {` !px-6 !py-2 text-2xl  border rounded-full border-black 
               cursor-pointer ${option.option === "start" ? " hover:bg-transparent bg-white text-black hover:text-white " : "bg-green" }
                ${option.option === "reset" ? "hover:bg-red-500 hover:text-white": "bg-black"}`} 
               onClick = { (e) => {
                if ( e.target.innerText === "start") {
                  start();
                } else if ( e.target.innerText === "pause"){
                  stop(); }
                  else {
                    reset()
                  }
              }} > { option.option === "start" ? (isRunning ? "pause" : "start") : option.option}
                        
          </button> ))}

          <i className="fa-solid fa-gear text-3xl mt-2.5 cursor-pointer" onClick = { () => setSetting(true)}
          ></i>
          { isSetting && <Setting bg = {setIndexPic} isOpen={setSetting} newTime = {setTimer} currentTime = { timer} /> }
        </div>
      </div>
    <i className="fa-solid fa-expand text-3xl  mt-2.5 cursor-pointer ml-auto" id = "fullscreen" onClick={fullScreen} ></i>
        </div>
    </>
  );
}
export default Pomodoro;

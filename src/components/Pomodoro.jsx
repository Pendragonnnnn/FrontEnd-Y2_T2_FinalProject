import { useState, useEffect, useRef } from "react";
import CustomizeSetting from "./com-pomo/CustomizeSetting";
import Setting from "./com-pomo/Setting";
function Pomodoro() {
   const [isRunning, setRunning] = useState(false);
  const [second, setSecond] = useState(1800);
  const [selectMode, setSelectMode] = useState ("pomodoro");
  // const [isSetting, setSetting] = useState(false);
  // const [settingMode, setSettingMode] = useState("General");
  const id = useRef(null); // Use null for initial ref
  const modes = [
    { name: "pomodoro", time: 1800 },
    { name: "short break", time: 300 },
    { name: "long break", time: 600 },
  ];
  const choice = [
    { option: "start"}, {option: "reset"}
  ];

  const fullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
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

  function start() {
    setRunning(true);
  }
  function stop() {
    setRunning(false);
  }
  function reset() {
    setRunning(false);
    setSecond(modes.find((mode) => mode.name === selectMode)?.time || 1800); // Back to original time
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
    <div className = {`bg-[url('./src/assets/countryside.jpg')] bg-cover h-screen  flex flex-col justify-center items-center gap-20 z-0 `} alt = "background" >
      <div className = "flex flex-col justify-center items-center gap-15 w-4/5 " >
        <div className = "flex justify-center items-center gap-8 w-full h-auto   " >
          {modes.map((mode, index) => (
            <button key = {index} className = { ` !py-3 !px-7 text-3xl border rounded-full bg-transparent mt-7  border-black hover:text-black hover:bg-white cursor-pointer
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
          <h1 className = "text-7xl font-bold text-white"> {displayTime()} </h1>
        <div className="flex flex-row justify-center items-center gap-15  ">
          {choice.map((option, index) => (
            <button key = {index} className = {` !px-6 !py-2 text-3xl  border rounded-full border-black 
               cursor-pointer ${option.option === "start" ? " hover:bg-transparent bg-white text-black hover:text-white " : "bg-green" } ${option.option === "reset" ? "hover:bg-red-500 hover:text-white": "bg-black"}`} 
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

          <i className="fa-solid fa-gear text-4xl mt-2.5 cursor-pointer" ></i>
          {/* { isSetting && <CustomizeSetting /> } */}
        </div>
      </div>

        <div className= "mt-auto flex justify-center item-center gap-10 mb-5 p-5" >
          <div className = "bg-black"> hello this is for api song</div>

    <i className="fa-solid fa-expand text-3xl  mt-2.5 cursor-pointer ml-auto" id = "fullscreen" onClick={fullScreen} ></i>
        </div>
    </div>
    <Setting />

 
   
    </>
  );
}
export default Pomodoro;

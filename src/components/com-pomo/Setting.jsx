import { useState } from "react";
import CustomizeSetting from "./CustomizeSetting";
import { modes, resetTime} from "../../assets/data";
import Timer from "./Timer";


function Setting({ bg, isOpen, newTime, currentTime }) {
  
  const setting = [
    {name: "General"} , { name: "Timer"}
  ];
  const [settingMode, setSettingMode] = useState(setting[0].name);
  const btns = [
  { name: "reset"} , { name: "save"}, { name: "cancel"} 
  ];
  const [customizeTime, setCustomizeTime] = useState( [
    currentTime[0].time, currentTime[1].time, currentTime[2].time 
  ]);
  const handleTimeChange = ( index, newTime) => 
    setCustomizeTime( pre => {
      const updateTime = [...pre];
      updateTime[index] = newTime;
      return updateTime;
    });
  
  
    return (
        <>
        <div className = "   fixed left-0  top-0 min-h-4/5 bg-black/50  z-10 flex justify-center items-center w-screen  text-white  round-2xl gap-2 !p-2   "> 
      <div className = "bg-black  lg:w-3/4 md:w-8/10 !w-1/2  border h-1/2 text-xl rounded-2xl flex flex-col justify-center items-center gap-2 sm:flex-col  "> 
    {/* header */}
      <button className = "!ml-auto !px-5 !py-2 cursor-pointer hover:font-bold hover:round-2xl md:!px-2" onClick = { () => isOpen(false)}>
        <i className="fa-solid fa-xmark !p-1 text-3xl hover:font-bold"></i></button>
      {/* body */}
      <div className = "flex justify-start items-center gap-3  w-full ">
        {/* sidebar */}
          <div className = "flex flex-col justify-center !mb-auto !px-5 md:!px-0 items-start gap-10  ">
            {setting.map((option, index) => (
               <button key = { index } className = {` !py-3 !px-7 cursor-pointer hover:border-b 
                 ${settingMode === option.name ? "border-b": " " } `} 
               onClick={() => setSettingMode(option.name)} > 
                {option.name} </button> 
             ))} 
          </div>
          {/* customize setting */}
          <div id = "contain" className = "flex justify-center items-center gap-15 mr-auto w-65/100   text-left ">
              {settingMode === "General"? <CustomizeSetting chBg = { bg} /> : <Timer time = {handleTimeChange} actualTime = {customizeTime} /> } 
           
          </div>
      </div>
      {/* button choice */}
      <div className = " flex justify-between items-center gap-5 !p-5 w-full">
        { btns.map((opt, index) => (
          <button key = { index} className = {`text-xl !px-5 !py-2 cursor-pointer text-white  rounded-xl ${opt.name === "save" ? "bg-green-500" : 
          opt.name === "reset" ? "bg-red-500" : "bg-gray-500"}` }  onClick={ () => {

            if ( opt.name === "save") {
              customizeTime.forEach(time => console.log(time/60));
              newTime ( pre => [
                {...pre[0], time:customizeTime[0]},
                {...pre[1], time:customizeTime[1]},
                {...pre[2], time:customizeTime[2]}
                
              ]);

              isOpen(false);
            } else if ( opt.name === "reset") {
              newTime( resetTime);
              setCustomizeTime ( [resetTime[0].time, resetTime[1].time, resetTime[2].time]);
            } else {

              isOpen(false);
            }
          }}
           >
            {opt.name}
          </button>
        ))}
      </div>
      </div> 
    </div>
        </>
    )
}
export default Setting;
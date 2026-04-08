import { useState, useEffect, useRef } from "react";
import {modes} from "../../assets/data";
function Timer({time,actualTime}) {
 function calMinToSecond( min ){
  return min*60;
 }
 function calSecondToMin( sec) {
  return sec/60;
 }
  return (  
    <>
      <div className = "flex flex-col justify-start items-left gap-1 w-full text-left !pl-5 md:!pl-1 text-xl sm:!pl-1 md:!pl-2 ">
        <div className=" flex justify-between items-center gap-5 w-full sm:flex-col md:flex-row  "> 
          {modes.map((mode, index) => (
          <div  key = {index} className = "flex flex-col justify-center items-start gap-3 text-left text-xl ">
            <label htmlFor={mode.name}>{mode.name}  </label>
            <input type="number" min={1} max={59}  className="w-full border !px-1"

            value={calSecondToMin(actualTime[index])} onChange={(e) => { 
              console.log("time:" +calSecondToMin(actualTime[index]));
               time( index, calMinToSecond(Number(e.target.value)));
               console.log( (e.target.value));
               
            }} />
          </div>
          ))}

        </div>
        <p className = "!mt-5">Note: Changes will be saved when you click the "save" button.</p>
    </div>
    </>

   
  );
}
export default Timer;

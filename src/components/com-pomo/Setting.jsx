import CustomizeSetting from "./CustomizeSetting";



function Setting() {
    const setting = [
    {name: "General"} , { name: "Timer"}
  ];
    return (
        <>
        <div className = "fixed left-0 top-0 min-h-4/5 bg-black/50  z-10 flex justify-center items-center w-full  text-white  round-2xl gap-2 p-2   "> 
      <div className = "bg-black w-1/2 h-1/2 text-xl rounded-2xl flex flex-col justify-center items-center gap-2  "> 
    {/* header */}
      <button className = "!ml-auto !px-7 !py-2 text-xl cursor-pointer hover:bg-white/20 hover:round-2xl">X</button>
      {/* body */}
      <div className = "flex justify-center items-center gap-3 p-1 w-full ">
        {/* sidebar */}
          <div className = "flex flex-col justify-end !mb-auto items-center gap-10  ">
            {setting.map((option, index) => (
               <button key = { index } className = "px-5  py-3 cursor-pointer hover:border-b  " > 
                {option.name} </button> 
          
             ))} 
          </div>
          {/* customize setting */}
          <div id = "contain" className = "flex-wrap justify-center items-center gap-15 p-3 mr-auto w-65/100   text-left ">
            <CustomizeSetting /> 
          </div>
      </div>
      {/* button choice */}
      {/* {/* <div></div> */}
      
      </div> 
    </div>
        </>
    )
}
export default Setting;
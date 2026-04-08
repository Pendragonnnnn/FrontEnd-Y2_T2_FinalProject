
import { useState } from "react";
import {urls} from "../../assets/data";
function CustomizeSetting({ chBg}) {
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState(urls[0].name);
    
    
    return (
        
        <>
        <div className = "flex flex-col justify-center items-left gap-1 w-full text-left !pl-5 ">
        <span className="!mb-1">Select Theme</span>
        <div className = " flex justify-center items-center  border border-gray-300 !p-2 cursor-pointer w-full text-left gap-5"  onClick={() => {setOpen(!isOpen);}}>
            <span className = "text-lg"  >{selected}</span>
            <i className="fa-solid fa-caret-up !ml-auto "></i>
        </div>
            { isOpen && 
            <ul className = "border ">
                {urls.map((option, index) => (
                    <li key = {index} className = "!p-2 text-lg hover:bg-transparent cursor-pointer" onClick={() => {

                        setSelected(option.name);
                        setOpen(false);
                        chBg(index);
                        
                    }}>
                        {option.name}
                    </li>
                ))}
                </ul>}


        </div>

        </>
    )
}
export default CustomizeSetting;
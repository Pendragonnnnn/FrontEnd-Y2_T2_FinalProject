
import { useState } from "react";
function CustomizeSetting() {
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState("hi");
    const pictures = [
        { name: "hi" }, { name: "hello"}, {name : "a"}, { name: "b"}, { name: "c"}, { name: "d"}
        
    ];
    
    return (
        
        <>
        <div className = "flex flex-col justify-center items-left gap-1 w-full text-left !pl-5 ">
        <span>Select Theme</span>
        <button className = "border border-gray-300 !p-2 cursor-pointer w-full text-left gap-5"  onClick={() => {setOpen(!isOpen);}}>
            <span>{selected}</span>
            <i className="fa-solid fa-caret-up !pl-auto"></i>
        </button>
            { isOpen && 
            <ul className = "border ">
                {pictures.map((option, index) => (
                    <li key = {index} className = "!p-2 hover:bg-transparent cursor-pointer" onClick={() => {

                        setSelected(option.name);
                        setOpen(false);
                        
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
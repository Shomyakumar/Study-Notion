
import { useState } from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { GoVideo } from "react-icons/go";

export default function CourseSection({data}){

    const[active,setActive]=useState(false);
    return(
        <div className="border border-richblack-600">
            <div className="flex justify-between items-center  bg-richblack-700  p-4 py-6 md:text-lg">
                <div className="text-white flex items-center gap-2">
                    <button className="text-2xl" onClick={()=>setActive(!active)}>
                    {
                        active?<MdOutlineKeyboardArrowUp />:<MdOutlineKeyboardArrowDown/>
                    }
                    </button>
                    <p>{data.sectionName}</p>
                </div>
                <p className="flex text-yellow-5">
                    {data.subSection.length} lecture(s)
                </p>
            </div>
            {
                active && (
                    data.subSection.map((subSection,id)=>{
                        return(
                            <div key={id} className="flex justify-between items-center md:text-lg px-4 py-6">
                                <div className="text-white flex items-center gap-2">
                                    <span className="text-yellow-5"><GoVideo/></span>
                                    <p>{subSection.title}</p>
                                </div>
                                <p className="text-white">{subSection.timeDuration}</p>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
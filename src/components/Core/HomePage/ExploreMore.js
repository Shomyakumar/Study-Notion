import { useState } from "react"
import HighlightText from "./HighlightText"
import {HomePageExplore} from "../../../data/homepage-explore"
import CourseCard from "./CourseCard"

const tabs=[
    "Free","New to coding","Most popular","Skills paths","Career paths",
]

export default function ExploreMore(){

    const[currentTab,setCurrentTab]=useState(tabs[0]);
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return(
        <div className="flex flex-col items-center relative w-full">
            <p className="text-4xl font-semibold text-center">Unlock the<HighlightText text={" Power of Code"}/></p>
            <p className="text-richblack-200 mt-3 text-center">Learn to Build Anything You Can Imagine</p>

            <div className=" my-6 flex flex-wrap flex-row items-center gap-2 sm:bg-richblack-800 rounded-full px-1 py-1">
            {
               tabs.map((item,index)=>{
                return (
                    <div className={` text-[16px] ${currentTab===item?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200 bg-richblack-800"}
                     rounded-full transition-all duration-200 cursor-pointer px-3 py-1`}

                     onClick={()=>setMyCards(item)}
                    key={index}>{item}</div>
                )
               }) 
            }
            </div>
            <div className="w-full h-[600px] md:h-[160px]"></div>
            <div className="flex justify-between gap-6 flex-col md:flex-row absolute  top-[250px] xs:top-[200px]   md:top-[180px] ">
            {
                courses.map((element,index)=>{
                    return(
                        <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                    )
                })
            }
            </div>
        </div>
    )
}
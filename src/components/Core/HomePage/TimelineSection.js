
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from"../../../assets/Images/TimelineImage.png"

const timeline=[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company."
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority."
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skill."
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution."
    },
]
export default function TimelineSection(){
    return(
        <div className=" w-full">
            <div className=' flex flex-col md:flex-row items-center justify-between gap-14  w-full'>
                <div className="  flex flex-col gap-5 w-[45%] ">
                    {
                        timeline.map((element,index)=>{
                            return(
                                <div className="flex flex-row gap-6 items-start " key={index}>
                                    <div className="w-[50px] h-[50px] relative  flex flex-col items-center ">
                                        <div className=" z-10 w-[40px] h-[40px] bg-blue-5 rounded-full flex justify-center items-center">
                                            <img src={element.Logo} alt="Logo" className="z-10 "></img>
                                        </div>
                                        <div className={` ${index===3?"hidden":""} absolute top-4 w-[2px] h-[60px]  border-r-2 border-dotted border-richblack-300`}></div>
                                    </div>
                                    <div className="flex flex-col  ">
                                        <p className="font-semibold text-[18px]">{element.heading}</p>
                                        <p className="">{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className=" relative shadow-blue-200 max-w-[600px] ">
                    <img src={TimelineImage} alt="timeline" className="h-fit object-cover">

                    </img>
                    <div className="absolute  bg-caribbeangreen-700 flex flex-col sm:flex-row items-center max-w-[500px]
                     text-white uppercase py-6 left-[50%] -translate-x-[50%] -translate-y-[50%] gap-4">
                        <div className="flex gap-4 items-center border-b-2 sm:border-b-0 sm:border-r-2 border-caribbeangreen-300 px-8 pb-2 sm:pb-0">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-caribbeangreen-50">Years of experience</p>
                        </div>
                        <div className="flex gap-4 items-center px-8" >
                            <p className="font-bold text-3xl">250</p>
                            <p className="text-caribbeangreen-50">Types of courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
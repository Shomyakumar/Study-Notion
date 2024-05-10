
import progress from "../../../assets/Images/Know_your_progress.png"
import compare from "../../../assets/Images/Compare_with_others.png"
import plan from "../../../assets/Images/Plan_your_lessons.png"

import HighlightText from "./HighlightText"
import Button from "./Button"
export default function LearningLanguage(){
    return (
        <div className="mt-[120px]">
            <div className="flex flex-col gap-5 items-center pb-[50px]">
                <p className="text-4xl font-semibold text-center">Your swiss knife for <HighlightText text={"learning any language"} /></p>
                <p className="text-center text-richblack-600 max-w-[750px]  text-lg">Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, progress-tracking custom schedule and more.</p>

                <div className="flex flex-col md:flex-row items-center justify-center mt-6">
                    <img src={progress} alt="progressImage" className="sm:max-w-[400px] max-w-[300px] sm:-mr-28"></img>
                    <img src={compare} alt="compareImage" className=" max-w-[300px] sm:max-w-[420px]"></img>
                    <img src={plan} alt="PlanImage" className="max-w-[300px] sm:max-w-[450px] sm:-ml-32"></img>
                </div>
                <Button active={true} linkto={"/signup"}>Learn More</Button>
            </div>
        </div>
    )
}
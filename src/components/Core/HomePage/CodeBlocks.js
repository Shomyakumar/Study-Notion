
import Button from "./Button";
// import HighlightText from "./HighlightText";
import{FaArrowRight} from 'react-icons/fa'
import { TypeAnimation } from "react-type-animation";

export default function CodeBlocks({
    position,heading,subheading, btn1,btn2, codeblock, backgroundGradient,codeColor
}){

    return (
        <div className={`flex ${position} my-20 gap-10 justify-between w-full flex-col items-start `}>
           
            {/* Section 1 */}

            <div className="flex flex-col max-w-[600px] gap-10">
                <p className="flex">{heading}</p>
                <p className="text-richblack-200 font-bold">{subheading}</p>
                <div className="flex gap-7 mt-6">
                    <Button active={btn1.active} linkto={btn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {btn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </Button>
                    <Button active={btn2.active} linkto={btn2.linkto}>
                            {btn2.btnText}
                    </Button>
                    
                </div>
            </div>
            {/* Section 2 */}

            <div className={`text-lg z-20 flex flex-row code-border  text-[10px] w-[100%] h-full max-w-[400px]  py-4 relative  `}>
                
                <div className="text-richblack-400 font-inter font-bold text-center flex flex-col w-[10%] ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    
                </div>
                <div className={`w-[90%] flex flex-col  font-bold font-mono ${codeColor} pr-2 `}>
                    <TypeAnimation
                        sequence={[codeblock,10000,""]}
                        repeat={Infinity}
                        cursor={true}
                        
           
                        style = {
                            {
                                whiteSpace: "pre-line",
                                display:"block",
                                
                            }
                        }
                        omitDeletionAnimation={true}
                        
                     />
                </div>
                <div className={`absolute ${backgroundGradient}`}></div>
            </div>
            
        </div>
    )
}
import Button from "../HomePage/Button"
import HighlightText from "../HomePage/HighlightText"


const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      btnText: "Learn More",
      btnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "The learning process uses the namely online and offline.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      order: 3,
      heading: "Certification",
      description:"You will get a certificate that can be used as a certification during job hunting."
        
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
  ];

export default function LearningGrid(){
    return(
        <div className="grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-10">
        {
            LearningGridArray.map((card,index)=>{
                return(
                    <div key={index}
                        className={` ${index===0?"md:col-span-2":""}
                                ${ card.order%2===1?"bg-richblack-700":"bg-richblack-800"}
                                ${card.order===3 ?"md:col-start-2":""}
                                ${card.order < 0 && "bg-transparent"} sm:min-h-[250px] min-h-[200px]
                        `}
                    >
                    {
                        card.order<0 ?(
                            <div className="flex flex-col gap-4 items-start bg-richblack-900 pb-4 max-w-[550px]">
                                <p className="font-bold text-4xl text-white">
                                    {card.heading}
                                    <HighlightText text={card.highlightText} />
                                </p>
                                <p className="mb-2 text-richblack-300">
                                    {card.description}
                                </p>
                                <Button linkto={card.btnLink} active={true}>
                                    {card.btnText}
                                </Button>
                            </div>
                        ):
                        (
                            <div className="p-6">
                                <p className="font-bold text-lg text-richblack-5 mb-4">{card.heading}</p>
                                <p className="text-richblack-200">{card.description}</p>
                            </div>
                        )
                    }
                    </div>
                )
            })
        }
        </div>
    )
}
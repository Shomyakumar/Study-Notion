

export default function CourseCard({cardData,currentCard,setCurrentCard}){
    return (
        <div className={`max-w-[250px] px-4 py-4  flex flex-col gap-4
         ${cardData.heading===currentCard?"border-b-4 border-r-4 border-yellow-5 bg-white":"bg-richblack-800"}`
            }
            onClick={()=>{setCurrentCard(cardData.heading)}}
         >
            <p className={`text-lg font-semibold  ${cardData.heading===currentCard?"text-richblack-600":"text-white"}`}>{cardData.heading}</p>
            <p className="text-sm text-richblack-400">{cardData.description}</p>
            <div className="flex justify-between flex-1 items-end ">
                <div>
                    <p className="font-semibold text-richblack-300">{cardData.level}</p>
                </div>
                <div>
                    <p className="font-semibold text-richblack-300">{cardData.lessionNumber} lessons</p>
                </div>
            </div>
        </div>
    )
}
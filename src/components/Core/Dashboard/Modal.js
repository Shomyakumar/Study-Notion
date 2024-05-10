

export default function Modal({modlaData}){
    return(
        <div  className="fixed inset-0 z-[1000] flex items-center justify-center  bg-richblack-600 bg-opacity-10 backdrop-blur-sm" >
            <div className="flex flex-col gap-2 p-4 bg-richblack-900 border-richblack-700 border rounded-md">
                <p className="font-semibold text-richblack-5 text-2xl">{modlaData.text1}</p>
                <p className="text-richblack-200 ">{modlaData.text2}</p>
                <div className="flex gap-4 items-center">
                    <button onClick={modlaData.btn1Handler}
                       className="bg-yellow-50 px-4 py-2 rounded-md font-bold"
                    >
                        {modlaData.btn1Text}
                    </button>
                    <button onClick={modlaData.btn2Handler}
                        className="bg-richblack-400 px-4 py-2 rounded-md font-bold"
                    >
                        {modlaData.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}
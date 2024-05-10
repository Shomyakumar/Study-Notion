import { Link } from "react-router-dom";


export default function Button({children,active,linkto}){
    return (
       <Link to={linkto}>
            <div className={`text-center text-[13px] px-6 py-3 rounded-md  border-b-2 border-r-2 font-lg  font-semibold
                        ${active?"bg-yellow-50  border-yellow-5 text-black":"bg-richblack-800 border-richblack-500"}
                       hover:scale-95 transition-all duration-200  `}  >
                {children}
            </div>
       </Link>
    )
}
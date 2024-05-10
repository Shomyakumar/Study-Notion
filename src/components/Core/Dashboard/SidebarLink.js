
import * as Icons from "react-icons/vsc"
import {useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { matchPath } from 'react-router-dom';
// import { setActive } from "../../../slices/SidebarSlice";
import { useSelector } from "react-redux";

export default function SidebarLink({link,iconName,active,setActive}){
    
    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();
    // const{active}=useSelector((state)=>state.sidebar)
    

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
    
    
    return(

       <Link onClick={()=>setActive(!active)} to={link.path} className={` px-8 py-2 relative text-sm font-medium transition-all duration-200 ${matchRoute(link.path)?"bg-yellow-800":"bg-opacity-0"}`}
       >
       <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50  ${matchRoute(link.path)?"opacity-100":"bg-opacity-0"}`}></span>
        <div className="flex items-center gap-x-2 "  >
            <Icon className="text-lg text-richblack-200"/>
            <span className="text-richblack-200">{link.name}</span>
            
        </div>  
       </Link>
    )
}
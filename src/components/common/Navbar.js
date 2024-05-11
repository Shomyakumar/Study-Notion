
import { Link, matchPath } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from '../Core/Auth/ProfileDropdown'
import { useEffect,useState } from "react";
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

export default function Navbar(){

    const{token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    const[active,setActive]=useState(false);
    const location=useLocation();
    // const subLinks=[
    //     {
    //         title:"Python",
    //         link:"/catalog/python"
    //     },
    //     {
    //         title:"Web Development",
    //         link:"/catalog/web-development"
    //     }
    // ]
    const[loading,setLoading]=useState(false);
    const[subLinks,setSubLinks]=useState([]);
    const fetchSublinks=async()=>{
        setLoading(true);
        try{
            const result=await apiConnector("GET",categories.CATEGORIES_API);
            console.log("printing sublinks result",result.data);
            setSubLinks(result.data.data);
            // console.log("printing",result.data.data);
            console.log("printing sublinks",subLinks);
        }
        catch(error)
        {
            console.log("Could not fetch the category list");
        }
        setLoading(false);
    }
    
    useEffect(()=>{
        fetchSublinks();
    },[])

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
    if(loading){
        return (
            <div className='text-lg text-center p-2' >Loading...</div>
        )
    }
    return (
        <div className={`flex items-center justify-center h-14  border-b-[1px] border-richblack-700 z-50
             ${ location.pathname !== "/" ? "bg-richblack-800" : ""}
             `} >
            <div className='w-11/12 max-w-[1260px] mx-auto flex justify-between items-center relative'>
                    
                <Link to="/">
                    <img width={160} height={42} src={Logo} alt="logo"></img>
                </Link>

                <nav>
                    <ul className='flex flex-row gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((item,index)=>{
                            return(
                                <li key={index}>
                                    {
                                        item.title==="Catalog"?(
                                        <div className='group relative cursor-pointer '>
                                           <p className='flex items-center gap-1'>{item.title}<MdOutlineKeyboardArrowDown className='text-xl' /></p> 
                                            
                                            <div className='invisible opacity-0 absolute left-[50%] top-[50%] flex flex-col rounded-md 
                                            bg-richblack-50 p-4 text-richblack-900 transition-all duration-200 group-hover:visible
                                             group-hover:opacity-100 w-[250px] translate-x-[-50%] translate-y-[50%] 
                                             '>

                                                <div className='absolute left-[58%] -top-1 h-6 w-6 rounded
                                                rotate-45 bg-richblack-50 -z-1 '>

                                                </div>

                                                {
                                                    subLinks.length? 
                                                        
                                                            subLinks.map((value,index)=>{
                                                                return(
                                                                    
                                                                    <Link to={`/catalog/${value.name.split(" ").join("-").toLowerCase()}`} key={index} className='z-10   text-richblack-900
                                                                    transition-all duration-200 rounded-md hover:bg-richblack-200 p-2'>
                                                                        {value.name}
                                                                    </Link>
                                                                )
                                                            })
                                                        
                                                     : (<div></div>)
                                                }

                                            </div>


                                        </div>
                                        ):
                                        
                                        (
                                            <Link to={item.path} className={`${matchRoute(item?.path)?"text-yellow-25 hidden md:block":"text-richblack-25 hidden md:block"}`}>
                                                {item.title}
                                            </Link>
                                        )
                                            
                                    }
                                    
                                </li>
                            )
                        })
                    }
                    </ul>
                </nav>
                {/* login signup dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user&& user.accountType!=="Instructor" &&(
                            <Link to="/dashboard/cart" 
                                className='relative text-white text-xl font-bold'>
                                    <AiOutlineShoppingCart />
                                    {
                                       ( totalItems>0 && 
                                            <span className='absolute -top-2 rounded-[90%] px-1 text-yellow-5   text-sm right-0 '>{totalItems}</span>
                                        )
                                    }
                            </Link>
                        )
                    }
                    {
                        token===null&&(
                            <Link to="/login">
                            <button className='border-richblack-800 bg-richblack-700 px-3 py-2 text-richblack-50 
                                    hover:text-richblack-25 rounded-md hover:scale-95 transition-all duration-200 hover:bg-richblack-800 hidden md:block'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token===null &&(
                            <Link to="/signup">
                                <button className='border-richblack-800 bg-richblack-700 px-3 py-2 text-richblack-50 
                                    hover:text-richblack-25 rounded-md hover:scale-95 transition-all duration-200 hover:bg-richblack-800 hidden md:block'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token!==null && <ProfileDropdown/>
                    }
                    {
                        <div className={`absolute top-0 right-0 p-4 bg-richblack-600  flex-col  px-8 rounded-md ${active?"flex":"hidden"} `}>
                        <div>
                            <button onClick={()=>setActive(!active)}
                                className='text-white text-xl'
                            >
                                <RxCross1/>
                            </button>
                        </div>
                        {
                            
                            NavbarLinks.map((item,index)=>{
                            return(
                                <li key={index} className='flex'>
                                {   item.title!=="Catalog" &&
                                    (
                                        <Link to={item.path} className={`${matchRoute(item?.path)?"text-yellow-25 ":"text-richblack-25 my-2 "}`}>
                                            {item.title}
                                        </Link>
                                    )
                                }
                                </li>
                            )
                            })
                        }
                        {
                            token===null&&(
                                <Link to="/login">
                                <button className='border-richblack-800 bg-richblack-700 px-3 py-2 text-richblack-50 
                                        hover:text-richblack-25 rounded-md hover:scale-95 transition-all duration-200 hover:bg-richblack-800 my-4  '>
                                        Log in
                                    </button>
                                </Link>
                            )
                        }
                        {
                            token===null &&(
                                <Link to="/signup">
                                    <button className='border-richblack-800 bg-richblack-700 px-3 py-2 text-richblack-50 
                                        hover:text-richblack-25 rounded-md hover:scale-95 transition-all duration-200 hover:bg-richblack-800 '>
                                        Sign up
                                    </button>
                                </Link>
                            )
                        }
                        </div>
                    }
                    {
                        <div className='md:hidden text-white text-xl' onClick={()=>setActive(!active)}>
                        {

                            active?(<RxCross1/>):(<RxHamburgerMenu/>)
                        }
                        </div>
                    }
                </div>
                    
            </div>
        </div>
    )
}
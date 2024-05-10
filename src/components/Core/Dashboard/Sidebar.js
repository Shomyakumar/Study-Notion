
import {sidebarLinks} from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authApi'
import {useSelector,useDispatch} from 'react-redux'
import SidebarLink from './SidebarLink';
import {useNavigate} from 'react-router-dom';
import Modal from './Modal';
import { useState } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import { RxCross1 } from "react-icons/rx";
import { setActive } from '../../../slices/SidebarSlice';
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";

export default function Sidebar(){

    const{user,loading:profileLoading}=useSelector((state)=>state.profile);
    const{loading:authLoading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[modal,setModal]=useState(null);
    // const {active}=useSelector((state)=>state.Sidebar)
    
    const [active,setActive]=useState(false);

    if(profileLoading || authLoading)
    {
        return(
            <div className='spinner mt-10'></div>
        )
    }
   
    return (
        <div className='relative'>
            <div className='absolute md:hidden left-4 top-2 z-50'>
                <button onClick={()=>dispatch(setActive(!active))} className={` text-white bg-richblack-600 p-1 rounded-md  `}>{active?(<RxCross1/>):(<TbSquareRoundedArrowRightFilled />)}</button>
            </div>
            <div className={`${active?"block":"hidden"} absolute md:static md:block border-richblack-700 border-r-[1px] min-h-[calc(100vh-3.5rem)] pt-10 min-w-[220px] bg-richblack-800`}>
                <div className='flex flex-col  '>
                    {
                        sidebarLinks.map((link)=>{
                            if(link.type && user?.accountType !==link.type) return null;
                            return(
                            <SidebarLink link={link} key={link.id} iconName={link.icon} active={active} setActive={setActive}  />  
                            )
                        })
                    }
                </div>
                <div className='h-[1px] mx-auto my-6 w-10/12 bg-richblack-600 '></div>
                <div className='flex flex-col '>
                    <SidebarLink
                        link={{name:"settings",path:"dashboard/settings"}}
                        iconName={"VscSettingsGear"}
                        active={active} setActive={setActive}
                    />
                    <button onClick={()=>{
                        setModal({
                            text1:"Are you sure ?",
                            text2:"You will be logged out of your account",
                            btn1Text:"Logout",
                            btn2Text:"Cancel",
                            btn1Handler:()=>{dispatch(logout(navigate))},
                            btn2Handler:()=>{setModal(null)},
                        })
                    }}
                    className='text-sm font-medium text-richblack-200 px-8 py-2'
                    >
                        <div className='flex flex-row items-center gap-2'>
                            <VscSignOut className='text-lg'/>
                            <p>Logout</p>
                        </div>
                    </button>
                </div>
                {
                    modal&& <Modal modlaData={modal}/>
                }
            </div>
        </div>
    )
}
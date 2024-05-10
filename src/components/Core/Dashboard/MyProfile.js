

import { FiEdit } from "react-icons/fi";

import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'

export default function MyProfile(){

    const navigate=useNavigate();
    const{user}=useSelector((state)=>state.profile);

    return (

        <div className=' flex flex-col   '>
            <h1 className='text-4xl text-richblack-5 font-medium'>My Profile</h1>
            {/* first div which contains name */}
            <div className='bg-richblack-800 py-4 px-4 rounded-md border border-richblack-600 mt-10 w-full max-w-[700px]'>

                <div className='flex gap-4 items-center justify-between'>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
                        <img src={user?.image} alt={`profile-${user?.firstName}`}
                            className='aspect-square w-[70px] rounded-full object-cover '
                        />
                        <div >
                            <p className='text-richblack-50 text-lg'>{user?.firstName + " "+ user?.lastName}</p>
                            <p className='text-richblack-300 text-sm italic'>{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={()=>{navigate("/dashboard/settings")}} className='flex items-center gap-x-2 text-richblack-900 bg-yellow-50 rounded-md px-6 py-2'>
                        <FiEdit/> Edit
                    </button>
                </div>
            </div>
            {/* section 2 */}
            <div className='bg-richblack-800 flex flex-col md:flex-row md:justify-between md:items-center py-4 px-4 rounded-md border border-richblack-600 mt-6 w-full max-w-[700px]'>
                <div className='flex flex-col gap-6 items-start justify-between'>
                    <p className='text-richblack-50 text-lg font-medium'>About</p>
                    <p className='text-richblack-100 '>{user?.additionalDetails?.about  ?? "Write something about yourself"}</p>
                </div>
                <div className="flex justify-end">
                <button onClick={()=>{navigate("/dashboard/settings")}} className='flex items-center mt-2 gap-x-2 text-richblack-900 bg-yellow-50 rounded-md px-6 py-2'>
                        <FiEdit/> Edit
                    </button>
                </div>
            </div>
            {/* section 3 */}
            <div className='bg-richblack-800 py-4 px-4 rounded-md border border-richblack-600 mt-6 w-full max-w-[700px] mb-[100px]'>
                <div className='flex gap-6 items-center justify-between pb-4'>
                    <p className='text-richblack-50 text-lg font-medium'>Personal details</p>
                    <button onClick={()=>{navigate("/dashboard/settings")}} className='flex items-center gap-x-2 text-richblack-900 bg-yellow-50 rounded-md px-6 py-2'>
                        <FiEdit/> Edit
                    </button>
                </div>
                <div className=" flex flex-col md:flex-row gap-y-4 justify-between max-w-[500px]">
                    <div className="flex gap-4 flex-col">
                        <div >
                            <p className="text-richblack-100">First Name</p>
                            <p className="text-richblack-300 font-sm ">{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="text-richblack-100">Email</p>
                            <p className="text-richblack-300 font-sm ">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-richblack-100">Gender</p>
                            <p className="text-richblack-300 font-sm ">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col">
                        <div>
                            <p className="text-richblack-100">Last Name</p>
                            <p className="text-richblack-300 font-sm ">{user?.lastName}</p>
                        </div>
                        <div>
                            <p className="text-richblack-100">Phone Number</p>
                            <p className="text-richblack-300 font-sm ">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className="text-richblack-100">Date of Birth</p>
                            <p className="text-richblack-300 font-sm ">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
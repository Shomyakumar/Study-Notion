import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { setLoading } from '../../../../slices/authSlice';
import {toast} from 'react-hot-toast'
import { apiConnector } from '../../../../services/apiconnector';
import {settingsEndpoints} from '../../../../services/apis';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function UpdatePassword(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const {CHANGE_PASSWORD_API}=settingsEndpoints;
    const { token } = useSelector((state) => state.auth);

    const [formData,setFormData]=useState({
        currentPassword:"",newPassword:""
    })
    const{currentPassword,newPassword}=formData;
    function handleOnChange(e){
        setFormData((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value,
            }
        })
    }

    function handleOnSubmit(e){
        e.preventDefault();
        const data={
            oldPassword:currentPassword,
            newPassword:newPassword,
        }
        dispatch(updatePassword(data));
    }

    function    updatePassword(data){
        return async (dispatch)=>{

            const toastId=toast.loading("Loading..")
            dispatch(setLoading(true));
             
            console.log("the data is",data);
            
            try{
                    const response=await apiConnector("PUT",CHANGE_PASSWORD_API,data,{
                        Authorization: `Bearer ${token}`,
                      });
                    console.log("update profile response",response);

                    if(!response.data.success)
                    {
                        throw new Error(response.data.message);
                    }
                    toast.success("Password updated Successfully");

            }
            catch(error)
            {
                console.log("Error in updating user details",error);
                toast.error("Could not update details")
            }
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }

    return(
        <div className=" bg-richblack-800 w-full max-w-[700px]  py-4 px-4 lg:px-6 lg:py-6 rounded-md border border-richblack-600 ">
            <h2 className="text-lg text-richblack-50 font-bold mb-6">Update Password</h2>

            <div className='flex items-center  mb-4'>
                <form className='flex flex-col gap-4 w-full' onSubmit={handleOnSubmit}>
                    <div className='flex flex-col md:flex-row gap-4 items-center w-full'>
                        <label className="text-richblack-50 flex flex-col gap-2 w-full relative">Current Password
                            <input 
                                type={showPassword1 ? "text" : "password"}
                                name="currentPassword"
                                value={currentPassword}
                                onChange={handleOnChange}
                                placeholder='Enter current Password'
                                className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                            />
                            <span onClick={() => setShowPassword1((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer text-white"
                            >
                            {showPassword1 ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                            </span>
                        </label>
                        <label className="text-richblack-50 flex flex-col gap-2 w-full relative">New Password
                            <input 
                                type={showPassword2 ? "text" : "password"} 
                                name="newPassword" 
                                value={newPassword}
                                onChange={handleOnChange}
                                placeholder='Enter new Password'
                                className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                            />
                            <span onClick={() => setShowPassword2((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer text-white"
                            >
                            {showPassword2 ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                            </span>
                        </label> 
                    </div>
                    <div className='flex items-center gap-4 mt-2'>
                        <button type="submit"
                            className='px-6 py-2 text-lg rounded-md bg-yellow-100  transition-all duration-200 hover:scale-95 border border-richblack-100 cursor-pointer'
                        >Save</button>
                        <button onClick={()=>{navigate('/dashboard/my-profile')}}
                            className="px-6 py-2 rounded-md text-lg bg-richblack-700 text-richblack-100 transition-all duration-200 hover:scale-95 border border-richblack-300 cursor-pointer "
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
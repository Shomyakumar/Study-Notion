
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { setLoading } from '../../../../slices/authSlice';
import {toast} from 'react-hot-toast'
import { apiConnector } from '../../../../services/apiconnector';
import {settingsEndpoints} from '../../../../services/apis';
import { setUser } from "../../../../slices/profileSlice";

export default function UpdateDetails(){

    const {UPDATE_PROFILE_API}=settingsEndpoints;

    const {user}=useSelector((state)=>state.profile);
    const { token } = useSelector((state) => state.auth);

    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        firstName:`${user.firstName}`,
        lastName:`${user.lastName}`,
        dateOfBirth:`${user.additionalDetails.dateOfBirth }`,
        gender:`${user.additionalDetails.gender } `,
        contactNumber:`${user.additionalDetails.contactNumber }`,
        about:`${user.additionalDetails.about }`,

    })
    const{firstName,lastName,dateOfBirth,gender,contactNumber,about}=formData;
    const dispatch=useDispatch();

    function handleOnChange(e){
        setFormData((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value,
            }
        })
    }
    const userData={
        firstName:firstName,
        lastName:lastName,
        dateOfBirth:dateOfBirth,
        gender:gender,
        contactNumber:contactNumber,
        about:about,
    }
    function updateUserDetails(userData){
        return async (dispatch)=>{

            const toastId=toast.loading("Loading..")
            dispatch(setLoading(true));
            
            console.log("user data is",userData);
            try{
                    const response=await apiConnector("PUT",UPDATE_PROFILE_API,userData,{
                        Authorization: `Bearer ${token}`,
                      });
                    console.log("update profile response",response);

                    if(!response.data.success)
                    {
                        throw new Error(response.data.message);
                    }
                    toast.success("User details updated Successfully");

                    // dispatch(setUser(response.data.data))
                    
                    dispatch(
                        setUser(response.data.user)
                    )
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
        <div  className="  bg-richblack-800 w-full max-w-[700px]  py-4 px-4 lg:px-6 lg:py-6 rounded-md border border-richblack-600 ">
            <h2 className="text-lg text-richblack-50 font-bold mb-6">Profile Information</h2>

            <form className='flex flex-col gap-4' onSubmit={()=>{dispatch(updateUserDetails(userData))}}>
                <div className='flex gap-4 items-center w-full'>
                    <label className="text-richblack-50 flex flex-col gap-2 w-full">First Name
                        <input type="text" name="firstName" value={firstName} onChange={handleOnChange}
                             className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                        />
                    </label>
                    <label className="text-richblack-50 flex flex-col gap-2 w-full">Last Name
                        <input type="text" name="lastName" value={lastName} onChange={handleOnChange}
                             className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                        />
                    </label>  
                </div>
                <div className='flex gap-4 items-center w-full'>
                    <label className="text-richblack-50 flex flex-col gap-2 w-full">Date of Birth
                        <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={handleOnChange}
                             className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                        />
                    </label>
                    <label className="text-richblack-50 flex flex-col gap-2 w-full">Gender
                        <input type="text" name="gender" value={gender} onChange={handleOnChange} placeholder='Enter gender'
                             className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                        />
                    </label>   
                </div>
                <div className='flex gap-4 items-center w-full'>
                    <label className="text-richblack-50 flex flex-col gap-2 w-full">Contact Number
                        <input type="number" name="contactNumber" required value={contactNumber } placeholder='1111-2222' onChange={handleOnChange}
                             className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                        />
                    </label>
                    <label className="text-richblack-50 flex flex-col gap-2 w-full">About
                        <input type="text" name="about" value={about} onChange={handleOnChange} placeholder='Enter About'
                             className="bg-richblack-600 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full "
                        />
                    </label>  
                </div>
                <div className='flex items-center gap-4 my-4'>
                    <button type="submit"
                        className='px-6 py-2 text-lg rounded-md bg-yellow-100  transition-all duration-200 hover:scale-95 border border-richblack-100 cursor-pointer'
                    >Save</button>
                    <button onClick={()=>{navigate('/dashboard/my-profile')}}
                        className="px-6 py-2 rounded-md text-lg bg-richblack-700 text-richblack-100 transition-all duration-200 hover:scale-95 border border-richblack-300 cursor-pointer "
                    >Cancel</button>
                </div>
            </form>
            
        </div>
    )
}
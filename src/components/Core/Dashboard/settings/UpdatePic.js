

import { LuUpload } from "react-icons/lu";
import {useSelector,useDispatch} from 'react-redux';
import { useState } from "react";
import { apiConnector } from "../../../../services/apiconnector";
import { setLoading } from "../../../../slices/authSlice";
import { toast } from "react-hot-toast";
import {settingsEndpoints} from "../../../../services/apis"
import { setUser } from "../../../../slices/profileSlice";

export default function UpdatePic(){

    const{UPDATE_PROFILE_PICTURE_API}=settingsEndpoints;

    const dispatch=useDispatch();
    const {user,loading}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

    function handleUpload (selectedFile) {

        return async (dispatch) => {
            const toastId = toast.loading("Loading...");
            dispatch(setLoading(true));
            try {
                    const formData = new FormData();
                    formData.append('profileImage', selectedFile);
                    formData.append('id', user._id);
                    formData.append('token',token);
                    console.log("form data is",formData);
                    const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_API, formData);
                    console.log("UPDATE_PROFILE_PICTURE_API API RESPONSE............", response);
                    console.log(response.data);
                
                    if (!response.data.success) {
                        throw new Error(response.data.message);
                    }
                
                    toast.success("Profile updated Successfully");
                    dispatch(setUser(response.data.data))
                    // localStorage.setItem("user", JSON.stringify(response.data.user));
                    // toast.success("Login again to see updated picture.");
              
                } 
            catch (error)
                {
                    console.log("UPDATE_PROFILE_PICTURE_API ERROR............", error);
                    toast.error("Could Not upload image");
                }
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        };
    }



    return(
        
        <div className="flex gap-8 items-center bg-richblack-800 w-full max-w-[700px]  py-4 px-4 lg:px-6 lg:py-6 rounded-md border border-richblack-600 ">
             <img src={user?.image} alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[70px] rounded-full object-cover '
                        />
            <div className="flex flex-col gap-4 ">
                <p className="text-lg text-richblack-50 font-bold">Change Profile  Picture</p>

                <div className="flex flex-col md:flex-row gap-4 items-center ">

                <label className="px-6 py-2 rounded-md text-lg bg-richblack-700 text-richblack-100 transition-all duration-200 hover:scale-95 border border-richblack-300 cursor-pointer">
                    Select File
                    <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    />
                </label>
                   
                    <button className={`px-6 py-2 text-lg rounded-md bg-yellow-50  transition-all duration-200 hover:scale-95 border border-richblack-300 `}
                        onClick={()=>{dispatch(handleUpload(selectedFile))}}
                    >
                        <p className="flex items-center gap-2"><LuUpload />Upload <span>{
                            selectedFile&& 1
                        }</span></p>
                    </button>
                </div>
            </div>
        </div>
    )
}
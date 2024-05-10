import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";
// import { useNavigate } from "react-router-dom";

export default function UpdatePassword(){


    const [formData,setFormData]=useState({
        newPassword:"", confirmNewPassword:""
    })
    const[showPassword1,setShowPassword1]=useState(false);
    const[showPassword2,setShowPassword2]=useState(false);

    const {loading}=useSelector((state)=>state.auth);

      function changeHandler(e){
        setFormData((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value,
            }
        })
      }
      const dispatch=useDispatch();
    //   const navigate=useNavigate();
      const{newPassword,confirmNewPassword}=formData;
      const location=useLocation()

      function handleOnSubmit(e){
        e.preventDefault();
        const token=location.pathname.split('/').at(-1);
        console.log("token is",token);
        dispatch(resetPassword(newPassword,confirmNewPassword,token));
        setFormData({newPassword:"", confirmNewPassword:""});
      }
    
    return(
        <div className="max-w-[1260px] w-11/12 mx-auto flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
        {
            loading?(<div className="spinner"></div>):
            (
                <div className="flex flex-col gap-4 max-w-[400px] w-11/12 mx-auto items-start">
                <h2 className="text-3xl sm:text-4xl text-richblack-5 font-semibold text-center">Create new password</h2>
                <p className="text-richblack-100">Almost done. Enter your new password and you're all set.</p>

                <form onSubmit={handleOnSubmit} className="flex flex-col w-full gap-4 ">
                    <label className="relative">
                        <p className="text-richblack-100 mb-1 ">New password<sup className="text-pink-200">*</sup></p>
                        <input 
                            required type={showPassword1?"text":"password"}
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formData.newPassword} onChange={changeHandler}
                            className=" bg-richblack-800 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full"

                        ></input>
                        <span onClick={()=>{setShowPassword1((prevState)=>!prevState)}} className="absolute text-richblack-200 text-lg top-[40px] right-[10px]">
                        {
                            showPassword1?(<AiOutlineEye/>):(<AiOutlineEyeInvisible/>)
                        }
                        </span>
                    </label>
                    <label className="relative">
                        <p className="text-richblack-100 mb-1 ">Confirm new password<sup className="text-pink-200">*</sup></p>
                        <input 
                            required type={showPassword2?"text":"password"}
                            name="confirmNewPassword"
                            placeholder="Confirm password"
                            value={formData.confirmNewPassword} onChange={changeHandler}
                            className=" bg-richblack-800 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full"

                        ></input>
                        <span onClick={()=>{setShowPassword2((prevState)=>!prevState)}} className="absolute text-richblack-200 text-lg top-[40px] right-[10px]">
                        {
                            showPassword2?(<AiOutlineEye/>):(<AiOutlineEyeInvisible/>)
                        }
                        </span>
                    </label>
                    <button type="submit" className="w-full text-richblack-900 bg-yellow-50 rounded-md py-2  font-semibold
                            hover:scale-95 transition-all duration-200 mt-2 ">
                            Reset Password
                    </button>
                </form>
                <div>
                    <Link to="/login">
                        <p className="text-richblack-100 flex items-center gap-2"><span><FaArrowLeftLong /></span>Back to Login</p>
                    </Link>
                </div>
            </div>
        
           
         )
        }
        </div>    
    )
}
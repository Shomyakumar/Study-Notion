import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPasswordResetToken } from "../services/operations/authApi";

export default function ForgotPassword(){

    const {loading}=useSelector((state)=>state.auth);
    const [emailSend,setEmailSend]=useState(false);
    const[email,setEmail]=useState("");
    const dispatch=useDispatch();

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSend));
        
    }
    return(
        <div className="max-w-[1260px] w-11/12 mx-auto flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
        {
            loading?(
                <div className="spinner"></div>
            ):
            (
               <div className="max-w-[370px] flex flex-col items-start gap-6 ">
                    <h1 className="text-3xl sm:text-4xl text-richblack-5 font-semibold text-center">
                        {
                            !emailSend ? "Reset your password" :"Check your Email."
                        }
                    </h1>
                    <p className="text-richblack-100">
                        {
                            !emailSend ? "Have no fear. We'll email you instructions to resest your password. If you dont have access to your email we can try account recovery"
                            :`We have sent the reset email to ${email}`
                        }
                    </p>
                    <form onSubmit={handleOnSubmit} className="flex flex-col gap-6 w-full">
                        {
                            !emailSend &&
                            <label>
                                <p className="text-richblack-100 mb-2">Email Address <sup className="text-pink-200">*</sup></p>
                                <input type="email" name="email" placeholder="Enter your email address" required={true}
                                    value={email} onChange={(e)=>{setEmail(e.target.value)}}
                                    className="bg-richblack-800 text-richblack-5 p-2 rounded-md border-b border-b-richblack-300 w-full"
                                ></input>
                            </label>
                        }
                        <button type="submit" className="w-full text-richblack-900 bg-yellow-50 rounded-md py-2  font-semibold
                            hover:scale-95 transition-all duration-200 ">
                            {
                                !emailSend?"Reset Password":"Resend Email"
                            }
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
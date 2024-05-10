

import { useDispatch, useSelector } from "react-redux"
import OTPInput from "react-otp-input";
import { useState,useEffect } from "react";
import { FaRotateLeft } from "react-icons/fa6";
import { sendOtp, signUp } from "../services/operations/authApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function VerifyEmail(){

    const [otp,setOtp]=useState("");

    const {loading}=useSelector((state)=>state.auth);
    const{signupData}=useSelector((state)=>state.auth)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])

    

    function handleOnSubmit(e){
        e.preventDefault();
        const{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            
    
        }=signupData;        
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));

    }

    return(

        <div className="max-w-[1260px] w-11/12 mx-auto flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
        {
            loading?(<div className="spinner"></div>):
            (
                <div className="flex flex-col gap-4 max-w-[400px] w-11/12 mx-auto items-start">
                    <h2 className="text-3xl sm:text-4xl text-richblack-5 font-semibold text-center">Verify email</h2>
                    <p className="text-richblack-100">A verification code has been sent to you. Enter the code below.</p>

                    <form onSubmit={handleOnSubmit} className="w-full">

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                            <input
                            {...props}
                            placeholder="-"
                            style={{
                                
                            }}
                            className="w-[40px] lg:w-[60px] h-[40px] md:h-[50px]  text-2xl border-0  bg-richblack-800 rounded-md text-richblack-5 foucs:border-0 text-center  focus:outline-2 focus:outline-yellow-50"
                            />
                        )}
                        containerStyle={{
                            justifyContent: "space-between",
                            gap: "0 6px",
                            
                        }}
                     />


                        <button type="submit" className="w-full text-richblack-900 bg-yellow-50 rounded-md py-2  font-semibold
                                hover:scale-95 transition-all duration-200 mt-2 ">
                                Verify email
                        </button>
                    </form>
                        
                
                    <div className="flex w-full justify-between items-center mt-2">
                        <div >
                            <Link to="/login">
                                <p className="text-richblack-100 flex items-center gap-2"><span><FaArrowLeftLong /></span>Back to Login</p>
                            </Link>
                        </div>
                        
                        <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))} >
                            <p className="text-blue-200 flex gap-2 items-center" ><span><FaRotateLeft /></span>Resend it
                        </p></button>  
                        
                    </div>

                </div>
            )
        }
        </div>    
    )
    
}
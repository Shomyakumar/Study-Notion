

import { useForm } from "react-hook-form";
import countryCode from "../../../data/countrycode.json"
import { useState,useEffect } from "react";

export default function ContactForm(){
    
    const[loading,setLoading]=useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
      } = useForm();

      const submitContactForm=async (data)=>{
            console.log("the form data is",data);
            try{
                setLoading(true);
                // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
                const response = {status:"OK"};
                console.log("Logging response", response);
                setLoading(false);
            }
            catch(error)
            {
                console.log(error);
                setLoading(false);
            }
      }
      useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


    return(
    
        <form className="  rounded-md  flex flex-col gap-4 w-full" onSubmit={handleSubmit(submitContactForm)}>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-richblack-5" htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" placeholder="Enter first name" id="firstName"
                        className="bg-richblack-800 text-richblack-100 p-2 rounded-md border-b border-b-richblack-300 w-full"
                        {...register("firstName",{required:true})}
                    />
                    {
                        errors.firstName && (<span className="text-pink-200 text-sm">Enter first name</span>)
                    }
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-richblack-5" htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" placeholder="Enter last name"
                        className="bg-richblack-800 text-richblack-100 p-2 rounded-md border-b border-b-richblack-300 w-full"
                        {...register("lastName")}
                        />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-richblack-5">Email address</label>
                <input type="email" name="email" id="email" placeholder="Enter email address"
                 className="bg-richblack-800 text-richblack-100 p-2 rounded-md border-b border-b-richblack-300 w-full"
                 {...register("email",{required:true})}
                 />
                 {
                    errors.email && (<span className="text-pink-200 text-sm">Enter valid email address</span>)
                 }
            </div>
            <div>
                
                <label className="text-richblack-5" htmlFor="phoneNumber">Phone Number</label>
                
                <div className="flex  gap-4 my-2">
                    <select className="w-[60px]  rounded-md bg-richblack-800 text-richblack-100 border-b border-b-richblack-300">
                    {
                        countryCode.map((item,index)=>{
                            return(
                                <option key={index} value={item.code}>{item.code} -{item.country}</option>
                            )
                        })
                    }
                    </select>
                    <input type="number" id="phoneNumber" name="phoneNumber" placeholder="12345 12345"
                        className="bg-richblack-800 text-richblack-100 p-2 rounded-md border-b border-b-richblack-300 flex-1"
                        {...register("phoneNumber",{
                            required:{value:true, message:"Please enter Phone Number"},
                            maxLength: {value:10, message:"Invalid Phone Number"},
                            minLength:{value:8, message:"Invalid Phone Number"}
                        })}

                    />
                </div>
                    {
                        errors.phoneNumber && (
                            <span className="text-pink-200 text-sm">
                                {errors.phoneNumber.message}
                            </span>
                        )
                    }
                    
            </div>
            <div>
                <label htmlFor="message" className="text-richblack-5">Message</label>
                <textarea name="message" id="message" placeholder="Enter your message."  rows={5}
                    className="mt-2 p-2 rounded-md bg-richblack-800 text-richblack-100 border-b border-b-richblack-300 w-full"
                    {...register("message",{required:true})}
                />
                {
                    errors.message&&(<span className="text-pink-200 text-sm">Enter your message.</span>)
                }
            </div>
            <button type="submit" className="w-full text-richblack-900 bg-yellow-100 rounded-md py-2  font-semibold
            hover:scale-95 transition-all duration-200 ">
                Send Message
            </button>
        </form>
    
    )
}
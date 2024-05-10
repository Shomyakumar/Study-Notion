import ContactForm from "../components/Core/About/ContactForm"
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import Footer from "../components/common/Footer";
export default function Contact(){
    return(
        <div>
            <div className="w-11/12 max-w-[1260px] gap-8 flex-wrap mx-auto flex justify-between items-center sm:items-start flex-col md:flex-row pb-[60px]">
                <div className="flex flex-col gap-6 bg-richblack-800 p-4 sm:p-8 mt-10 rounded-md max-h-max">
                    <div className="flex items-start gap-4 text-richblack-5   ">
                        <div className="pt-1 text-lg">
                            <IoChatboxEllipsesSharp/>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-richblack-50">Connect with us</p>
                            <p className="text-richblack-300">Our team is here to help.</p>
                            <p className="text-richblack-300">shomyakumar90@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 text-richblack-5   ">
                        <div className="pt-1 text-lg">
                            <FaGlobeAmericas/>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-richblack-50">Visit us</p>
                            <p className="text-richblack-300">Come and say hello at our HQ.</p>
                            <p className="text-richblack-300">Manduwala,Dehradun,Uttarakhand</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 text-richblack-5   ">
                        <div className="pt-1 text-lg">
                            <IoIosCall/>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-richblack-50">Call us</p>
                            <p className="text-richblack-300">Mon - Fri From 8am to 5pm.</p>
                            <p className="text-richblack-300">+123 456 7890</p>
                        </div>
                    </div>
                </div>
                <div className=" max-w-max flex flex-col  gap-4 mt-[40px] sm:px-8 sm:py-10 sm:border sm:border-richblack-200 rounded-md">
                        <p className="text-richblack-5 font-bold text-4xl max-w-[600px] ">Got a Idea? We’ve got the skills. Let’s team up</p>
                        <p className="text-richblack-100 mb-[50px] max-w-max">Tell us more about yourself and what you’re got in mind.</p>
                        <ContactForm/>
                       
                </div>
            </div>
            <Footer/>
        </div>
    )
}
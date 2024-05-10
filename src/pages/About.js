import aboutUs1 from "../assets/Images/aboutus1.webp"
import aboutUs2 from "../assets/Images/aboutus2.webp"
import aboutUs3 from "../assets/Images/aboutus3.webp"
import foundation from "../assets/Images/FoundingStory.png"

import HighlightText from "../components/Core/HomePage/HighlightText"
import LearningGrid from "../components/Core/About/LearningGrid"
import Footer from "../components/common/Footer"
import ContactForm from "../components/Core/About/ContactForm"

export default function About(){
    return (
        <div>
            {/* section 1 */}
            <div className="bg-richblack-800">
                <div className="relative max-w-[1260px] w-11/12 mx-auto flex flex-col items-center pt-[60px] gap-4 sm:pb-[200px] pb-[100px] ">
                    <p className="text-white mb-4">About us</p>
                    <p className="text-4xl text-white font-inter font-semibold max-w-[800px] text-center">Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/></p>
                    <p className="text-richblack-300 font-inter text-center max-w-[740px]">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    
                    <div className="flex gap-4 absolute md:-bottom-[150px] -bottom-[50px] sm:-bottom-[100px] ">
                        <div className="max-w-[360px]">
                            <img  src={aboutUs1} alt="aboutUs1"></img>
                        </div>
                        <div className="max-w-[360px]">
                            <img  src={aboutUs2} alt="aboutUs2"></img>
                        </div>
                        <div className="max-w-[360px]">
                            <img  src={aboutUs3} alt="aboutUs3"></img>
                        </div>
                
                    </div>
                </div>
            </div>
            {/* Section 2 */}
            <div className="bg-richblack-900 pb-[80px]  border-b-richblack-600 border-b">
                <div className="relative max-w-[1260px] w-11/12 mx-auto sm:pt-[200px] pt-[100px] ">
                    <p className="text-3xl font-inter font-semibold text-richblack-100 text-center  ">
                        <span className="text-richblack-600">"</span> We are passionate about revolutionizing the way we learn. Our innovative platform <span className="text-[#1FA2FF]">combines technology</span>, <span className="text-[#1FA2FF] ">expertise</span>, and community to create an <span className="text-[#1FA2FF]">unparalleled educational experience</span>.<span className="text-richblack-600"> "</span>
                    </p>
                </div>
            </div>
            {/* section 3 */}
            <div className="max-w-[1260px] w-11/12 mx-auto py-[80px]">
                <div className="flex justify-between flex-col md:flex-row  gap-6 items-center ">
                    <div className="max-w-[600px] flex flex-col gap-4">
                        <p className="foundation-story text-4xl font-semibold mb-2">
                            Our Founding Story 
                        </p>
                        <p className="text-richblack-300">
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className="text-richblack-300">
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>
                    <div>
                        <img src={foundation} alt="foundation"></img>
                    </div>
                </div>
                <div className="flex justify-between flex-col md:flex-row  gap-8 items-center mt-[100px] ">
                    <div className="max-w-[500px]">
                        <p className="font-bold text-4xl mb-6"><HighlightText text={"Our vision"}></HighlightText></p>
                        <p className="text-richblack-300">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className="max-w-[500px]">
                        <p className="font-bold text-4xl foundation-story mb-6">Our Mission</p>
                        <p className="text-richblack-300">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>

            {/* section 4 */}

            <div className="bg-richblack-800 ">
                <div className=" py-8 max-w-[1260px] w-11/12  mx-auto flex flex-wrap gap-4 items-center justify-center sm:justify-between">
                    <div className="p-2 flex flex-col justify-center items-center">
                        <p className="text-richblack-5 text-xl font-bold">5K</p>
                        <p className="text-richblack-300">Active Students</p>
                    </div>
                    <div className=" p-2 flex flex-col justify-center items-center">
                        <p className="text-richblack-5 text-xl font-bold">10+</p>
                        <p className="text-richblack-300">Mentors</p>
                    </div>
                    <div className=" p-2 flex flex-col justify-center items-center">
                        <p className="text-richblack-5 text-xl font-bold">200+</p>
                        <p className="text-richblack-300">Courses</p>
                    </div>
                    <div className="p-2 flex flex-col justify-center items-center">
                        <p className="text-richblack-5 text-xl font-bold">50+</p>
                        <p className="text-richblack-300">Awards</p>
                    </div>
                    
                </div>
            </div>
            {/* section 5 */}
            <div className="bg-richblack-900">
                <div className="max-w-[1260px] w-11/12  mx-auto my-[80px] flex flex-col justify-center items-center">
                    <LearningGrid/>
                    <div className=" max-w-max flex flex-col items-center gap-4 mt-[40px] sm:px-8 sm:py-10 sm:border sm:border-richblack-200 rounded-md">
                        <p className="text-richblack-5 font-bold text-3xl">Get in Touch</p>
                        <p className="text-richblack-100 mb-[50px]">We’d love to here for you, Please fill out this form.</p>
                        <ContactForm/>
                       
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer/>
            
        </div>
    )
}

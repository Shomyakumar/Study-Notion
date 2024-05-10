
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from "react-router-dom"
import { FooterLink2 } from "../../data/footer-links"
import { FaHeart } from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";
import { PiFacebookLogoFill } from "react-icons/pi";
import { PiGoogleLogoFill } from "react-icons/pi";
import { PiTwitterLogoFill } from "react-icons/pi";
import { PiYoutubeLogoFill } from "react-icons/pi";

export default function Footer(){
    return(
        <div className="bg-richblack-800 pt-14 pb-8" >
            <div className=" max-w-[1260px] w-11/12 mx-auto flex flex-wrap justify-between text-richblack-300 font-inter pb-6 border-b border-b-richblack-500">

                {/* left part */}

                <div className="flex flex-wrap gap-6 border-r border-r-richblack-500 w-[50%] justify-between pr-[4%] ">
                    <div className="flex flex-col gap-1">
                        <Link to="/"><img src={Logo} alt="studyNotion" className="w-[160px] mb-2"></img></Link>
                        <p className="text-[16px] font-semibold text-richblack-100 leading-8">Company</p>
                        <div className="flex flex-col  text-[14px] leading-[26px]" >
                            <Link to="about">About</Link>
                            <Link to="careers">Careers</Link>
                            <Link to="affiliates">Affiliates</Link>
                        </div>
                        <div className="flex leading-[26px] gap-2 py-2">
                            <Link><PiFacebookLogoFill className="text-xl"/></Link>
                            <Link to=""><PiGoogleLogoFill className="text-xl"/></Link>
                            <Link to=""><PiTwitterLogoFill className="text-xl"/></Link>
                            <Link to=""><PiYoutubeLogoFill className="text-xl"/></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div >
                            <p className="text-[16px] font-semibold text-richblack-100 leading-8">Resources</p>
                            
                            <div className="flex flex-col  text-[14px] leading-[26px] " >
                                <Link to="articles">Articles</Link>
                                <Link to="blog">blog</Link>
                                <Link to="chart-sheet">Chart Sheet</Link>
                                <Link to="code-challenges">Code challenges</Link>
                                <Link to="docs">Docs</Link>
                                <Link to="projects">Projects</Link>
                                <Link to="videos">Videos</Link>
                                <Link to="workspaces">Workspaces</Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] font-semibold text-richblack-100 leading-8">Support</p>
                            <Link to="/help-center">Help Center</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-[16px] font-semibold text-richblack-100 leading-8">Plans</p>
                            <div className="flex flex-col  text-[14px] leading-[26px] " >
                                <Link to="paid-membership">Paid Membership</Link>
                                <Link to="for-students">For students</Link>
                                <Link to="business-solutions">Business solutions</Link>
                                
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] font-semibold text-richblack-100 leading-6">Community</p>
                            <div className="flex flex-col  text-[14px] leading-[22px]" >
                                <Link to="/forums">forums</Link>
                                <Link to="/chapters">Chapters</Link>
                                <Link to="/events">Events</Link>
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* right part */}

                
                    <div className="flex flex-row flex-wrap gap-6 w-[46%] justify-between">
                        <div className="flex flex-col  text-[14px] leading-[26px] ">
                            <p className="text-[16px] font-semibold text-richblack-100 leading-8">Subjects</p>
                            {
                                FooterLink2[0].links.map((item,index)=>{
                                    return(
                                        <Link to={item.link} key={index}>{item.title}</Link>
                                    )
                                })
                            }
                        </div>
                        <div className=" flex flex-col text-[14px] leading-[26px]">
                            <p className="text-[16px] font-semibold text-richblack-100 leading-8">Languages</p>
                            {
                                FooterLink2[1].links.map((item,index)=>{
                                    return(
                                        <Link to={item.link} key={index}>{item.title}</Link>
                                    )
                                })
                            }
                        </div>
                        <div className="flex flex-col text-[14px] leading-[26px]">
                            <p className="text-[16px] font-semibold text-richblack-100 leading-8">Career building</p>
                            {
                                FooterLink2[2].links.map((item,index)=>{
                                    return(
                                        <Link to={item.link} key={index}>{item.title}</Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                
            </div>
            <div className="mt-4 max-w-[1200px] w-11/12 mx-auto flex flex-col sm:flex-row gap-4 justify-between text-richblack-300 font-inter text-[14px] leading-3 ">
                <div className="flex gap-2">
                    <Link to="privacy-policy">
                        <p className="border-r border-r-richblack-500 pr-2">Privacy Policy</p>
                    </Link>
                    <Link to="privacy-policy">
                        <p className="border-r border-r-richblack-500 pr-2">Cookie Policy</p>
                    </Link>
                    <Link to="privacy-policy">
                        <p className="border-r border-r-richblack-500 pr-2">Terms</p>
                    </Link>
                    
                    
                </div>
                <div>
                    <p className="flex items-center gap-2">Made with <FaHeart className="text-pink-300" /> Shomya Kumar <MdCopyright /> 2024 StudyNotion</p>
                </div>
            </div>
        </div>
    )
}
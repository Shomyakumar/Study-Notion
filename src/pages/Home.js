
import{FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import HighlightText from '../components/Core/HomePage/HighlightText';
import Button from '../components/Core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/Core/HomePage/CodeBlocks';
import TimelineSection from '../components/Core/HomePage/TimelineSection';
import LearningLanguage from '../components/Core/HomePage/LearningLanguage';
import Footer from '../components/common/Footer';
import Instructor from '../assets/Images/Instructor.png'
import ExploreMore from '../components/Core/HomePage/ExploreMore';

export default function Home(){
    return(
        <div>

            {/* Section 1 */}
            
            <div className=' relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
             text-white justify-between '>
                <Link to={"/Signup"}>

                    <div className='rounded-full font-bold bg-richblack-800 text-richblack-100 
                        transition-all duration-200 hover:scale-95 mt-16 p-1 group  border-b border-b-richblack-500 ' >
                       <div className='flex items-center gap-2 rounded-full px-10 py-[5px] 
                            transition-all duration-200 group-hover:bg-richblack-900'>

                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                       </div>
                    </div>
                </Link>
                <div className='text-4xl font-semibold mt-7 text-center'>
                    Empower your future with
                    <HighlightText text="Coding Skills"/>
                </div>

                <div className='mt-4 max-w-[980px] text-center text-lg font-bold text-richblack-200 flex sm:hidden'>
                    With our online coding courses, you can learn at your own pace, from anywhere
                    in the world, and get access to a wealth of resources.
                </div>
                <div className='mt-4 max-w-[980px] text-center text-lg font-bold text-richblack-200 hidden sm:flex'>
                    With our online coding courses, you can learn at your own pace, from anywhere
                    in the world, and get access to a wealth of resources, including hands-on projects, 
                    quizzes, and personalized feedback from instructors.
                </div>
                <div className=' flex gap-7 mt-8'>

                    <Button active={true} linkto={"/signup"}>Learn More</Button>
                    <Button linkto={"/login"}>Book a demo</Button>

                </div>

                <div className='relative mx-3 my-12 shadow-blue-200   max-w-[1100px] z-10'>
                    <video  
                    muted
                    loop
                    autoPlay
                    >
                    <source src={Banner} type="video/mp4"/>
                    </video>
                    
                    <div className='absolute top-3 left-[4%] h-[50%] w-[90%]  oval -z-10 bg-white '></div>
                </div>
                {/* code section 1 */}
                <div className='w-full'>
                    <CodeBlocks
                        position={"md:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock your <HighlightText text={"Coding Potential "}/>
                                with our online courses.
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        btn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        btn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html>\n <head>\n <title>Ed Tech Platform</title>\n</head>\n<body>\n<h1>Welcome to studyNotion</h1>\n</body>\n </html>`}
                        codeColor={"text-yellow-25"}
                        backgroundGradient={"codeblock1"}
                        
                    />
                </div>
                {/* code section 2*/}
                <div className='w-full '>
                    <CodeBlocks
                        position={"md:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start <HighlightText text={"Coding in seconds "}/>
                                
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        btn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        btn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html>\n <head>\n <title>Ed Tech Platform</title>\n</head>\n<body>\n<h1>Welcome to studyNotion</h1>\n</body>\n </html>`}
                        codeColor={"text-blue-100"}
                        backgroundGradient={"codeblock2"}
                    />
                </div>
                <ExploreMore/>

            </div>
            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage-bg h-[280px]'>
                    <div className='h-full w-11/12 max-w-maxContent flex  justify-center items-center gap-5 mx-auto'>
                        
                        <div className='flex flex-col sm:flex-row gap-7 text-white mt-10 '>
                            <Button linkto={"/signup"} active={true}>
                                <div className='flex items-center gap-3'>
                                Explore full Catalog <FaArrowRight/>
                                </div>
                            </Button>
                            <Button linkto={"/signup"} active={false}>
                                Learn More
                            </Button>

                        </div>
                    </div>
                </div>  

                <div className=' mx-auto w-11/12 max-w-maxContent flex flex-col items-center
                 gap-7 '>
                    <div className='flex flex-col md:flex-row gap-5 mb-10 mt-[90px] justify-between'>
                        <div className='font-semibold text-4xl '>
                            Get the Skills you need for a <HighlightText text={"Job that is in demand"}></HighlightText>
                        </div>
                        <div className='flex flex-col items-start gap-10 '>
                            <p className='text-lg'>The modern studyNotion is that dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <Button active={true} linkto={"/signup"}>Learn More</Button>
                        </div>
                    </div>

                    <TimelineSection/>
                    <LearningLanguage/>
                    
                 </div>      
            </div>
            {/* Section 3 */}
                <div className='bg-richblack-900'>
                    <div className='w-11/12 max-w-maxContent flex flex-col md:flex-row items-start  justify-between md:items-center gap-8 mx-auto py-16'>
                        <div className='relative max-w-[600px] z-10'>
                            <img src={Instructor} alt="instructor"></img>
                            <div className='w-full h-full bg-white absolute -top-4 -left-4 -z-10'></div>
                        </div>
                        <div className='flex flex-col items-start'>
                            <p className='text-4xl font-semibold text-white max-w-[200px] mb-2'>Become an <HighlightText text={"Instructor"}/></p>
                            <p className='text-richblack-300 mb-10 max-w-[460px]'>Instructions from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                            <Button active={true} linkto={"/signup"}><p className='flex items-center gap-3'>Start Teaching Today <FaArrowRight/></p></Button>
                        </div>
                    </div>
                </div>
            {/* Footer */}
            <Footer/>
        </div>
    )
}
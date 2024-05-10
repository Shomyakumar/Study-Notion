



import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useSelector,useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { useEffect, useState } from "react";
import RatingStars from "../components/common/RatingStars"
import GetAvgRating from "../utils/avgRating"
import { useNavigate } from "react-router-dom";
import Modal from "../components/Core/Dashboard/Modal";
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import {toast} from 'react-hot-toast';
import copy from "copy-to-clipboard"
import CourseSection from "../components/Core/CourseDetails/CourseSection";
import Footer from '../components/common/Footer'
import {buyCourse} from '../services/operations/studentFeaturesAPI'
import ReviewSlider from '../components/common/ReviewSlider';
import { addToCart } from "../slices/cartSlice";
import { ACCOUNT_TYPE } from "../utils/constants"

export default function CourseDetails(){

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const [modal,setModal]=useState(null);
    const courseId  = useParams().id;
    const [courseDetails,setCourseDetails]=useState(null);

    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
      const count = GetAvgRating(courseDetails?.ratingAndReview)
      setAvgReviewCount(count)
    }, [courseDetails])

    async function getCourseDetails(){

        
        try{
            console.log("the id of course is",courseId)
            let response=await fetchCourseDetails(courseId);
            console.log("the fetched course details is: ",response);
            setCourseDetails(response.data.courseDetails);
            console.log("course details is",courseDetails);
        }
        catch(error)
        {
            console.log("Error in fetcing course details.")
        }
        
    }
    useEffect(()=>{
        getCourseDetails();
    },[courseId])

    function formatDate(createdAt){
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
      }

    const [totalLectures,setTotalLectures]=useState(0);

    useEffect(()=>{
        let lectures=0;
        courseDetails?.courseContent?.forEach((sec)=>{
            lectures+=sec.subSection.length||0
        })
        setTotalLectures(lectures);
    },[courseDetails])

    function handleBuyCourse(){
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
        }
        else
        {
            setModal({
                text1:"You are not logged in",
                text2:"Please Log in to purchase the course.",
                btn1Text:"Login",
                btn2Text:"Cancel",
                btn1Handler:()=>navigate("/login"),
                btn2Handler:()=>setModal(null),

            })
        }

    }
    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
          toast.error("You are an Instructor. You can't buy a course.")
          return
        }
        if (token) {
          dispatch(addToCart(courseDetails))
          return
        }
        
        setModal({
            text1:"You are not logged in",
            text2:"Please Log in to add to cart.",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setModal(null),

        })
      }
      if (loading) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
    return(

            <div>
                <div className="bg-richblack-800 ">
                    <div className="w-11/12 max-w-[1260px] mx-auto  pt-16 pb-24 flex flex-col   gap-6 relative">

                        
                            <div className=" flex-col gap-4  hidden lg:flex absolute top-10 right-0 bg-richblack-700  rounded-md p-4 w-1/3">
                                <img className="rounded-md" src={courseDetails?.thumbnail} alt={"course-thumbnail"}></img>
                                <div>
                                    <p className="text-xl font-bold text-richblack-5">Rs. {courseDetails?.price}</p>
                                </div>
                                <button onClick={handleBuyCourse}
                                    className="transition-all duration-200 hover:scale-95 py-2 bg-yellow-50 w-full rounded-md text-lg font-bold">Buy Now</button>
                                <button onClick={handleAddToCart}
                                className="transition-all duration-200 hover:scale-95 py-2 bg-richblack-900 text-richblack-5 w-full rounded-md text-lg font-bold">Add to Cart</button>
                                <p className="text-sm text-center text-richblack-50">30-Day Money-Back Guarantee</p>
                                

                                <div className="flex justify-center">
                                    <button
                                    className="flex items-center gap-2 text-yellow-100 "
                                    onClick={handleShare}
                                    >
                                    <FaShareSquare size={15} /> Share
                                    </button>
                                </div>
                            </div>
                        
                        <div className="block lg:hidden ">
                            <img className="rounded-md " src={courseDetails?.thumbnail} alt={"course-thumbnail"}></img>
                        </div>

                        <div className="flex  flex-col  gap-4 max-w-[800px] lg:w-2/3">
                            <h1 className="text-[#fdfd4d] text-4xl font-bold">{courseDetails?.courseName}</h1>
                            <p className="text-richblack-200 ">{courseDetails?.courseDescription}</p>
                            <div className="text-md flex flex-wrap items-center gap-2 text-richblack-5">
                                <span className="text-yellow-25">{avgReviewCount}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                <span>{`(${courseDetails?.ratingAndReview.length} reviews)`}</span>
                                <span>{`${courseDetails?.studentsEnrolled.length} students enrolled`}</span>
                            </div>
                            <p className="text-richblack-5 ">Created by {courseDetails?.instructor?.firstName +" "+courseDetails?.instructor?.lastName}</p>
                            <p className="text-richblack-5 flex items-center gap-2 "><BiInfoCircle/>Created at {formatDate(courseDetails?.createdAt)}</p>
                            <p className="text-caribbeangreen-25 flex items-center gap-2 "><HiOutlineGlobeAlt/><span>English and Hindi</span></p>
                            <div className="flex flex-col gap-4 lg:hidden">
                                <div>
                                    <p className="text-xl font-bold text-richblack-5">Rs. {courseDetails?.price}</p>
                                </div>
                                <button onClick={handleBuyCourse}
                                    className="transition-all duration-200 hover:scale-95 py-2 bg-yellow-50 w-full rounded-md text-lg font-bold">Buy Now</button>
                                <button onClick={handleAddToCart}
                                className="transition-all duration-200 hover:scale-95 py-2 bg-richblack-500 text-richblack-5 w-full rounded-md text-lg font-bold">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-[40px] lg:pb-[100px]">
                    <div className="w-11/12 max-w-[1260px] mx-auto  my-8">
                        <div className="lg:w-2/3 lg:pr-8">
                                <div className="border border-richblack-300 p-4">
                                    <h2 className="text-3xl font-bold text-richblack-5">What you will learn</h2>
                                    <p className="text-richblack-50 my-2">{courseDetails?.whatYouWillLearn}</p>

                                </div>
                        </div>
                        <h2  className="text-3xl font-bold text-richblack-5 mt-6">Course content</h2>
                        <div className="lg:w-2/3 lg:pr-8 my-6">
                            {
                                courseDetails?.courseContent.map((section,id)=>{
                                    return(
                                        <CourseSection data={section} key={id}/>
                                    )
                                })
                            }
                        </div>
                        <div className="my-10">
                            <p className="text-3xl text-white font-bold my-4">Author</p>
                            <div className="flex gap-4 items-center">
                                <img className="aspect-square rounded-full max-w-[60px] object-cover" src={courseDetails?.instructor?.image} alt="author"></img>
                                <div>
                                    <p className="flex items-center gap-2 text-caribbeangreen-100 text-xl"><span>{courseDetails?.instructor?.firstName}</span>{courseDetails?.instructor?.lastName}</p>
                                    
                                    <p className="text-richblack-50">{courseDetails?.instructor?.additionalDetails?.about}</p>
                                    

                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
                {
                    modal && <Modal modlaData={modal}></Modal>
                }
                <Footer/>
            </div>
        )
    
}
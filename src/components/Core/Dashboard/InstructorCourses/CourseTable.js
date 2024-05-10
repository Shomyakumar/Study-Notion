
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import { FaCheck } from "react-icons/fa"
import { HiClock } from "react-icons/hi"
import { COURSE_STATUS } from "../../../../utils/constants"
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { setCourse } from "../../../../slices/courseSlice";
import { FaPlus } from "react-icons/fa";

export default function CourseTable(){

    const navigate=useNavigate();
    const{token}=useSelector((state)=>state.auth);
    const [courses,setCourses]=useState([]);
    const [modal,setModal]=useState(null);
    const[loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const {editCourse} = useSelector((state)=>state.course);

    async function fetchCourses(){
        setLoading(true);
        const result=await fetchInstructorCourses(token);
        console.log("the result is",result);
        if(result)
        {
            setCourses(result);
        }
        setLoading(false);
        
    }
    useEffect(()=>{
        fetchCourses();
        
    },[])

    function formatDate(createdAt){
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    async function handleDeleteButton(id){
        setLoading(true);
        const data={
            "courseId":id,
        }
        setModal(null);
        await deleteCourse(data,token);
        fetchCourses();
        setLoading(false);
    }
    function editCourseDetails(courseId){
        navigate(`/dashboard/edit-course/${courseId}`);
        
    }
    
    return(
        <div>
            <div className="flex justify-between  items-center mb-6">
                <h2 className="text-3xl  text-richblack-5 ">My Courses</h2>
                <button 
                onClick={()=>navigate('/dashboard/add-course')}
                className="px-6 py-2 rounded-md  bg-richblack-700 flex gap-x-2 items-center  border-yellow-50 text-yellow-5 border-2  hover:scale-95 transition-all duration-150">
                   <FaPlus/> Add Course
                </button>
            </div>
            
            <div className="flex flex-col gap-8">
                {
                    
                        courses.map((course,index)=>{
                            return(
                                <div key={index} className="bg-richblack-800   rounded-lg border-2 border-richblack-300 flex flex-col lg:flex-row  items-center gap-6" >
                                    <div className=" p-2 h-full">
                                        <img src={course.thumbnail} alt={course.courseName} className="rounded-md object-cover max-h-[250px] h-full   "></img>
                                    </div>
                                    <div className=" flex gap-2 flex-col p-2 ">
                                        <p className="text-xl font-bold text-yellow-50">{course.courseName}</p>
                                        <p className="text-xs text-richblack-200 max-w-[500px]">{course.courseDescription}</p>
                                        <p className="text-sm text-richblack-5">Created at: <span className="text-xs">{formatDate(course.createdAt)}</span></p>
                                        <p className="text-sm flex items-center gap-x-2 text-richblack-5">Price {" "} <span className="flex items-center text-[#47c2f7]"><BsCurrencyRupee />{course.price}</span></p>
                        
                                            {course.status === COURSE_STATUS.DRAFT ? (
                                                <p className="my-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                    <HiClock size={14} />
                                                    Drafted
                                                </p>
                                                ) : (
                                                <p className="my-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700  px-2 py-[2px] text-[12px]  text-caribbeangreen-50">
                                                    <div className="flex h-3 w-3 items-center justify-center rounded-full  text-richblack-700 bg-caribbeangreen-50">
                                                    <FaCheck size={8} />
                                                    </div>
                                                    Published
                                                </p>
                                            )}
                                        <div className=" flex gap-4 items-center">
                                            <button 
                                                disabled={loading}
                                                onClick={()=>{editCourseDetails(course._id)}}
                                                className="px-6 py-2 rounded-md  bg-yellow-50 hover:scale-95 transition-all duration-150">
                                               <p className="flex items-center gap-2">Edit <AiOutlineEdit /></p>
                                            </button>
                                            <button 
                                                disabled={loading}
                                                className="px-6 py-2 rounded-md  bg-richblack-600 text-richblack-5 hover:scale-95 transition-all duration-150"
                                                onClick={()=>{

                                                    setModal({
                                                    text1:"Are you sure ?",
                                                    text2:"This course will be deleted.",
                                                    btn1Text:"Delete",
                                                    btn2Text:"Cancel",
                                                    btn1Handler:()=>{handleDeleteButton(course._id)},
                                                    btn2Handler:()=>{setModal(null)},
                                                    })
                                                }}
                                            >               
                                                <p className="flex items-center gap-2">Delete<MdDelete /></p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    
                }
            </div>
            {
                modal&& <Modal modlaData={modal}/>
            }
        </div>
    )
}
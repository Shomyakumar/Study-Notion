

import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slices/courseSlice";
import { setEditCourse } from "../../../../slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";


export default function EditCourse(){

    const dispatch=useDispatch();
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course);
    const{token}=useSelector((state)=>state.auth);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        async function getCourseDetails(){
            setLoading(true);
            
            const result=await getFullDetailsOfCourse({courseId},token);
            console.log("the result is",result);
            if(result)
            {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }
        getCourseDetails();
    },[])
    if(loading)
    {
        return(
            <div className="spinner"></div>
        )
    }
    return(
        <div>
            <h2 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h2>
            <div>
            {
                course ? (<RenderSteps/>):(<p>Course Not Found</p>)
            }
            </div>
        </div>
    )
}
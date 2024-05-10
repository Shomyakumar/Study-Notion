
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../../../../slices/courseSlice';
import { setEditCourse } from '../../../../../slices/courseSlice';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { resetCourseState } from '../../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

export default function Publish(){

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    useEffect(()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED)
        {
            setValue("public",true);
        }
    },[])

    function goBack(){
        dispatch(setStep(2));
        
    }
    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }
    const handleCoursePublish = async () => {
        // check if form has been updated or not
        if (
          (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
          (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ) {
          // form has not been updated
          // no need to make api call
          goToCourses()
          return
        }
        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public")
          ? COURSE_STATUS.PUBLISHED
          : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formData, token)

        if (result) {
            goToCourses()
        }
        setLoading(false)
    }

    function onSubmit(){
        handleCoursePublish();
    }
    return(
        <div className='bg-richblack-800 border border-richblack-300 p-6 rounded-md'>
            <h2 className='text-richblack-5 text-3xl'>Publish Courses</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='my-4'>
                    <label htmlFor='public' className='text-richblack-5 flex  items-center gap-x-2'>
                        <input
                        id="public"
                        type="checkbox"
                        {...register("public")}
                        className='h-5 w-5 '
                        >

                        </input>
                        <span>Make this course as public</span>
                    </label>
                </div>
                <div className="flex gap-6 w-full justify-between my-6">
                    <button 
                        type='button'
                        onClick={goBack}
                        disabled={loading}
                        className=' cursor-pointer flex gap-1 items-center outline outline-yellow-50 px-6 py-2 text-yellow-50  font-semibold rounded-md hover:scale-95 transition-all duration-150'>
                            <FaArrowLeft/>
                            Back     
                    </button>   
                    <button type="submit"
                            className='cursor-pointer flex gap-1 items-center  px-6 py-2  bg-yellow-50 font-semibold rounded-md hover:scale-95 transition-all duration-150'>
                            Save Changes
                               
                    </button>   
                </div>
            </form>
        </div>
    )
}


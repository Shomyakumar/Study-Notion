

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setStep,setEditCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import NestedView from './NestedView';

export default function CourseBuilderForm(){
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const[editSectionNameId,setEditSectionNameId]=useState(null);
    const {course}=useSelector((state)=>state.course);
    const dispatch=useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const[loading,setLoading]=useState(false);

    function cancelEdit(){
        setEditSectionNameId(null);
        setValue("sectionName","");
    }
    function goBack(){
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    function goToNext(){
        
        if(course.courseContent.length===0)
        {
            toast.error("Please add atleast one section");
            return;
        }
        if(course.courseContent.some((section)=>section.subSection.length===0))
        {
            toast.error("Please add atleast one lecture in each section");
            // return;
        }
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName=(sectionId,sectionName)=>{
        if(editSectionNameId===sectionId)
        {
            cancelEdit();
            return;
        }
        setEditSectionNameId(sectionId);
        setValue("sectionName",sectionName);
    }
    

    async function onSubmit(data){

        setLoading(true);
        let result;

        if(editSectionNameId){
            result=await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionId:editSectionNameId,
                    courseId:course._id,
                }, token
            )
        }
        else{
            result=await createSection({
                sectionName:data.sectionName,
                courseId:course._id,

            },token);
        }
        // update values
        if(result)
        {
            dispatch(setCourse(result));
            setEditSectionNameId(null);
            setValue("sectionName","");
        }
        setLoading(false);

    }

    return (
        <div className="">
            <h2 className='text-3xl text-richblack-5'>Course Builder</h2>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-6 p-6 bg-richblack-800 rounded-md my-8">
                <div>
                    <label  htmlFor='sectionName' className='text-richblack-5 '>Section name<sup className='text-pink-200'>*</sup></label>
                    <input
                    
                        id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName", {required:true})}
                        className='w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '
                    />
                    {
                        errors.sectionName && (
                            <span className="ml-1 text-xs tracking-wide text-pink-200">Section name is required</span>
                        )
                    }
                </div>
                <div className='flex items-center gap-4 justify-between w-full'>
                    <button type="submit" className='flex gap-1 items-center  px-6 py-2 bg-yellow-50 font-semibold rounded-md hover:scale-95 transition-all duration-150'>
                        {
                            editSectionNameId?"Edit section name":"Create Section" 
                        }
                        <IoAddCircleOutline/>
                    </button>
                    {
                        editSectionNameId &&(
                        
                        <button onClick={cancelEdit}
                            className='flex gap-1 items-center outline px-6 py-2 text-richblack-5 bg-richblack-600 font-semibold rounded-md hover:scale-95 transition-all duration-150'>
                                Cancel edit
                                
                            </button>
                        )
                    }
                </div>

            </form>
            {
                course.courseContent.length>0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />

                )
                
            }
            <div className="flex gap-6 w-full justify-end my-8">
                <button onClick={goBack}
                        className=' cursor-pointer flex gap-1 items-center outline outline-yellow-5 px-6 py-2 text-yellow-5  font-semibold rounded-md hover:scale-95 transition-all duration-150'>
                            
                            <FaArrowLeft/>
                            Back
                            
                                
                </button>   
                <button onClick={goToNext}
                        className='cursor-pointer flex gap-1 items-center outline px-6 py-2 text-yellow-5 outline-yellow-5 font-semibold rounded-md hover:scale-95 transition-all duration-150'>
                           Next
                           <FaArrowRight/>   
                </button>   
            </div>
        </div>
    )
}
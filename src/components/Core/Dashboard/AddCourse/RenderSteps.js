import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import Publish from './PublishCourse/Publish';

const RenderSteps = () => {

    const {step} = useSelector((state)=> state.course);

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]

  return (
    <>
        
        <div className='flex w-full justify-center'>
            {steps.map( (item) => (
                <div key={item.id} className={` ${item.id!==steps.length?"w-[38%]":"max-w-max"} flex`} >
                    
                    <div className={`rounded-full w-[34px] aspect-square flex justify-center items-center border-[1px]  ${step >= item.id 
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
                    {
                        step > item.id ?  (<FaCheck className="font-bold " />) :(item.id)
                    }
                    </div>
                    
                    {/* Add COde for dashes between the labels */}
                    {item.id !== steps.length && (
                        <div className={` h-[17px] w-full border-b-[2px] border-dashed
                            ${step>item.id ?"border-yellow-50":"border-richblack-500"}`} >
                        </div>
                    
                    )}
                </div>
            ) )}
        </div>
        
        <div className="relative mb-16 flex w-full select-none justify-between mt-2">
            {steps.map((item) => (
               
                    <div className="min-w-[150px]  justify-center flex " key={item.id} >
                        <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500" }`}
                        >{item.title}</p>
                    </div>
                
            ))}
        </div>

        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm/>}
        {step===3 && <Publish/>}
    </>
  )
}

export default RenderSteps

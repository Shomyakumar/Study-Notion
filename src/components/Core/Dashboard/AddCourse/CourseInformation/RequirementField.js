import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {

    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("");
    const [requirementsList, setRequirementsList] = useState([]);

    useEffect(() => {
        if (editCourse) {
            
            const arrayData= JSON.parse(course.instructions);
            if(arrayData)
            {

                setRequirementsList(arrayData)
            }
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    

    useEffect(()=> {
        setValue(name, requirementsList);
    },[requirementsList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedrequirementsList = [...requirementsList];
        updatedrequirementsList.splice(index, 1);
        setRequirementsList(updatedrequirementsList);
    }

  return (
    <div>

        <label htmlFor={name} className='text-richblack-5'>{label}<sup className='text-pink-200 '>*</sup></label>
        <div className='mt-2'>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder='Enter requirements'
                className='w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50 mt-2'>
                Add
            </button>
        </div>

        {
            requirementsList.length > 0 && (
                <ul>
                    {
                        requirementsList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span className='text-sm'>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs text-pure-greys-300 px-2'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
            <span className='text-xs text-pink-200'>
                {label} is required
            </span>
        )}
      
    </div>
  )
}

export default RequirementField

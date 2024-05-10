import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { BiUpload } from 'react-icons/bi';
import RequirementField from './RequirementField';
import { setStep, setCourse} from '../../../../../slices/courseSlice';
import ChipInput from './ChipInput';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { toast } from 'react-hot-toast';
import Upload from '../Upload';
import UploadThumbnail from './UploadThumbnail';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {course, editCourse} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(()=> {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() )
            return true;
        else
            return false;
    }

    //handles next button click 
    const onSubmit = async(data) => {

        if(editCourse) {
            if(isFormUpdated()) {
                const currentValues = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);
            if(currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle);
            }

            if(currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc);
            }

            if(currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice);
            }

            if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits);
            }

            if(currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory);
            }

            if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }
            if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
            }

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            setLoading(false);
            if(result) {
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
            } 
            else {
                toast.error("NO Changes made so far");
            }
            console.log("PRINTING FORMDATA", formData);
            console.log("PRINTING result", result);

            return;
        }

        //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage",data.courseImage);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("tag", JSON.stringify(data.courseTags))
        

        setLoading(true);
        console.log("BEFORE add course API call");
        console.log("PRINTING FORMDATA", formData);
        const result = await addCourseDetails(formData,token);
        if(result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);

    }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 border-[1px] bg-richblack-800 p-6 space-y-6'
    >
        <div className="flex flex-col space-y-2">
            <label  htmlFor='courseTitle' className='text-richblack-5 '>Course Title<sup className='text-pink-200'>*</sup></label>
            <input
                
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required:true})}
                className='w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '
            />
            {
                errors.courseTitle && (
                    <span className="ml-1 text-xs tracking-wide text-pink-200">Course title is required</span>
                )
            }
        </div>

        <div className="flex flex-col space-y-2">
            <label  htmlFor='courseShortDesc' className='text-richblack-5 '>Course Short Description<sup className='text-pink-200'>*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className='min-h-[100px] w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '
                />
            {
                errors.courseShortDesc && (<span className="ml-1 text-xs tracking-wide text-pink-200">
                    Course Description is required
                </span>)
            }
        </div>

        <div className="flex flex-col space-y-2 relative">
            <label htmlFor='coursePrice' className='text-richblack-5 '>Course Price<sup className='text-pink-200'>*</sup></label>
            <input
                type="number"
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true
                })}
                className='pl-6 w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '
            />
            <HiOutlineCurrencyRupee  className='absolute top-8 text-lg text-richblack-50 text-bold left-1'/>
            {
                errors.coursePrice && (
                    <span className="ml-1 text-xs tracking-wide text-pink-200">Course Price is Required</span>
                )
            }
        </div>

        <div className="flex flex-col space-y-2">
            <label htmlFor='courseCategory'className='text-richblack-5 '>Course Category<sup className='text-pink-200'>*</sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required:true})}

            className=' w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '

            >
                <option value="" disabled >Choose a Category</option>

                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}
                            className=' w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '
                        >
                            {category?.name}
                        </option>
                    ))
                }

            </select>
            {errors.courseCategory && (
                <span className="ml-1 text-xs tracking-wide text-pink-200">
                    Course Category is Required
                </span>
            )}
        </div>

        {/* create a custom component for handling tags input */}

        <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        <UploadThumbnail
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
        />
        
        {/*     Benefits of the Course */}
        

        <div className="flex flex-col space-y-2">
            <label className='text-richblack-5 '>Benefits of the course<sup className='text-pink-200'>*</sup></label>
            <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className='min-h-[130px] w-full p-1 rounded-md border-b border-b-richblack-300 bg-richblack-600 text-richblack-5 '

            />
            {errors.courseBenefits && (
                <span className="ml-1 text-xs tracking-wide text-pink-200">
                    Benefits of the course are required
                </span>
            )}
        </div>

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        <div className='flex gap-6'>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-600 w-full justify-center rounded-md outline 
                    outline-richblack-100 hover:scale-95 transition-all duration-150 font-semibold text-richblack-5'
                    >
                        Continue without saving
                    </button>
                )
            }

            
            <div className='w-full flex justify-end'>
                <button className='px-6 py-2 bg-yellow-50 font-semibold rounded-md hover:scale-95 transition-all duration-150 w-full outline outline-yellow-50'
                >
                {!editCourse ? "Next" : "Save Changes"}</button>
            </div>
        </div>
    </form>
  )
}

export default CourseInformationForm

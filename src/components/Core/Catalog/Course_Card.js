import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReview);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="max-w-[400px] border border-richblack-300 rounded-md bg-richblack-800 ">
          <div className="rounded-lg w-full">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`max-h-[200px] w-full rounded-t-md object-cover object-center `}
            />
          </div>
          <div className="flex flex-col gap-2 px-2 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex flex-col  gap-2">
              <div className='flex gap-2'>
                <span className="text-yellow-5">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
              </div>
              
              <span className="text-richblack-400">
                {course?.ratingAndReview?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card



const RatingAndReview=require('../models/RatingAndReview');
const Course=require('../models/Course');
const mongoose = require("mongoose");

exports.createRating=async(req,res)=>{
    try{
            const userId=req.user.id;
            const{courseId,rating,review}=req.body;
            if(!courseId || !userId || !rating || !review)
            {
                res.status(400).json({
                    success:false,
                    message:"All details are required."
                    
                })
            }
            // check user has purchased course or not
            // const courseDetails=await Course.findById(courseId);
            const uid =new mongoose.Types.ObjectId(userId);

            // const studentsEnrolled=courseDetails.studentsEnrolled;
            // if(!studentsEnrolled.includes(uid))
            // {
            //     res.status(400).json({
            //         success:false,
            //         message:"User is not enrolled in the course."
                    
            //     })
            // }
            // check user has already reviewed course or not.

            const alreadyReviewed=await RatingAndReview.findOne({user:userId,course:courseId});

            if(alreadyReviewed)
            {
                return res.status(400).json({
                    success:false,
                    message:"User has already reviewed the course."
                    
                })
            }

            const newRating=await RatingAndReview.create({rating,review,course:courseId,user:userId});

            const updatedCourse=await Course.findByIdAndUpdate(courseId,{
                $push:{ratingAndReview:newRating._id}
            },{new:true});

            console.log(updatedCourse);

            res.status(200).json({
                success:true,
                message:"User has successfuly reviewed the course.",
                updatedCourse,
            })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while creating review."
            
        })
    }
}

exports.getAverageRating=async(req,res)=>{

    try{
            const {courseId}=req.body;

            const result=await RatingAndReview.aggregate([
                {
                    $match:{
                        course:new mongoose.Schema.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating:{$avg:"$rating"},
                    }
                }
            ])
            if(result.length>0)
            {
                return res.status(200).json({
                    success:true,
                    averageRating:result[0].averageRating,
                })
            }
            return res.status(200).json({
                success:true,
                message:"Average rating is 0 , no rating given till now.",
                averageRating:0,
            })

    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while geting average rating. "
            
        })
    }
}

exports.getAllRating=async(req,res)=>{
    try{

        const allReviews=await RatingAndReview.find({})
                            .sort({rating:"desc"})
                            .populate({
                                path:"user",
                                select:"firstName lastName email image",
                            })
                            .populate({
                                path:"course",
                                select:"courseName",
                            })
                            .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully.",
            data:allReviews,
        })

    }
    
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while fetching rating and reviews. "
            
        })
    }
    
}
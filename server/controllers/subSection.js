
const Course=require('../models/Course')
const Section=require('../models/Section');
const SubSection=require('../models/SubSection');
const uploadImageToCloudinary=require('../utils/imageUploader');
require('dotenv').config();

exports.createSubSection=async(req,res)=>{
    try
    {
        const{sectionId,title,timeDuration="",description=""}=req.body;
        const video=req.files.videoFile;
        
        if(!sectionId || !title )
        {
            return res.status(400).json({
                success:false,
                message:"Enter all details properly."
            })
        }
        if(!video )
        {
            return res.status(400).json({
                success:false,
                message:"Video not found."
            })
        }

        const uploadedVideo=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const newSubSection=await SubSection.create({title,timeDuration,description,videoUrl:uploadedVideo.secure_url});
        const updatedSection=await Section.findByIdAndUpdate(sectionId,{
            $push:{
                subSection:newSubSection._id,
            }
        },{new:true}).populate("subSection").exec();
        res.status(200).json({
            success:true,
            message:"subSection created successfully.",
            data:updatedSection,

        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while creating subSection."

        })
    }
}
exports.updateSubSection=async(req,res)=>{
    try
    {
        const{courseId,subSectionId,title,timeDuration="",description=""}=req.body;
        let video;
        try{
             video=req.files.videoFile;
        }
        catch(error)
        {
            
        }

        if(!subSectionId )
        {
            return res.status(400).json({
                success:false,
                message:"Details are missing to update subsection."
            })
        }
        
        const updatedSubSection=await SubSection.findByIdAndUpdate(subSectionId,{title,timeDuration,description},{new:true});
        
        if(video)
        {
            const uploadedVideo=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            await SubSection.findByIdAndUpdate(subSectionId,{videoUrl: uploadedVideo.secure_url,});
            updatedSubSection.videoUrl=uploadedVideo.secure_url;
        }
        const updatedCourse = await Course.findOne({
            _id: courseId,
          })
            .populate({
              path: "instructor",
              populate: {
                path: "additionalDetails",
              },
            })
            .populate("category")
            .populate("ratingAndReview")
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            })
            .exec()
        res.status(200).json({
            success:true,
            message:"subSection updated successfully.",
            data:updatedCourse,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while updating subSection."

        })
    }
}
exports.deleteSubSection=async(req,res)=>{
    try
    {
        const{subSectionId,sectionId}=req.body;
     
        if(!subSectionId || !sectionId )
        {
            return res.status(400).json({
                success:false,
                message:"Details are missing to delete subsection."
            })
        }
        await Section.findByIdAndUpdate(sectionId,{
            $pull:{
                subSection:subSectionId,
            }
        })
        await SubSection.findByIdAndDelete(subSectionId);

        const updatedSection = await Section.findById(sectionId).populate("subSection")
        res.status(200).json({
            success:true,
            message:"subSection deleted successfully.",
            data:updatedSection
            
        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while deleting subSection."

        })
    }
}
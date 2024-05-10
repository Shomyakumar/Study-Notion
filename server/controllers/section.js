
const Course=require('../models/Course')
const Section =require('../models/Section');
const SubSection=require('../models/SubSection')

exports.createSection=async(req,res)=>{
    
    try{

        const{sectionName,courseId}=req.body;
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Missing required properties."
            })
        }
        const newSection= await Section.create({sectionName});
        const updatedCourse=await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent:newSection._id
                }
            },{new:true})
            .populate({

				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

        res.status(200).json({
            success:true,
            message:"Section created successfully.",
            updatedCourse,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while creating section."

        })
    }
}
exports.updateSection=async(req,res)=>{
    
    try{

        const{sectionId,sectionName,courseId}=req.body;
        if(!sectionName||!sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"Please enter all details."
            })
        }
        await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName});
        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        res.status(200).json({
            success:true,
            message:"Section updated successfully.",
            data:course,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while updating section."

        })
    }
}
exports.deleteSection=async(req,res)=>{
    
    try{

        const{sectionId}=req.body;
        const {courseId}=req.body;
        if(!sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"."
            })
        }
        const section=await Section.findById(sectionId);
        // do we need to delete section id from course Section.
        const updatedCourse=await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
        },{new:true})
        .populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        await SubSection.deleteMany({_id:{$in:section.subSection}})
        await Section.findByIdAndDelete(sectionId);
        res.status(200).json({
            success:true,
            message:"Section deleted successfully.",
            data:updatedCourse,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while deleting section."

        })
    }
}
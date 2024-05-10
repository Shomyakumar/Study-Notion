const Profile=require('../models/Profile');
const Course=require('../models/Course');
const User=require('../models/User');
const uploadImageToCloudinary=require('../utils/imageUploader');
require('dotenv').config();

exports.updateProfile=async(req,res)=>{
    try{
        const {contactNumber,dateOfBirth="",gender="",about=""}=req.body;
            const id=req.user.id;

            
            const userDetails=await User.findById(id);
            const userProfile=await Profile.findById(userDetails.additionalDetails);


                
                userProfile.contactNumber=contactNumber;
                
            
                userProfile.dateOfBirth=dateOfBirth;
            
                userProfile.gender=gender;
            
                userProfile.about=about;

            await userProfile.save();
            
            const user = await User.findById(id).populate("additionalDetails").exec();

            return res.json({
                success: true,
                message: "Profile updated successfully",
                user
                
            });

    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message1:error.message,
            message2:"Error while updating profile."

        })
    }
}

exports.getAllUserDetails=async(req,res)=>{
    try
    {
        const id=req.user.id;
        const  userDetails=await User.findById(id)
            .populate("additionalDetails")
            .exec();
        
        console.log(userDetails);
        res.status(200).json({
            success:true,
            message:"User data fetched successfully.",
            data:userDetails,
        })

    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while fetching profile details."

        })
    }
}

exports.deleteAccount=async(req,res)=>{

    try{
            const id=req.user.id;

            const userDetails=await User.findById(id);
            if (!userDetails) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            const courses=userDetails.courses;
            // unenroll students from all courses.
            for(let i=0;i<courses.length;i++)
            {
                await Course.findByIdAndUpdate(courses[i],{$pull:{studentsEnrolled:id}},{new:true})
            }
            await Profile.findByIdAndDelete(userDetails.additionalDetails);
            await User.findByIdAndDelete(id);

            res.status(200).json({
                success:true,
                message:"User deleted successfully.",
            })


    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while deleting profile."

        })
    }
}

exports.updateProfilePicture=async(req,res)=>{
    try{

        const id=req.user.id;

        const image=req.files.profileImage;
        if(!image)
        {
            return res.status(404).json({
                success: false,
                message: "image not found",
            });
        }
        const uploadedImage=await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
        const updatedUser=await User.findByIdAndUpdate(id,{image:uploadedImage.secure_url},{new:true});

        res.status(200).json({
            success:true,
            message:"profile picture uploaded successfully.",
            data:updatedUser,
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while updating profile picture."

        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
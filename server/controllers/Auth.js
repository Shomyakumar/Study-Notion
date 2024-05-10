
const User=require('../models/User');
const Profile=require('../models/Profile');
const OTP=require('../models/OTP');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

require('dotenv').config();

exports.signup=async(req,res)=>{
    try{
            const{firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;

            if(!firstName || !lastName || !email || !password ||!confirmPassword ||!otp)
            {
                return res.status(403).json({
                    success:false,
                    message:"All fields are required.",
                    
                })
            }
            if(password!==confirmPassword)
            {
                return res.status(400).json({
                    success:false,
                    message:"Passwords do not match.",
                    
                })
            }
            const existing=await User.findOne({email});
            if(existing)
            {
                return res.status(400).json({
                    success:false,
                    message:"User already exists. Please sign in to continue.",
                    
                })
            }
            
            const recentCreatedOTP=await OTP.find({email}) .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .limit(1).exec();
            console.log(otp,recentCreatedOTP[0].otp);
            if(recentCreatedOTP[0].otp!==otp)
            {
                return res.status(401).json({
                    success:false,
                    message:"You entered wrong OTP.",
                    
                })
            }
            const hashed=await bcrypt.hash(password,10);

            const profileDetails=await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:null,
            });
            const newUser=await User.create(
                {
                    firstName,
                    lastName,
                    email,
                    accountType,
                    password:hashed,
                    additionalDetails:profileDetails._id,
                    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
                });
            
            
            return res.status(200).json({
                success:true,
                message:"Account created successfully.",
                newUser,
            })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            
        })
    }
}


exports.login=async(req,res)=>{
    try{
            const {email,password}=req.body;

            if(!email || !password)
            {
                return res.status(403).json({
                    success:false,
                    message:"All fields are required.",
                    
                })
            }
            let existingUser=await User.findOne({email}).populate("additionalDetails").exec();
            if(!existingUser)
            {
                return res.status(400).json({
                    success:false,
                    message:"User does not exists. Please sign up .",
                    
                })
            }

            const matched=await bcrypt.compare(password,existingUser.password);

            if(!matched)
            {
                return res.status(401).json({
                    success:false,
                    message:"You entered wrong password.",
                    
                })
            }
            else
                console.log("password matched.")

            const payload={
                email:existingUser.email,
                accountType:existingUser.accountType,
                id:existingUser._id,
            }
            const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"});

            existingUser=existingUser.toObject();
            existingUser.token=token;
            existingUser.password=undefined;

            const options={
                expires:new Date(Date.now()+ 3*24* 60*60*1000),
                httpsOnly:true,
            };

            res.cookie("Token",token,options).status(200).json({
                success:true,
                message:"User logged in successfully.",
                user:existingUser,
                token,
            })

    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error while login",
            
        })
    }
}

exports.sendotp=async(req,res)=>{
    try{
            const{email}=req.body;
            
            const existingUser=await User.findOne({email});
            if(existingUser)
            {
                res.status(403).json({
                    success:false,
                    message:"User already exist.",                    
                })
            }

            var otp=otpGenerator.generate(6,{

                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            const result = await OTP.findOne({ otp: otp });
		   
		    console.log("OTP", otp);
		    console.log("Result", result);
		    while (result) {
		    	otp = otpGenerator.generate(6, {
		    		upperCaseAlphabets: false,
                    lowerCaseAlphabets:false,
                    specialChars:false,
		    	});
		    }

            
            const otpBody=await OTP.create({email,otp});
            console.log("OTP Body", otpBody);
		    res.status(200).json({
		    	success: true,
		    	message: `OTP Sent Successfully`,
		    	otp,
		    });
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error while sending otp",
            
        })
    }
}

exports.changePassword=async(req,res)=>{

    try{
        const userDetails=await User.findById(req.user.id);
        const{oldPassword,newPassword}=req.body;
    
        const matched=await bcrypt.compare(oldPassword,userDetails.password);
    
        if(!matched)
        {
            res.status(401).json({
                success:false,
                message:"You entered wrong password",
                
            })
        }
        
        const hashedPass=await bcrypt.hash(newPassword,10);
    
        const updatedUser=await User.findByIdAndUpdate(req.user.id,{password:hashedPass},{new:true});

        try {
			const emailResponse = await mailSender(
				updatedUser.email,
                "Password updated",
				passwordUpdated(
					updatedUser.email,
					`Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} 
        catch (error) {
			
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}


        res.status(200).json({
            success:true,
            message:"password updated successfully."
        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error while updating password.",
            
        })
    }
    
}
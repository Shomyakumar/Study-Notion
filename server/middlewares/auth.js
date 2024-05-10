
const jwt=require('jsonwebtoken')
require('dotenv').config();
const User=require('../models/User');

exports.auth=async(req,res,next)=>{

    try{
            const token=req.cookies.Token ||
                        req.body.token || 
                        req.header("Authorization").replace("Bearer ","");
            
            if(!token)
            {
                res.status(401).json({
                    success:false,
                    message:"Token not found.",
                })
            }
            
           
            console.log("the token is",token);
            // decode the token.
            
            try{
                const decode =  jwt.verify(token, process.env.JWT_SECRET);
                console.log("the decoded token is",decode);
                req.user = decode;
            }
            catch(error){

                res.status(401).json({
                    success:false,
                    message:"Error while decoding token."
                })
        
            }
            next();
    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error while verifying token."
        })

    }
}

exports.isStudent=async(req,res,next)=>{
    try{
            if(req.user.accountType!=='Student')
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students.",
                
            })
            next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error user role can't be verified."
        })
    }
}
exports.isInstructor=async(req,res,next)=>{
    try{
        console.log(req.user);
            if(req.user.accountType!=='Instructor')
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor.",
                
            })
            next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error user role can't be verified."
        })
    }
}
exports.isAdmin=async(req,res,next)=>{
    try{
            console.log("the acccount type is",req.user.accountType);
            if(req.user.accountType!=='Admin')
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin.",
                
            })
            next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error user role can't be verified."
        })
    }
}
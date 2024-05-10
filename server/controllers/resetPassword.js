

const User=require('../models/User');
const mailSender=require('../utils/mailSender');
// const bcrypt=require('bcrypt');
const crypto=require('crypto');
// reset password token

function generatePassword(password) {
    const salt = "shomya"
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return genHash
}

exports.resetPasswordToken=async(req,res)=>{

    try{

        const {email}=req.body;
        const existing=await User.findOne({email});
        if(!existing)
        {
            return res.json({
                success:false,
                message:"Your email is not registered with us.",
            })
        }
        // generate token
        const token=crypto.randomUUID();
        const updatedDetails=await User.findOneAndUpdate({email},
                            {token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true});
    
        const url=`http://localhost:3000/update-password/${token}`
    
        await mailSender(email,"Password Reset Link",`Password Reset Link:${url}`);

        res.status(200).json({
            success:true,
            message:"Mail send successfully,please check and update password.",
            token,
        })
        
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Something went wrong while sending reset password link .",
            
        })
    }

}


exports.resetPassword=async(req,res)=>{
    
    try{

        const{newPassword,confirmNewPassword,token}=req.body;

        if(newPassword!==confirmNewPassword)
        {
            return res.json({
                success:false,
                message:"Passwords do not match try again.",
            })
        }

        const userDetails=await User.findOne({token});
        if(!userDetails)
        {
            return res.json({
                success:false,
                message:"Token expired please try again.",
            })
        }

        if(userDetails.resetPasswordExpires <Date.now())
        {
            return res.status(403).json({
                success:false,
                message:"Token expired please try again.",
            })
        }

        // const hashedPassword= await bcrypt.hash(newPassword,10);
        const hashedPassword= generatePassword(password);

        await User.findByIdAndUpdate(userDetails._id,{password:hashedPassword},{new:true});

        res.status(200).json({
            success:true,
            message:"Password reset successfully.",
            // newPassword:newPassword,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error while password reset.",
            
        })
    }

}
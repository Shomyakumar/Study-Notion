
const mailSender=require('../utils/mailSender');
const mongoose=require('mongoose');
const emailTemplate=require("../mail/templates/emailVerificationTemplate");
const OtpSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

// function to send mails

async function sendVerificationEmail(email,otp){
    try{
            const mailResponse=await mailSender(
                email,
                "Verification Email from StudyNotion",
                emailTemplate(otp),
                );
            console.log("Email send successfully",mailResponse);
    }
    catch(error)
    {
        console.log("Error while sending mail");
        throw error;
    }
}

OtpSchema.pre("save",async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})

module.exports=mongoose.model('OTP',OtpSchema);
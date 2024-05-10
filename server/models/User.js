
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    accountType:{
        type:String,
        required:true,
        enum:["Student","Instructor","Admin"],
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:true,

    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        
    }],
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseProgress',
    }],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    image: {
        type: String,
        required: true,
    },
},
{ timestamps: true },
)

module.exports=mongoose.model("User",userSchema);
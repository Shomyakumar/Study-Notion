
const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({

    courseName:{
        type:String,
        required:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        trim:true,
    },
    whatYouWillLearn:{
        type:String,
        trim:true,
    },
    
    price:{
        type:Number,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section',
        
    }],
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RatingAndReview',
    }],

    thumbnail: {
		type: String,
	},
	tag: {
		type: [String],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt: {
		type:Date,
		default:Date.now
	},


})

module.exports=mongoose.model("Course",courseSchema);
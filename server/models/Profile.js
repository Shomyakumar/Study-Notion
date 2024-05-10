
const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema({

    contactNumber: {
		type: Number,
		trim: true,
	},
    gender:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    },
    dateOfBirth:{
        type:String,

    }

})

module.exports=mongoose.model("Profile",profileSchema);
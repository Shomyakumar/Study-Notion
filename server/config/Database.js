const mongoose=require('mongoose');
require('dotenv').config();
const URL=process.env.URL;

const DbConnect=()=>{

    mongoose.connect(URL)
    .then(()=>{
        console.log("Database connection successful.")
    })
    .catch((error)=>{
        console.error(error);
        console.log("Error in database connection.")
        process.exit(1);
    })
}
module.exports=DbConnect;
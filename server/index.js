
const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');
const cors = require("cors");
app.use(
	cors({
		origin:"http://localhost:3000",
		origin:"https://study-notion-eight-khaki.vercel.app",
		credentials:true,
	})
)
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

const cloudinaryConnect=require('./config/Cloudinary');
cloudinaryConnect();

const DbConnect=require('./config/Database')
DbConnect();

const courseRoutes=require('./routes/Course');
const paymentRoutes=require('./routes/Payments');
const profileRoutes=require('./routes/Profile');
const userRoutes=require('./routes/User');
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/payment',paymentRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/auth',userRoutes);


const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
})


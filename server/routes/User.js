const express=require('express');
const router=express.Router();


const{signup,login,sendotp,changePassword}=require('../controllers/Auth');
const{auth}=require('../middlewares/auth');

const{resetPassword,resetPasswordToken}=require('../controllers/resetPassword');



router.post('/signup',signup);
router.post('/login',login);
router.post('/sendotp',sendotp);
router.put('/changePassword',auth,changePassword);

router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);

module.exports=router;
const express=require('express');
const router=express.Router();

const{
    updateProfile,
    getAllUserDetails,
    deleteAccount,
    updateProfilePicture,
    getEnrolledCourses,
}=require('../controllers/profile');

const {auth,isStudent,isInstructor,isAdmin}=require('../middlewares/auth');



router.put('/updateProfile',auth,updateProfile);
router.get('/getAllUserDetails',auth,getAllUserDetails);
router.delete('/deleteAccount',auth,deleteAccount);
router.put('/updateProfilePicture',auth,updateProfilePicture)
router.get('/getEnrolledCourses',auth,getEnrolledCourses);

module.exports = router;
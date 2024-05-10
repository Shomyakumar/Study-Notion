

const express=require('express');
const router=express.Router();

// Import the controllers.
const{createCourse,getAllCourses,getCourseDetails,getFullCourseDetails,getInstructorCourses,deleteCourse,editCourse}=require('../controllers/course');
const{createSection,updateSection,deleteSection}=require('../controllers/section');
const{createSubSection,updateSubSection,deleteSubSection}=require('../controllers/subSection');

const{createCategory,showAllCategories,categoryPageDetails}=require('../controllers/category');
const{createRating,getAverageRating,getAllRating}=require('../controllers/ratingAndReview');
const {auth,isStudent,isInstructor,isAdmin}=require('../middlewares/auth');


// ******************* creating routes ************************
// create course
router.post('/createCourse',auth,isInstructor,createCourse);
router.post('/editCourse',auth,isInstructor,editCourse);
// create section and update it
router.post('/createSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
// delete section
router.delete('/deleteSection',auth,isInstructor,deleteSection);
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
router.delete('/deleteCourse',auth,isInstructor,deleteCourse);

// create update and delete subsection.
router.post('/createSubSection',auth,isInstructor,createSubSection);
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
router.post('/deleteSubSection',auth,isInstructor,deleteSubSection);

router.get('/getAllCourses',getAllCourses);
router.post('/getFullCourseDetails',getFullCourseDetails)
router.post('/getCourseDetails',getCourseDetails)

// *******************admim middlewares****************************

router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/showAllCategories',showAllCategories);
router.post('/getCategoryPageDetails',categoryPageDetails);

// student middlewares.
router.post('/createRating',auth,isStudent,createRating);
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)
module.exports=router;
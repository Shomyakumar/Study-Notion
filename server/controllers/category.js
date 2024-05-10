

const Category=require('../models/Category');
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory=async(req,res)=>{

    try{
            console.log("request arrived to create category.")
            const{name,description}=req.body;
            if(!name )
            {
                res.status(400).json({
                    success:false,
                    message:"Enter all fields properly.",
                    
                })
            }

            await Category.create({name:name,description:description});
            return res.status(200).json({
                success: true,
                message: "Category Created Successfully",
            });
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            
        })
    }
}

exports.showAllCategories=async(req,res)=>{

    try{
            const categories=await Category.find({},{name:true,description:true});

            return res.status(200).json({
                success: true,
                message: "Categories fetched Successfully",
                data:categories,
            });
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      // console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [
          { path: "ratingAndReview" },
          { path: "instructor" }
        ]
      })
      .exec();
  
      console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.findOne({
        _id: { $ne: categoryId },
      })
      // let differentCategory = await Category.findOne(
      //   categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
      //     ._id
      // )
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [
          { path: "ratingAndReview" },
          { path: "instructor" }
        ]
      })
      .exec();
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory:categoriesExceptSelected,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
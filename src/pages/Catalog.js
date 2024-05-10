

import { useParams } from 'react-router-dom';
import Footer from '../components/common/Footer';
import {useState,useEffect} from 'react'
import Error from './Error'
import {getCatalogPageData} from "../services/operations/pageAndComponentData"
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import CourseSlider from '../components/Core/Catalog/CourseSlider';
import Course_Card from '../components/Core/Catalog/Course_Card';


export default function Catalog(){

    const [active, setActive] = useState(1)
    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState([]);
    const [categoryId,setCategoryId]=useState("");
    const[loading,setLoading]=useState(false);

    // fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
    //   if (!loading && !catalogPageData.success) {
    //     return <Error />
    //   }
    

    return(
        <div className=''>
        <div className=' bg-richblack-800'>
            <div className="flex  flex-col  gap-6 py-16 w-11/12 max-w-[1260px] mx-auto ">
                <p className="text-sm text-richblack-300">{`Home/Catalog/`}<span className="text-yellow-25">{catalogPageData?.data?.selectedCategory?.name}</span></p>
                <p className="text-4xl text-white">{catalogPageData?.data?.selectedCategory?.name}</p>
                <p className="max-w-[870px] text-richblack-100">{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
            <div className='bg-richblack-900'>
                <div className='w-11/12 max-w-[1260px] mx-auto'>
                {/* section1 */}
                    <div className='pb-10 pt-20'>
                        <h2 className='text-3xl font-medium text-richblack-5 '>Courses to get you started</h2> 
                        <div className="mt-4 flex  text-sm mb-6">
                            <p
                                className={`px-2 py-2 ${
                                active === 1
                                    ? "border-b border-b-yellow-25 text-yellow-25"
                                    : "text-richblack-50"
                                } cursor-pointer`}
                                onClick={() => setActive(1)}
                            >
                                Most Populer
                            </p>
                            <p
                                className={`px-2 py-2 ${
                                active === 2
                                    ? "border-b border-b-yellow-25 text-yellow-25"
                                    : "text-richblack-50"
                                } cursor-pointer`}
                                onClick={() => setActive(2)}
                            >
                                New Courses
                            </p>
                            </div>
                        <div>

                        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} id={2}/>
                        </div>
                    </div>
                    {/* section 2 */}
                    <div className='py-10'>
                        <h2 className='text-3xl font-medium text-richblack-5'>Top courses in {catalogPageData?.data?.differentCategory?.name}</h2>
                        <div className='my-4'>
                            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} id={2}/>
                        </div>
                    </div>
                    {/* section 3 */}
                    <div className='py-10'>
                        <h2 className='text-3xl font-medium text-richblack-5 '>Frequently bought </h2>
                        <div className='py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            
                            {
                                catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>{
                                    return(
                                        <Course_Card course={course} Height={"h-[400px]"} key={index} />
                                    )
                                })
                            }
                        </div>
                        

                    </div>
                </div>


            </div>
            <Footer/>
        </div>
        </div>
    )
}
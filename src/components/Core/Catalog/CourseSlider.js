


import Course_Card from './Course_Card'
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import 'swiper/css/effect-cards';  

export default function CourseSlider({Courses}) {
    return (
      <div className="swiper-container">
        
      <Swiper
        // ... (other Swiper properties)
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={25}
        slidesPerView={1} 
        loop={true}
        navigation={{
          prevEl: '.swiper-button-prev', 
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { // Adjust breakpoint if needed
            slidesPerView: 3,
          },
          768: { 
            slidesPerView: 2,
          },
        }}
      >
      {/* <button className="swiper-button-prev rounded-full text-white   "></button> */}
      {/* <button className="swiper-button-next rounded-full  text-white "></button> */}
      {/* <button className="custom-prev-btn rounded-full text-xl bg-white text-richblack-900"></button> */}
      {
        
            Courses?.length ? (
              <div className=' flex justify-between items-center'>
                    <div className='py-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12'>
                      {
                          Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                              <Course_Card course={course} Height={"h-[250px]"} />
                            </SwiperSlide>    

                          ))
                      } 
                    </div>  
                    
                </div>
            ) : (
                <p>No Course Found</p>
            )

        }
        {/* <button className="custom-next-btn rounded-full text-xl bg-white text-richblack-900"><IoIosArrowForward/></button> */}
      
        </Swiper>
      </div>
    );
  }
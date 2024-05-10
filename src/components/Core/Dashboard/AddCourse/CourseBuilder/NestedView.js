import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RxDropdownMenu } from "react-icons/rx";
import Modal from "../../Modal";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

export default function NestedView({handleChangeEditSectionName}){

    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    
    const [addSubSection,setAddSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);
    const [modal,setModal]=useState(null);
    
    async function handleDeleteSection(sectionId){
        const result=await deleteSection({sectionId,courseId:course._id},token);
        if(result){
            
            dispatch(setCourse(result));
        }
        setModal(null);

    }
    async function handleDeleteSubSection(subSectionId,sectionId){

        const result=await deleteSubSection({subSectionId,sectionId},token);

        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>
                section._id===sectionId?result:section);
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModal(null);
    }
    return(
        <div className=" mt-8">
        {
            course?.courseContent?.map((section)=>{
                return(
                    <details key={section._id} open className="rounded-md bg-richblack-700 p-6 my-6 border border-richblack-300">
                        <summary className="flex item-center justify-between gap-x-4 border-b  pb-2 border-richblack-300 ">
                            <div className="flex items-center gap-x-2 text-richblack-5">
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                            </div>
                            <div className="flex gap-x-2 items-center text-richblack-50">
                                <button 
                                    onClick={()=>{handleChangeEditSectionName(section._id,section.sectionName,course._id)}}
                                >
                                    <MdEdit/>
                                </button>
                                <button 
                                    onClick={()=>{
                                        setModal({
                                        text1:"Are you sure ?",
                                        text2:"This section will be deleted.",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=>{handleDeleteSection(section._id)},
                                        btn2Handler:()=>{setModal(null)},
                                        })
                                    }}
                                >
                                    <MdDelete/>
                                </button>
                                <span >|</span>
                                <BiSolidDownArrow className="text-xs"/>
                            </div>
                        </summary>
                        <div className="py-2">
                            {
                                section.subSection.map((data)=>{
                                    
                                    return(
                                        <div key={data._id}
                                            onClick={()=>{setViewSubSection(data)}}
                                            className="flex items-center justify-between gap-x-2 border-b  pb-2 border-richblack-300 mx-2"
                                        >
                                            <div className="flex items-center gap-x-3 py-2 text-richblack-50 ">
                                                <RxDropdownMenu/>
                                                <p className=" ">{data.title}</p>
                                            </div>

                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-x-2 text-richblack-100"
                                            >
                                                <button
                                                    onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                                >
                                                    <MdEdit/>
                                                </button>
                                                <button 
                                                    onClick={()=>{
                                                        setModal({
                                                        text1:"Are you sure ?",
                                                        text2:"This sub section will be deleted.",
                                                        btn1Text:"Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler:()=>{handleDeleteSubSection(data._id,section._id)},
                                                        btn2Handler:()=>{setModal(null)},
                                                        })
                                                    }}
                                                    >
                                                        <MdDelete/>
                                                </button>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                            <button 
                                className="flex gap-2 text-yellow-50 items-center"
                                onClick={()=>setAddSubSection(section._id)}
                            >
                                <AiOutlinePlus/>
                                Add Lecture
                            </button>
                        </div>
                    </details>
                )
            })
        }
        {
             modal&& <Modal modlaData={modal}/>
        }
        {
            addSubSection?(<SubSectionModal
                modalData={addSubSection}
                setModal={setAddSubSection}
                add={true}
            />)
            :viewSubSection?(<SubSectionModal
                modalData={viewSubSection}
                setModal={setViewSubSection}
                view={true}
            />)
            :editSubSection?(<SubSectionModal
                modalData={editSubSection}
                setModal={setEditSubSection}
                edit={true}
            />)
            :(<div></div>)
        }
        </div>
    )
}
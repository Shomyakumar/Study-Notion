

import {combineReducers} from '@reduxjs/toolkit'
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import sidebarReducer from "../slices/SidebarSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    sidebar:sidebarReducer,
})
export default rootReducer;
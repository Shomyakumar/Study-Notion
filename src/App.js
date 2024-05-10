
import{useSelector} from 'react-redux'
import './App.css'
import { Route,Routes } from "react-router-dom"
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OpenRoute from './components/Core/Auth/OpenRoute';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/Core/Dashboard/MyProfile';
import PrivateRoute from './components/Core/Auth/PrivateRoute';
import Error from './pages/Error'
import Setting from './components/Core/Dashboard/settings/Settings';
import Enrolledcourses from './components/Core/Dashboard/Enrolledcourses';
import Cart from './components/Core/Dashboard/Cart/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import AddCourse from './components/Core/Dashboard/AddCourse/index';
import CourseTable from './components/Core/Dashboard/InstructorCourses/CourseTable';
import EditCourse from './components/Core/Dashboard/EditCourse/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/Core/ViewCourseDetails/VideoDetails';


export default function App(){

  const {user}=useSelector((state)=>state.profile);
 
  
  return(
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/catalog/:catalogName' element={<Catalog/>}/>
          <Route path='/courses/:id' element={<CourseDetails/>} />
          
          <Route path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route path="about"
            element={
              
                <About />
             
            }
          />
          <Route path="contact"
            element={
              
                <Contact />
              
            }
          />
          <Route path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />
          <Route path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          
          <Route 
           element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
           }
           >
          
              <Route path="dashboard/my-profile" element={<MyProfile/>} />
              <Route path="dashboard/settings" element={<Setting/>} />
              {
                user?.accountType===ACCOUNT_TYPE.STUDENT &&(
                  <>
                    <Route path="dashboard/cart" element={<Cart/>} />
                    <Route path="dashboard/enrolled-courses" element={<Enrolledcourses/>} />
                  </>
                )
              }
              {
                
                user?.accountType===ACCOUNT_TYPE.INSTRUCTOR &&(
                  <>
                    <Route path="/dashboard/add-course" element={<AddCourse/>} />
                    <Route path="/dashboard/my-courses" element={<CourseTable/>} />
                    <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
                    
                  </>
                )
              }

            
          </Route>

          <Route element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
              
            )
          }

          </Route>

          <Route path="*" element={<Error/>}/>
          
        </Routes>
    </div>
  )
}

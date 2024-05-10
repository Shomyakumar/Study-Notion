
import UpdatePic from "./UpdatePic"
import UpdateDetails from "./UpdateDetails"
import UpdatePassword from "./UpdatePassword"
export default function Setting(){
    return(
        <div className="flex flex-col gap-8 items-start">
            <h1 className='text-4xl text-richblack-5 font-medium'>Edit Profile</h1>
            <UpdatePic/>
            <UpdateDetails/>
            <UpdatePassword/>
        </div>
    )
}

import { Outlet } from 'react-router-dom';

import {useSelector} from 'react-redux'
import Sidebar from '../components/Core/Dashboard/Sidebar';

export default function Dashboard(){


    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {loading:profileLoading}=useSelector((state)=>state.profile);

    if(profileLoading || authLoading)
    {
        return(
            <div className='mt-10  min-h-[100vh-3.5rem] flex justify-center items-center'>
                <div className='spinner'></div>
            </div>
        )
    }
    return(

        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <div className="flex-1 ">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet />
          </div>
        </div>
      </div>
    )
}
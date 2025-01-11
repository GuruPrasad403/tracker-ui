import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function layout(){
    
    return(
        <>
            <div className="grid grid-cols-12 grid-rows-1 h-full w-full ">
                <div className="col-span-0  md:col-span-0 lg:col-span-2  md:block">
                    <Sidebar />
                </div>
                <div className="col-span-10 md:col-span-9 lg:col-span-10 ">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
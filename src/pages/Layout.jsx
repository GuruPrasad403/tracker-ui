import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function layout(){
    
    return(
        <>
            <div className="grid grid-cols-10 grid-rows-1 h-full w-full ">
                <div className="col-span-0 md:col-span-2  md:block">
                    <Sidebar />
                </div>
                <div className="col-span-10 md:col-span-8 ">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
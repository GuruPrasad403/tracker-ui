import { TbLayoutDashboardFilled } from "react-icons/tb"
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import image from '../assets/image.png'
import { GiPayMoney } from "react-icons/gi";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const MenuItmesList = [
    {
        title : "Dashboard",
        icon : <TbLayoutDashboardFilled />,
        route:"dashboard"
    },
    {
        title : "Account",
        icon : <BiSolidUserAccount   />,
        route:"account"
    },
    {
        title : "Add Expenses",
        icon : <MdOutlineLibraryAdd />,
        route:"add-expenses"
    },
    {
        title : "Expenses",
        icon : <GiPayMoney />,
        route:"expenses"
    },    
]

export default function Sidebar() {
    const navigate = useNavigate()
    return (
        <>
            <div className="hidden lg:grid grid-cols-1 grid-rows-12 px-2 bg-gray-300 w-full h-screen  shadow-xl">
                <div className="row-span-2 flex justify-start gap-10  px-5 items-center h-full">
                    <div>
                        <img src={image} className='lg:w-20 lg:h-20 md:w-10 md:h-10' alt="User Icon" srcset="" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-4xl">
                            Tracker
                        </h1>
                    </div>
                </div>
                <div className="row-span-9 flex  flex-col flex-start gap-10 items-center">
                        {
                            MenuItmesList.map((ele,i)=> <MenuItems title={ele.title} icon = {ele.icon} navigate={navigate} route={ele.route}/>)
                        }
                </div>
                <div>
                    <div className=" text-black rounded-md py-2" onClick={()=>{
                        localStorage.clear()
                        navigate('/login')
                    }}>
                        {
                         <MenuItems title={"Logout"} icon={<CgLogOut />} />  
                        }
                    </div>
                </div>
            </div>


            {/* {bottom Nav Bar} */}


            
            <div className="grid grid-cols-4 grid-rows-1 lg:hidden fixed bg-gray-300 bottom-0 w-full ">
            {MenuItmesList.map((ele, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-3 cursor-pointer"
            onClick={()=>{
                navigate(`${ele.route}`)
            }}
          >
            <div className="text-2xl">{ele.icon}</div>
            <div className="text-sm">{ele.title}</div>
          </div>
        ))}
            </div>
        </>
    )
}


const MenuItems = ({title,icon,navigate,route}) => {
    return (
        <>
            <div className="hover:bg-violet-400 hover:text-white hover:rounded-xl py-2 flex justify-start gap-3 lg:gap-12 items-center  px-10 w-full cursor-pointer" onClick={()=>{
                navigate(`/${route}`)
            }}>

            <div className="lg:text-4xl md:text-xl">
                {icon}
            </div>
            <div>
                <h1 className="lg:text-2xl md:text-md capitalize">
                    {title}
                </h1>
            </div>
            </div>
       
        </>
    )
}

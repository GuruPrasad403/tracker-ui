import image from '../assets/image.png'
import { CiCalendarDate } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { TfiVideoClapper } from "react-icons/tfi";
import useFetch from '../hook/useFetch';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import Noexpense from '../assets/NoExpense.png'
const metting = [
    {
        time: "11:30 AM",
        live: true,
        title: "UX Webinar"
    },
    {
        time: "11:30 AM",
        live: true,
        title: "My first Webinar"
    },
    {
        time: "11:30 AM",
        live: true,
        title: "Important Webinar"
    },
    {
        time: "11:30 AM",
        live: true,
        title: "Webinar 1"
    }
]
export default function Mainsection() {
    const [date, setDate] = useState();
    const token = localStorage.getItem("tracker-token");
    const { userInfo, loading } = useFetch("https://tracker-gamma-nine.vercel.app/api/user/info", token);
    const userBalance = useFetch("https://tracker-gamma-nine.vercel.app/api/user/total", token);

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        setDate(date.toLocaleDateString('en-US', options));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-rows-12 grid-rows-6">
            {/* Background Section */}
            <div className="row-span-1 md:row-span-2 hidden md:flex bg-background-image bg-no-repeat bg-cover">
                {/* Background */}
            </div>

            {/* Main Content */}
            <div className="md:row-span-11 row-span-5 mt-5 md:mt-20 grid md:grid-cols-12 grid-cols-1 grid-rows-auto md:grid-rows-1 gap-4 px-4 md:px-0">
                {/* Profile Section */}
                <div className="relative row-span-1 col-span-1 w-full md:w-auto h-full md:col-span-3 px-4 md:px-14">
                    <Profile email={userInfo?.email} name={userInfo?.name} date={userInfo?.joined} loading={loading} />
                </div>

                {/* Date and Greetings Section */}
                <div className="md:px-5 md:col-span-5 col-span-1 row-span-1 flex flex-col justify-around items-start w-full md:w-96">
                    <div className="py-2 ">
                        <h1 className="text-lg md:text-xl font-semibold">{date}</h1>
                    </div>
                    <div className="my-auto">
                        <h1 className="text-2xl md:text-3xl font-semibold text-[#3e8be4]">
                            {<Greetings />} {userInfo?.name || null} 
                        </h1>
                    </div>
                    <div className="my-5">
                        <div className="flex flex-col bg-white w-full md:w-[600px] h-auto px-5 py-4 justify-around items-start rounded-2xl shadow-2xl">
                            <div className="flex flex-col md:flex-row my-3 p-1 rounded-lg justify-between bg-[#edf5fc] w-full items-center">
                                <h1 className="text-lg font-semibold">{date}</h1>
                                <h1 className="text-lg font-semibold">Expenditure</h1>
                            </div>
                            <div className="flex flex-col justify-around items-start w-full px-5 h-96 overflow-auto">
                                {/* Meeting Schedule */}
                                {loading ? metting.map((ele, index) => (
                                    <Shedule time={ele.time} title={ele.title} live={ele.live} key={index} />
                                )):<div> 
                                    <img src={Noexpense} alt="No Expense Image" srcSet="" />

                                    <h1 className='text-center text-xl font-semibold'>
                                        No Expense Today
                                    </h1>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Balance Section */}
                <div className="col-span-1 md:col-span-4 flex flex-col justify-center items-center w-full h-full gap-0">
                    <h1 className="text-black w-full text-center rounded-t-xl py-3 text-2xl md:text-3xl bg-white">
                        Total Balance: ₹ {userBalance?.loading ? <Loading /> : userBalance.userInfo?.totalAmount || null}
                    </h1>
                    <div className="grid  grid-cols-2 w-full bg-white shadow-2xl gap-5 px-4 py-5 rounded-b-xl h-56">
                        {userInfo?.BankInfo?.bankNames?.map((ele, i) => (
                            <Items loading={loading} title={ele?.name} amount={ele?.amount} key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Profile Component */
const Profile = ({ email, name, date, loading }) => {
    return (
        <div className="shadow-2xl bg-white w-full md:w-72 flex rounded-2xl flex-col py-5 justify-evenly items-center h-auto md:h-96">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="w-24 md:w-40 h-24 md:h-40">
                        <img src={image} className="rounded-xl" alt="Profile Icon" />
                    </div>
                    <h1 className="text-lg md:text-xl font-semibold">{name || "User"}</h1>
                </>
            )}
            <div className="flex justify-around items-center flex-col text-gray-500">
                <h2>{email || "Example@gmail.com"}</h2>
                <h2>{"Joined: " + date?.slice(0, 10)}</h2>
            </div>
        </div>
    );
};

/* Schedule Component */
const Shedule = ({
    time, live, title
}) => {
    return (
        <div className='flex flex-row gap-5 justify-around items-center w-full  border-b-2 pb-3 '>
            <div className=' border-r-2 pr-4 border-[#3fe0cf]'>
                <div>
                    <h1 className='text-lg font-semibold'>{time}</h1>
                </div>
                <div>
                    <h1 className='text-md text-gray-500'>{time}</h1>
                </div>
            </div>
            <div className='flex-1'>
                <div className='w-full'>
                    <h1 className='flex flex-row items-center gap-2'>
                        <span>{live ? "live" : "Upcoming"}</span> <FaVideo className={live ? "text-red-500" : "text-blue-400"} />
                    </h1>
                </div>
                <div>
                    <h1 className='text-lg font-semibold'>{title}</h1>
                </div>
            </div>
        </div>
    )
}



/* Items Component */
const Items = ({ title, amount }) => {
    return (
        <div className="flex justify-center flex-col items-center w-full">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl text-lg md:text-xl bg-[#40dfcf] flex justify-center items-center text-white">
                {"₹" + amount}
            </div>
            <h1 className="text-sm md:text-lg font-semibold">{title}</h1>
        </div>
    );
};
const Greetings = () => {
    let myDate = new Date();
    let hours = myDate.getHours();
    let greet;

    if (hours < 12)
        greet = "Morning";
    else if (hours >= 12 && hours <= 17)
        greet = "Afternoon";
    else if (hours >= 17 && hours <= 24)
        greet = "Evening";

    return <span>Good {greet},</span>
}


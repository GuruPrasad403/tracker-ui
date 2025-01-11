import image from '../assets/image.png';
import { CiCalendarDate } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { TfiVideoClapper } from "react-icons/tfi";
import useFetch from '../hook/useFetch';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import Noexpense from '../assets/NoExpense.png';

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
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 px-4 md:px-6 lg:px-10 lg:mt-20">
            {/* Profile Section */}
            <div className="flex flex-col items-center w-full mb-6 lg:col-span-3">
                <Profile email={userInfo?.email} name={userInfo?.name} date={userInfo?.joined} loading={loading} />
            </div>

            {/* Greetings and Expenditure Section */}
            <div className="flex flex-col gap-6 w-full mb-6 lg:col-span-5">
                {/* Greeting Section */}
                <div className="py-2 text-center lg:text-left"></div>
                <div className="py-2 text-center lg:text-left">
                    <h1 className="text-lg font-semibold">{date}</h1>
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#3e8be4] mt-2">
                        {<Greetings />} {userInfo?.name || null}
                    </h1>
                </div>

                {/* Expenditure Section */}
                <div className="bg-white rounded-2xl shadow-xl p-5">
                    <div className="flex flex-col bg-[#edf5fc] p-4 rounded-lg items-center justify-between">
                        <h1 className="text-lg font-semibold">{date}</h1>
                        <h1 className="text-lg font-semibold">Expenditure</h1>
                    </div>

                    <div className="mt-5 h-96 overflow-auto">
                        {loading ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <Loading />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <img src={Noexpense} alt="No Expense" />
                                <h1 className="text-center text-xl font-semibold mt-3">No Expense Today</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Total Balance Section */}
            <div className="w-full md:mb-6 lg:col-span-4">
                <div className="bg-white shadow-xl rounded-t-xl text-center p-3">
                    <h1 className="text-2xl font-semibold">
                        Total Balance: ₹{" "}
                        {userBalance?.loading ? <Loading /> : userBalance.userInfo?.totalAmount || null}
                    </h1>
                </div>
                <div className="grid grid-cols-2 bg-white shadow-xl rounded-b-xl gap-4 p-5">
                    {userInfo?.BankInfo?.bankNames?.map((ele, i) => (
                        <Items loading={loading} title={ele?.name} amount={ele?.amount} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}


/* Profile Component */
const Profile = ({ email, name, date, loading }) => {
    return (
        <div className="shadow-lg bg-white rounded-2xl p-5 flex flex-col items-center">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <img src={image} className="rounded-xl w-20 md:w-28 h-20 md:h-28 mb-4" alt="Profile Icon" />
                    <h1 className="text-lg md:text-xl font-semibold">{name || "User"}</h1>
                    <p className="text-gray-500">{email || "example@gmail.com"}</p>
                    <p className="text-gray-500">Joined: {date?.slice(0, 10) || "N/A"}</p>
                </>
            )}
        </div>
    );
};

/* Items Component */
const Items = ({ title, amount }) => (
    <div className="flex flex-col items-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#40dfcf] rounded-full flex items-center justify-center text-white text-lg md:text-xl">
            ₹{amount}
        </div>
        <h1 className="text-sm md:text-lg font-semibold mt-2">{title}</h1>
    </div>
);

/* Greetings Component */
export const Greetings = () => {
    const hours = new Date().getHours();
    const greet = hours < 12 ? "Morning" : hours <= 17 ? "Afternoon" : "Evening";
    return <span>Good {greet},</span>;
};

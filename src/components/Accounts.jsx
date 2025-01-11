import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/UserLogin"
import { Greetings } from "./Dashborad"
import useFetch from "../hook/useFetch";
import Loading from "./Loading";
import { FaRupeeSign } from "react-icons/fa";
export default function Account() {
    const [date, setDate] = useState();
    const token = localStorage.getItem("tracker-token")
    const userBalance = useFetch("https://tracker-gamma-nine.vercel.app/api/user/total", token);
    const userExpenditure = useFetch("http://localhost:3000/api/user/expenses-summary?period=month", token);
    console.log(userExpenditure)
    const navigate = useNavigate()
    const context = useContext(userContext)
    const name = localStorage.getItem("tracker-name")


    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        setDate(date.toLocaleDateString('en-US', options));
    }, []);

    return (
        <div className="grid grid-cols-1 grid-rows-6 h-full w-full">
            <div className="row-span-1 flex flex-row  justify-between items-center h-full w-full mt-5">
                <div className="py-2 text-center lg:text-left md:px-10">
                    <h1 className="text-lg font-semibold">{date}</h1>
                    <h1 className="text-xl md:text-3xl font-semibold text-[#3e8be4] ">
                        {<Greetings />} {name || null}
                    </h1>
                </div>
                <div className="flex items-center md:items-center md:justify-center w-26 md:w-96 h-full">
                    <button className="px-5 md:px-10 py-2 bg-violet-500 hover:bg-red-500 hover:transition-transform rounded-md text-white font-semibold outline-none "
                        onClick={() => {
                            localStorage.clear()
                            navigate("/login")
                        }}
                    >
                        Log out
                    </button>
                </div>
            </div>
            <div className="row-span-5 mt-10">
                <div className="grid gap-10 grid-cols-2 px-10 grid-rows-1 place-content-center w-full h-40 ">

                    <div className=" p-5  md:w-96  shadow-2xl rounded-2xl bg-green-300">
                        <div>
                            <h1 className="text-3xl font-semibold">Balance</h1>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="flex gap-2 items-center py-5 w-40">
                                <div className="text-2xl ">
                                    <FaRupeeSign />
                                </div>
                                <h1 className="text-3xl md:text-5xl font-semibold">
                                    {userBalance?.loading ? <Loading /> : userBalance?.userInfo?.totalAmount || 0}

                                </h1>
                                <div></div>
                            </div>
                            <div>

                                <div className=" flex flex-row gap-1 justify-around items-baseline">
                                    <div className=" h-4 w-2 opacity-50 rounded-full bg-green-500 "></div>
                                    <div className=" h-8 w-2 opacity-50 rounded-full bg-green-500 "></div>
                                    <div className=" h-12 w-2 opacity-80 rounded-full bg-green-500 "></div>
                                    <div className=" h-6 w-2 opacity-50 rounded-full bg-green-500 "></div>
                                    <div className=" h-6 w-2 opacity-50 rounded-full bg-green-500 "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" p-5  md:w-96  shadow-2xl rounded-2xl bg-red-300 ">
                        <div>
                            <h1 className="text-3xl font-semibold">Expendeture</h1>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="flex gap-2 items-center py-5 w-40">
                                <div className="text-2xl ">
                                    <FaRupeeSign />
                                </div>
                                <h1 className="text-3xl md:text-5xl font-semibold">
                                    {userBalance?.loading ? <Loading /> : userBalance?.userInfo?.totalAmount || 0}

                                </h1>
                                <div></div>
                            </div>
                            <div>

                                <div className=" flex flex-row gap-1 justify-around items-baseline">
                                    <div className=" h-12 w-2 opacity-50 rounded-full bg-red-500 "></div>
                                    <div className=" h-10 w-2 opacity-50 rounded-full bg-red-500 "></div>
                                    <div className=" h-20 w-2 opacity-80 rounded-full bg-red-500 "></div>
                                    <div className=" h-11 w-2 opacity-50 rounded-full bg-red-500 "></div>
                                    <div className=" h-6 w-2 opacity-50 rounded-full bg-red-500 "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
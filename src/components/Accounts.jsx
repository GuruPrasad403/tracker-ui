import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserLogin";
import { Greetings } from "./Dashborad";
import useFetch from "../hook/useFetch";
import Loading from "./Loading";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import imgage from '../assets/image.png';
import { toast, ToastContainer } from "react-toastify";
import { use } from "react";
export default function Account() {
    const bankRef = useRef();
    const [date, setDate] = useState();
    const token = localStorage.getItem("tracker-token");
    const userBalance = useFetch("https://tracker-gamma-nine.vercel.app/api/user/total", token);
    console.log("User Balance:", userBalance);
    const navigate = useNavigate();
    const context = useContext(userContext);
    const name = localStorage.getItem("tracker-name");
    const email = localStorage.getItem("tracker-email");
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);
    const handelAmountChange = (e) => {
        // check whether the input is a number or not
        if (isNaN(e.target.value)) {
            toast.error("Please enter a valid number");
            setAmount("");
            rerturn;
        }
        if (e.target.value < 0) {
            toast.error("Amount cannot be negative");
            setAmount("");
            return;
        }
        if (e.target.value > 100000) {
            toast.error("Amount cannot be greater than 100000");
            setAmount(e.target.value.slice(0, 6));
            return;
        }
        setAmount(e.target.value);
    }
    const handelToDeleteAllExpenses = async () => {
        try {
            const response = await axios.delete("https://tracker-gamma-nine.vercel.app/api/user/delete-expenses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            if(data?.success ===0){
                toast.error(data?.msg || "Error deleting all expenses");
            }
            if(data?.success ===1){
                toast.success(data?.msg || "All expenses deleted successfully");
            }

        } catch (error) {
            console.error("Error deleting all expenses:", error.response?.data.msg || error.message);
            toast.error(error.response?.data.msg || "Error deleting all expenses");
        }
    }
    const handelToResetBalance = async () => {
        try {
            const response = await axios.delete("https://tracker-gamma-nine.vercel.app/api/user/reset-balance", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            if(data?.success ===0){
                toast.error(data?.msg || "Error resetting balance");
            }
            if(data?.success ===1){
                toast.success(data?.msg || "Balance reset successfully");
            }
        } catch (error) {
            console.error("Error resetting balance:", error.response?.data.msg || error.message);
            toast.error(error.response?.data.msg || "Error resetting balance");
        }
    }
    const getExpensesSummary = async () => {
        try {
            const startDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[0] + " 00:00:00";
            const endDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[0] + " 23:59:59";

            const response = await axios.get("https://tracker-gamma-nine.vercel.app/api/user/expenses-summary", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    startDate,
                    endDate,
                },
            });

            console.log("Expenses Summary:", response.data);
        } catch (error) {
            console.error("Error fetching expenses summary:", error.response?.data.msg || error.message);
        }
    };

    useEffect(() => {
        getExpensesSummary();
    }, []);

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        setDate(date.toLocaleDateString('en-US', options));
    }, []);

    const handelSubmitAddAmount = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log("Amount:", amount);
        console.log("Bank:", bankRef.current.value);

        try {
            const formatedAmount = parseFloat(amount);
            const response = await axios.post("https://tracker-gamma-nine.vercel.app/api/user/add-bank", {
                bankNames: {
                    name: bankRef.current.value.charAt(0).toUpperCase() + bankRef.current.value.slice(1),
                    amount: formatedAmount,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Add Amount Response:", response.data);
            toast.success("Amount added successfully");
            setAmount("")
            setLoading(false);
        } catch (error) {
            console.error("Error adding amount:", error.response?.data?.m || error.message);
            toast.error("Error adding amount");
            setLoading(false);
        }
        setLoading(false);

    }
    useEffect(() => {
        const getExpenses = getExpensesSummary();
        console.log("Expenses Summary", getExpenses);
    }, []);
    return (
        <div className="grid grid-cols-1 grid-rows-6 h-full w-full p-5 pt-28 md:pt-10  overflow-hidden">
            <div className="row-span-5">
                <div className="grid gap-10 grid-cols-1 md:grid-cols-2 px-5 md:px-10 place-content-center w-full h-40">
                    <div className="p-5 shadow-2xl rounded-2xl bg-green-300">
                        <div>
                            <h1 className="md:text-3xl text-md font-semibold">Balance</h1>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="flex gap-2 items-center py-5 w-40">
                                <div className="text-2xl">
                                    <FaRupeeSign />
                                </div>
                                <h1 className="text-3xl md:text-5xl font-semibold">
                                    {userBalance?.loading ? <Loading /> : userBalance?.userInfo?.totalAmount || 0}
                                </h1>
                            </div>
                            <div className="flex flex-row gap-1 justify-around items-baseline">
                                <div className="h-4 w-2 opacity-50 rounded-full bg-green-500"></div>
                                <div className="h-8 w-2 opacity-50 rounded-full bg-green-500"></div>
                                <div className="h-12 w-2 opacity-80 rounded-full bg-green-500"></div>
                                <div className="h-6 w-2 opacity-50 rounded-full bg-green-500"></div>
                                <div className="h-6 w-2 opacity-50 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 shadow-2xl rounded-2xl bg-red-300">
                        <div>
                            <h1 className="md:text-3xl text-md font-semibold">Expenditure</h1>
                        </div>
                        <div className="flex flex-row justify-around items-center">
                            <div className="flex gap-2 items-center py-5 w-40">
                                <div className="text-2xl">
                                    <FaRupeeSign />
                                </div>
                                <h1 className="text-3xl md:text-5xl font-semibold">
                                    {userBalance?.loading ? <Loading /> : userBalance?.userInfo?.totalExpenditure || 0}
                                </h1>
                            </div>
                            <div className="flex flex-row gap-1 justify-around items-baseline">
                                <div className="h-12 w-2 opacity-50 rounded-full bg-red-500"></div>
                                <div className="h-10 w-2 opacity-50 rounded-full bg-red-500"></div>
                                <div className="h-20 w-2 opacity-80 rounded-full bg-red-500"></div>
                                <div className="h-11 w-2 opacity-50 rounded-full bg-red-500"></div>
                                <div className="h-6 w-2 opacity-50 rounded-full bg-red-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-5 mt-4 w-full h-full rounded-2xl">
                    <div className="shadow-xl p-5 md:p-10 bg-white rounded-2xl w-full md:w-auto">
                        <div className="flex flex-col md:flex-row items-center gap-5">
                            <img src={imgage} className="w-24 h-24" alt="" />
                            <div className="flex flex-col gap-2 text-center md:text-left">
                                <h1 className="text-xl">Name: {name}</h1>
                                <h1 className="text-xl">Email: {email}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-5">
                            <div className="flex flex-col md:flex-row justify-start items-center w-full gap-5">
                                <div className="flex flex-row gap-2">
                                    <h1 className="text-xl">Password:</h1>
                                    <h1 className="text-xl">********</h1>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <button className="px-2 py-1 bg-violet-500 hover:bg-violet-800 transition-transform rounded-md text-white  outline-none">
                                        Update User
                                    </button>
                                    <button className="px-2 py-1 border-2 text-violet-800 hover:bg-violet-800 transition-transform rounded-md hover:text-white font-semibold outline-none"
                                    onClick={handelToDeleteAllExpenses}>
                                    
                                        Reset All Expenses
                                    </button>
                                    <button className="px-2 py-1 border-2 text-violet-800 hover:bg-violet-800 transition-transform rounded-md hover:text-white font-semibold outline-none"
                                    onClick={handelToResetBalance}>
                                    
                                        Reset Balance
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center opacity-55">
                                <h1 className="text-[10px] md:text-sm font-semibold text-red-500">Please Rest All your expense and balance on 1st of Every month</h1>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 mt-5">
                            <div className="flex justify-center items-center">
                                <h1 className="text-2xl font-semibold p-5">Add Amount</h1>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col md:flex-row gap-10">
                                        <label className="text-xl mr-2" htmlFor="amount">Amount</label>
                                        <input type="text" value={amount} autoComplete="off" onChange={handelAmountChange} className="w-full md:w-96 outline-none border p-2 rounded-md border-gray-400" name="amount" id="amount" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-5">
                                        <label htmlFor="bank" className="text-xl">Select Bank</label>
                                        <select ref={bankRef} name="bank" id="bank" className="w-full md:w-96 outline-none border p-2 rounded-md border-gray-400">
                                            <option value="bank">Bank</option>
                                            <option value="wallet">Wallet</option>
                                            <option value="savings">Savings</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center my-5 gap-5">
                                    <button onClick={handelSubmitAddAmount} className="w-full md:w-auto px-20 py-1 bg-violet-500 hover:bg-violet-800 transition-transform rounded-md text-white font-semibold outline-none">
                                        {loading ? <Loading /> : "Add Amount"}
                                    </button>
                                    <button onClick={() => {
                                        setAmount("");
                                        bankRef.current.value = "";
                                    }} className="w-full md:w-auto px-20 py-1 bg-red-500 hover:bg-red-800 transition-transform rounded-md text-white font-semibold outline-none" disabled={loading}>
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

//this function should only get the today 0:00:00 and 23:59:59 total expenses tarnsaction

const getExpensesSummary = async () => {
    const startDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[0] + " 00:00:00";
    const endDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(",")[0] + " 23:59:59";
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    try {
        const response = await axios.get("https://tracker-gamma-nine.vercel.app//user/expenses", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                startDate,
                endDate,
            },
        });

        console.log("Expenses Summary:", response.data);
    } catch (error) {
        console.error("Error fetching expenses summary:", error.response?.data || error.message);
    }
}

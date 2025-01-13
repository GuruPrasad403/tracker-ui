import { toast, ToastContainer } from "react-toastify";
import useFetch from "../hook/useFetch";
import { FaRupeeSign } from "react-icons/fa6";
import Loading from "./Loading";
import { useState } from "react";
import axios from "axios";
const options = ["Housing","Transportation","Food","Medical","Entertainment","Education","Insurance","Taxes","PersonalCare","Others"]


export default function Expenses() {

    const token = localStorage.getItem("tracker-token");
    const userBalance = useFetch("https://tracker-gamma-nine.vercel.app/api/user/total", token);
    const [userInput, setUserInput] = useState({
        title:'',
        amount: 0,
        description: "",
        category: "",
        bank: "",
    })

    const handelAmountChange = (e) => {
        //check for the given amount is valid or not, there should not be any character or negative number
        const amount = e.target.value;
        if (isNaN(amount)) {
            if(amount < 0){
                toast.error("Amount should be a positive number");
                setUserInput({ ...userInput, amount: "" });
                return;
            }
            
            toast.error("Amount should be a number");
            setUserInput({ ...userInput, amount: "" });     
            return;
        }
        setUserInput({ ...userInput, amount: -Math.abs(Number(e.target.value)) });
    }
    const handelDiscriptionChange = (e) => {
        // check for the given discription is valid or not, there should not be any special character and it should a max length of 50 char
        const description = e.target.value;
        if (description.length > 50) {
            toast.error("Description should be less than 50 characters");
            setUserInput({ ...userInput, description: "" });
            return;
        }
        if(description === "")
            toast.error("Description should not be empty");
        const specialCharPattern = /[^a-zA-Z0-9 ]/;
        if (specialCharPattern.test(description)) {
            toast.error("Description should not contain any special characters");
            setUserInput({ ...userInput, description: "" });
            return;
        }
        setUserInput({ ...userInput, description: e.target.value });
    }
    const handelTitleChange = (e) => {
        // check for the given title is valid or not, there should not be any special character and it should a max length of 50 char
        const title = e.target.value;
        if (title.length > 50) {
            toast.error("Title should be less than 50 characters");
            setUserInput({ ...userInput, title: "" });
            return;
        }
        if(title === "")
            toast.error("Title should not be empty");
        const specialCharPattern = /[^a-zA-Z0-9 ]/;
        if (specialCharPattern.test(title)) {
            toast.error("Title should not contain any special characters");
            setUserInput({ ...userInput, title: "" });
            return;
        }
        setUserInput({ ...userInput, title: e.target.value });

    }

    const handelSubmit = async() => {
        // check for the given input is valid or not, if not then show the error message
        if(userInput.amount === "" || userInput.description === "" || userInput.category === ""){
            toast.error("All fields are required");
            return;
        }
        // send the data to the server
        try {
            const response = await axios.post('https://tracker-gamma-nine.vercel.app/api/user/add-expense', { ...userInput, category: userInput.category,bank: userInput.bank },
                {headers: {
                    Authorization: `Bearer ${token}`,
                }}
            );
            if (response.data.success === 1) {
                toast.success(response?.data?.msg);
            } else {
                toast.error(response?.data?.msg || 'Failed to add the expense.');
            }
            
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.msg || 'Failed to add the expense.');
            
        }
    }

    return (
        <div className="grid grid-cols-1 grid-rows-6 h-full w-full p-5 pt-28 md:pt-10  overflow-hidden">
            <div className="row-span-5">
                <div className="grid gap-10 grid-cols-1 md:grid-cols-2 px-5 md:px-10 place-content-center w-full h-40">
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
                {/* this is the section where we will be having two section in the 1st section the total garph will be displayed on x-axis and on y-axis amount relatd to that particular category 
                and in the left side user can his all expenses, in 1st input box it should take amount and int the secont input it should take the discriptiona and in the thired option it should take the categor of the expense 
                and there should be two button in that one should be to submit the form and in the other oen it should be claer the form  */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 grid-rows-1 md:grid-rows-2 px-5 md:px-10 place-content-center w-full h-96 mt-20">
                    <div>this is one </div>
                    <div>
                    <div className="shadow-2xl rounded-2xl  p-5">
                        <div>
                            <h1 className="md:text-3xl text-md font-semibold">Add Expense</h1>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    value={userInput?.title}
                                    onChange={handelTitleChange}
                                    className="p-2 rounded-md border-2 border-gray-300"
                                    placeholder="Enter Title"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="text"
                                    value={userInput?.amount}
                                    onChange={handelAmountChange}
                                    className="p-2 rounded-md border-2 border-gray-300"
                                    placeholder="Enter Amount (Amount should be in Negative eg. -100)"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    value={userInput?.description}
                                    onChange={handelDiscriptionChange}
                                    className="p-2 rounded-md border-2 border-gray-300"
                                    placeholder="Enter Description"
                                />
                            </div>
                            <div className="flex flex-col">
                                <select
                                    className="p-2 rounded-md border-2 border-gray-300"
                                    name="category"
                                    id="category"
                                    onChange={(e) => setUserInput({ ...userInput, category: e.target.value })}
                                    value={userInput?.category}
                                >
                                {options.map((ele, i) => (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <select
                                    className="p-2 rounded-md border-2 border-gray-300"
                                    name="bank"
                                    id="bank"
                                    onChange={(e) => setUserInput({ ...userInput, bank: e.target.value })}
                                    value={userInput?.bank}
                                >
                                    <option>Bank</option>
                                    <option>Wallet</option>
                                    <option>Savings</option>
                                </select>
                            </div>
                            <div className="flex flex-row justify-between gap-10 w-full">
                                <button className=" bg-violet-500 text-white p-2 rounded-md w-96 outline-none" onClick={handelSubmit}>Submit</button>
                                <button className="hover:bg-red-500  hover:text-white p-2 rounded-md w-96 outline-none border-2 border-violet-500" onClick={()=>{
                                    setUserInput({
                                        title:'',
                                        amount: "",
                                        description: "",
                                        category: "",
                                    })
                                }}>Clear</button>
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
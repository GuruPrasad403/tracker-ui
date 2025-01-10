import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {    userContext } from "../context/UserLogin";
export function Signup() {
    const context = useContext(userContext)
    const {setUserId,setUser} = context
    const navigate = useNavigate()
    const [loader,setLoader] = useState(false)
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        name: "",
    });

    const [errors, setErrors] = useState({
        email: "Please enter a valid email address",
        name: "Name should not contain special characters or numbers",
        password:
            "Password must be 8-16 characters long and include at least one special character",
    });

    const validateInput = (name, value) => {
        if (name === "email") {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Please enter a valid email address";
            }
        } else if (name === "name") {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                return "Name should not contain special characters/numbers";
            }
        } else if (name === "password") {
            if (!/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(value)) {
                return "Password must be 8-16 characters & include one special character";
            }
        }
        return "";
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        const errorMessage = validateInput(name, value);

        setUserInput({ ...userInput, [name]: value });
        setErrors({ ...errors, [name]: errorMessage });
    };

    let isFormValid =
        !errors.email && !errors.name && !errors.password &&
        userInput.email &&
        userInput.name &&
        userInput.password;
        const handelSubmit = async (e) => {
            setLoader(!loader)
            e.preventDefault();
        
            if (!isFormValid) {
                setLoader(false)
                return toast.error("Invalid Inputs");
            }
        
            try {
                const response = await axios.post("https://tracker-gamma-nine.vercel.app/api/signup", {
                    name: userInput.name,
                    password: userInput.password,
                    email: userInput.email,
                });
        
                const data = response?.data;
        
                if (!data?.success) {
                    // Process server-side validation errors
                    if (data.errors && Array.isArray(data.errors)) {
                        data.errors.forEach((error) => {
                            const field = error.path[0]; // The field name causing the error
                            const message = error.message; // The error message
                            setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
                        });
                    }
                    setLoader(false)
                    return toast.error(data?.msg || "Something went wrong");
                }
        
                if(data.success){
                setUser(data?.user  )
                setUserId(data.user._id)
                toast.success(data.msg);
                setLoader(false)
                setTimeout(()=> navigate('/Otp'), 2000)
                console.log("Data added")
                

                }

            } catch (error) {
                console.error("Error during signup:", error?.response?.data || error.message);
                toast.error("Signup failed. Please try again.");
                setLoader(false)
            }
            

        };
        
    return (
        <>
                <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
                        <div className="bg-violet-700 flex justify-center items-center">
                            <h1 className="text-5xl md:text-6xl font-semibold text-white text-center underline bg-[#f000c47b] p-5 rounded-xl shadow-md">
                                Expense Tracker
                            </h1>
                        </div>
                    <div className="flex justify-center items-center">
                        <div className="bg-white flex flex-col shadow-2xl w-full max-w-md p-6 rounded-xl">
                            <h1 className="text-3xl md:text-4xl font-semibold underline mb-6 text-center">SignUp</h1>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col relative">
                                    <input
                                        className={`outline-none p-2 border-2 rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        onChange={handleChange}
                                        value={userInput.email}
                                        type="text"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Enter Your Email"
                                    />
                                    {errors.email && (
                                        <span className="text-sm text-red-500 mt-1">{errors.email}</span>
                                    )}
                                </div>
                                <div className="flex flex-col relative">
                                    <input
                                        className={`outline-none p-2 border-2 rounded-md ${errors.name ? "border-red-500" : "border-gray-300"
                                            }`}
                                        autoComplete="off"
                                        onChange={handleChange}
                                        value={userInput.name}
                                        type="text"
                                        name="name"
                                        placeholder="Enter Your Name"
                                    />
                                    {errors.name && (
                                        <span className="text-sm text-red-500 mt-1">{errors.name}</span>
                                    )}
                                </div>
                                <div className="flex flex-col relative">
                                    <input
                                        className={`outline-none p-2 border-2 rounded-md ${errors.password ? "border-red-500" : "border-gray-300"
                                            }`}
                                        onChange={handleChange}
                                        value={userInput.password}
                                        type="password"
                                        name="password"
                                        autoComplete="off"
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <span className="text-sm text-red-500 mt-1">{errors.password}</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handelSubmit}
                                className={`mt-6 w-full py-2 rounded-md font-semibold text-xl ${isFormValid ? "bg-violet-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                disabled={!isFormValid}
                            >
                                {
                                    loader?<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                                :   "Create Account"}
                                
                            </button>
                            <div className="flex justify-between items-center mt-4 text-sm">
                                <p className="text-blue-400 underline cursor-pointer" onClick={()=>{
                                    navigate('/login')
                                }}>Login</p>
                                <p className="text-gray-500">
                                    By signing up, you agree to the Terms & Conditions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
        </>
    );
}

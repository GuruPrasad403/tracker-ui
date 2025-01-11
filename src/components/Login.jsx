import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { userContext } from "../context/UserLogin";

export default function Login() {
    const context = useContext(userContext)
    const {setUser,user} = context
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateInput = (name, value) => {
        if (name === "email") {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Please enter a valid email address";
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
        Object.values(errors).every((err) => err === "") &&
        userInput.email &&
        userInput.password;
    const handleSendOtp = async () => {
            setLoader(true)
            try {
            const userId = localStorage.getItem("tracker-id")
              setDisabled(true); // Disable the button immediately
              const response = await axios.post('https://tracker-gamma-nine.vercel.app/api/sendotp', { userId , email:user?.email });
              
              if (response.data.success === 1) {
                toast.success(response?.data?.msg);
              } else {
                toast.error(response?.data?.msg || 'Failed to send OTP.');
              }
            } catch (error) {
              setDisabled(false); // Re-enable the button if an error occurs
              if (error.response?.data?.success === 0) {
                toast.error(error.response.data.msg);
                console.error(error.response.data);
              } else {
                toast.error('');
                console.error(error);
              }
            }
            setLoader(false)
          };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        if (!isFormValid) {
            setLoader(false);
            return toast.error("Invalid Inputs");
        }

        try {
            const response = await axios.get("https://tracker-gamma-nine.vercel.app/api/signin", {
                params: { email: userInput.email, password: userInput.password },
            });

            const data = response?.data;
            console.log(data)
            if (data?.success == 0) {
                toast.error(data?.msg)
                if (data.errors && Array.isArray(data.errors)) {
                    data.errors.forEach((error) => {
                        const field = error.path[0];
                        const message = error.message;
                        setErrors((prevErrors) => ({ ...prevErrors, [field]: message }));
                    });
                }
                setLoader(false);
                return toast.error(data?.msg || "Something went wrong");
            }
            if(data?.success===1){
                if(!data.user.isVerified){
                    setUser(data?.user)
                    localStorage.setItem("tracker-email", data?.email)
                    localStorage.setItem("tracker-id", data?._id)
                    handleSendOtp()
                    setLoader(false);
                    navigate("/otp")
                }
                else {
            localStorage.setItem("tracker-token", data?.token)
            localStorage.setItem("tracker-name", data?.user?.name)
            localStorage.setItem("tracker-email", data?.user?.email)
            setLoader(false);
            setUser(data?.user)
            toast.success(data?.msg);
            setTimeout(()=> navigate("/dashboard"), 2000)
        }
            }
        } catch (error) {
            if(error?.response?.data?.success==0){
                toast.error(error?.response?.data.msg)
            }
            console.error("Error during login:", error.response?.data?.success );
            setLoader(false);
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
                        <h1 className="text-3xl md:text-4xl font-semibold underline mb-6 text-center">
                            Login
                        </h1>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col relative">
                                <input
                                    className={`outline-none p-2 border-2 rounded-md ${
                                        errors.email ? "border-red-500" : "border-gray-300"
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
                                    className={`outline-none p-2 border-2 rounded-md ${
                                        errors.password ? "border-red-500" : "border-gray-300"
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
                            onClick={handleSubmit}
                            className={`mt-6 w-full py-2 rounded-md font-semibold text-xl ${
                                isFormValid
                                    ? "bg-violet-500 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!isFormValid || loader}
                        >
                            {loader ? (
                                <div
                                    className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                                    role="status"
                                    aria-label="loading"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                        <div className="flex justify-center items-center mt-4 text-sm">
                            <p
                                className="text-blue-400 text-xl underline cursor-pointer"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                SignUp
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

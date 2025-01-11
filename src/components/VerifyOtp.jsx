import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserLogin';

const VerifyOtp = () => {
  const context = useContext(userContext);
  const [loader,setLoader] = useState(false)
  const { userId, user } = context;
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => setDisabled(false), 30000 ); // 2 minutes
      return () => clearTimeout(timer);
    }
  }, [disabled]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const isLoggedin = localStorage.getItem('token');
    if (isLoggedin) return navigate('/dashboard');

    if (!otp) {
      toast.error('OTP is required.');
      return;
    }

    try {

      const response = await axios.post('https://tracker-gamma-nine.vercel.app/api/otp', { otp, userId:user?._id });

      if (response.data.success === 1) {
        setTimeout(()=>navigate('/login'), 3000)
        toast.success(response.data.msg);
      } else {
        toast.error('Invalid OTP, please try again.');
      }
    } catch (error) {
      if (error.response?.data?.success === 0) {
        toast.error(error.response.data.msg);
        console.error(error.response.data);
      } else {
        toast.error('An error occurred. Please try again later.');
        console.error(error);
      }
    }
  };

  const handleSendOtp = async () => {
    console.log(user)
    setLoader(true)
    try {
      setDisabled(true); // Disable the button immediately
      const response = await axios.post('https://tracker-gamma-nine.vercel.app/api/sendotp', { userId:user._id, email:user?.email });
      
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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              id="otp"
              type="text"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Verify OTP
          </button>
        </form>
        <div className="p-5 underline">
          <button
            disabled={disabled}
            onClick={handleSendOtp}
            className={`w-full py-2 rounded-md ${disabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {
              loader?<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
              <span class="sr-only">Loading...</span>
          </div>:"Resend OTP"
            }
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyOtp;

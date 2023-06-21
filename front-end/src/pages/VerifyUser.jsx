import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './VerifyUser.css';
import { useParams } from 'react-router-dom';

const Verifyemail = () => {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleResendOTP = () => {
    // Code to resend the OTP
  };

  const handleVerifyOTP = async (e) => {
    // Code to verify the entered OTP
    e.preventDefault()
    try {
      const response = await axios.post(`/verify-email/${userId}`, { otp });
      const { data: responseData } = response;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setOTP('');
        toast.success('Verification Success!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during verification. Please try again.');
    }
  };

  return (
    <div className="verify-container">
      <div className="email-icon">
        <MdEmail />
      </div>
      <div className="verify-box">
        <h1 className="verify-title">Verify Account</h1>
        <h3 className="verify-subtitle">Please verify your email address</h3>
        <br />
        <h6 className="verify-text">You're almost there! We sent an OTP to your email.</h6>
        <h5 className="verify-text">Enter the OTP to complete your signup:</h5>
        <br />
        <input
          type="text"
          className="otp-input"
          value={otp}
          onChange={handleOTPChange}
          placeholder="Enter OTP"
        />
        <br />
        <button className="verify-button" onClick={handleVerifyOTP}>Verify</button>
        <button className="verify-button" onClick={handleResendOTP}>Resend OTP</button>
      </div>
    </div>
  );
};

export default Verifyemail;

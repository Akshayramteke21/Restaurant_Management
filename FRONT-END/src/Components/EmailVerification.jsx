import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainService from '../Services/MainService'; // Adjust the path as necessary

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setMsg("Email not found. Please try registering again.");
      return;
    }
    try {
      const response = await MainService.verifyAccount(email, otp);

      if (response) {
        setMsg("Account verified successfully");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMsg("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error('Error verifying account:', error);
      if (error.response && error.response.status === 404) {
        setMsg(error.response.data);
      } else if (error.response && error.response.status === 400) {
        setMsg("Verification failed. Please check your OTP and try again.");
      } else {
        setMsg("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="bg-white p-4 rounded border shadow">
            <div className="mb-4">
              <div className="card-header">
                <h2>Email Verification</h2>
              </div>
            </div>
            {msg && <p className="alert alert-info">{msg}</p>}
            <form onSubmit={verifyOtp}>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">OTP:</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter the OTP sent to your email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainService from '../Services/MainService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmpassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await MainService.resetPassword(email, otp, password);

      if (response) {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="bg-white p-4 rounded border shadow">
            {message && <div className="alert alert-info">{message}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicOtp">
                <Form.Label className="form-label">Enter OTP:</Form.Label>
                <Form.Control 
                  type="number" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formNewPassword">
                <Form.Label className="form-label">Create new password:</Form.Label>
                <Form.Control 
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formConfirmPassword">
                <Form.Label className="form-label">Confirm Password:</Form.Label>
                <Form.Control 
                  type="password"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  required 
                />
              </Form.Group> 

              <input type="hidden" value={email} />

              <Button 
                variant="primary" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create new password"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

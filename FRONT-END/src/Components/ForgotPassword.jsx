import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainService from "../Services/MainService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await MainService.forgotPassword(email);

      if (response) {
        setMessage("OTP sent successfully. Check your email.");

        setTimeout(() => navigate("/resetpassword", { state: { email } }), 2000);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else if (error.request) {
        setMessage(
          "No response from server. Please check your connection and try again."
        );
      } else {
        setMessage("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2>Reset Password</h2>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll send a one-time password to this email.
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roll, setRoll] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/registerUser", {
        name,
        email,
        contact,
        password,
        roll: { id: roll },
        status: 1,
      });

      if (response.status === 200) {
        setMsg("Registration successful...");
        navigate("/login");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.log(error);
      setMsg("An error occurred during registration");
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card"></div>
          <div className="bg-white p-4 rounded border shadow">
            <div className="mb-4">
              <div className="card-header">
                <h2>Register</h2>
              </div>
            </div>
            {msg && <p>{msg}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roll" className="form-label">
                  Role:
                </label>
                <select
                  className="form-select"
                  id="roll"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="1">Staff</option>
                  <option value="2">Admin</option>
                </select>
              </div>
              <input type="hidden" id="status" value="1" />
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainService from "../Services/MainService";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const Register = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    otp: "",
    status: "",
    role: {
      id: "",
    },
    captcha: "",
  });
  const [roles, setRoles] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    MainService.getRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleText = (event) => {
    const { name, value } = event.target;
    if (name === "role") {
      setUser((prevState) => ({
        ...prevState,
        role: {
          ...prevState.role,
          id: value,
        },
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateContact = (contact) => {
    const re = /^[0-9]{10}$/;
    return re.test(contact);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    if (!user.FirstName || !user.LastName) {
      setMsg("First and Last Name are required.");
      setMsgType("error");
      return false;
    }
    if (!validateEmail(user.email)) {
      setMsg("Invalid email format.");
      setMsgType("error");
      return false;
    }
    if (!validateContact(user.contact)) {
      setMsg("Contact must be 10 digits.");
      setMsgType("error");
      return false;
    }
    if (!validatePassword(user.password)) {
      setMsg("Password must be at least 8 characters long.");
      setMsgType("error");
      return false;
    }
    if (user.password !== user.confirmPassword) {
      setMsg("Passwords do not match.");
      setMsgType("error");
      return false;
    }
    if (!validateCaptcha(user.captcha)) {
      setMsg("Captcha does not match.");
      setMsgType("error");
      return false;
    }
    return true;
  };

  const saveUser = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setValidated(true);
      return;
    }
    MainService.AddUser(user)
      .then((res) => {
        setMsg("User added successfully...");
        setMsgType("success");
        setTimeout(() => {
          navigate("/emailverification", { state: { email: user.email } });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMsg("Failed to add User. Please try again.");
        setMsgType("error");
      });
  };

  const doSubmit = () => {
    let user_captcha = document.getElementById("user_captcha_input").value;
    if (validateCaptcha(user_captcha) === true) {
      alert("Captcha Matched");
      loadCaptchaEnginge(6);
      document.getElementById("user_captcha_input").value = "";
    } else {
      alert("Captcha Does Not Match");
      document.getElementById("user_captcha_input").value = "";
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card"></div>
          <div className="bg-white p-2 rounded border shadow">
            <div className="mb-2">
              <div className="card-header">
                <h2 className=" text-center ">Register</h2>
              </div>
            </div>
            <form onSubmit={saveUser} noValidate>
              <div className="mb-2">
                <label htmlFor="firstname" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Enter first name"
                  name="FirstName"
                  value={user.FirstName}
                  onChange={handleText}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="middlename" className="form-label">
                  Middle Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="middlename"
                  placeholder="Enter Middle Name"
                  name="MiddleName"
                  value={user.MiddleName}
                  onChange={handleText}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="lastname" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Enter Last name"
                  name="LastName"
                  value={user.LastName}
                  onChange={handleText}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  value={user.email}
                  onChange={handleText}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="contact" className="form-label">
                  Contact:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  placeholder="Enter Contact"
                  name="contact"
                  value={user.contact}
                  onChange={handleText}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={user.password}
                  onChange={handleText}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleText}
                  required
                />
              </div>
              <div className=" mb-2 card-header"></div>
              <div className="mb-2">
                <label htmlFor="role" className="form-label">
                  Role:
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={user.role.id}
                  onChange={handleText}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="container">
                <div className="form-group">
                  <div className="col mt-3">
                    <LoadCanvasTemplate />
                  </div>
                  <div className="col mt-3">
                    <input
                      placeholder="Enter Captcha Value"
                      id="user_captcha_input"
                      name="captcha"
                      type="text"
                      value={user.captcha}
                      onChange={handleText}
                      required
                    />
                  </div>
                </div>
              </div>

              {msg && (
                <div
                  className={`alert ${
                    msgType === "success" ? "alert-success" : "alert-danger"
                  }`}
                >
                  {msg}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100 mt-2">
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

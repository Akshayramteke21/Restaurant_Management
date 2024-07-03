import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainService from '../Services/MainService';

const Register = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    otp: "",
    status: "",
    role: {
      id: ""
    }
  });
  const [roles, setRoles] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    MainService.getRoles()
      .then(response => {
        console.log("Role fetched:", response.data); // check in console data role all
        setRoles(response.data);
      })
      .catch(error => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  const handleText = (event) => {
    const { name, value } = event.target;
    if (name === "role") {
      setUser(prevState => ({
        ...prevState,
        role: {
          ...prevState.role,
          id: value
        }
      }));
    } else {
      setUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const saveUser = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || user.password !== user.confirmPassword) {
      event.stopPropagation();
      if (user.password !== user.confirmPassword) {
        setMsg("Passwords do not match.");
        setMsgType("error");
      }
    } else {
      MainService.AddUser(user)
        .then((res) => {
          setMsg("User added successfully...");
          setMsgType("success");
          console.log("User added:", res.data);
          setTimeout(() => {
            navigate('/emailverification', { state: { email: user.email } }); // Pass email in state
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
          setMsg("Failed to add User. Please try again.");
          setMsgType("error");
        });
    }
    setValidated(true);
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
            <form onSubmit={saveUser} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  name="name"
                  value={user.name}
                  onChange={handleText}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
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
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact:</label>
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
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
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
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
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role:</label>
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
              {msg && (
                <div className={`alert ${msgType === "success" ? "alert-success" : "alert-danger"}`}>
                  {msg}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

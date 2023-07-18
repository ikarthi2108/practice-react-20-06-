import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authentication } from "./Auth";

const SignIn = ({ onUserLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch user details from the server
    fetch("http://localhost:4000/Register")
      .then((response) => response.json())
      .then((data) => {
        const foundUser = data.find(
          (user) => user.email === username && user.password === password
        );

        if (foundUser) {
          // Login successful
          Authentication.userLogin(() => {
            onUserLogin(foundUser); // Pass the signed-in user to the parent component
            navigate("/Viewtask"); // Navigate to the user's tasks page
          });
          setError(null);
        } else {
          // Login failed
          setError("Invalid Credentials");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error occurred while signing in");
      });
  };

  return (
    <div className="container border-1 border" id="cont">
      <h5 className="ms-3 p-5" style={{ color: "red" }}>
        Note! Only users can use this Page
      </h5>
      <div className="row">
        <div className="col-12 py-5 shadow mb-5 my-custom-shadow">
          <h2 className="p-3">Login with TITAN</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <input
                className="w-100"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group ms-1 pt-3">
              <input
                className="w-100"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-danger mt-3 mb-2">{error}</div>
            )}

            <div className="d-flex justify-content-center mt-4">
              <button className="bg-black text-white btn-size" type="submit">
                Login
              </button>
            </div>

            <div className="d-flex justify-content-center mt-2">
              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/Register" className="text-black w-25">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

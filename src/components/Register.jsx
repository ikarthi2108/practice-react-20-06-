import React, { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
 
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    const validationErrors = {};

    if (firstName.trim() === "") {
      validationErrors.firstName = "Required Field";
    } else if (!isValidName(firstName)) {
      validationErrors.firstName = "First name should only contain alphabets";
    }

    if (lastName.trim() === "") {
      validationErrors.lastName = "Required Field";
    } else if (!isValidName(lastName)) {
      validationErrors.lastName = "Last name should only contain alphabets";
    }

    if (email.trim() === "") {
      validationErrors.email = "Required Field";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Enter a valid email";
    }

    if (password === "") {
      validationErrors.password = "Required Field";
    } else if (!isValidPassword(password)) {
      validationErrors.password =
        "Must contain minimum 1 Lowercase,Uppercase and digit";
    }

    if (confirmPassword === "") {
      validationErrors.confirmPassword = "Required Field";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }


   
     
    
    if (Object.keys(validationErrors).length === 0) {
      const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        password,
     
      };
      

   
      fetch("http://localhost:4000/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          // Handle the response
          if (response.ok) {
            // Registration successful
            // Reset the form
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
         

            navigate("/signin");

            console.log("Registration Successful");
          }
        })
    }
    else {
      setErrors(validationErrors);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z]{1,30}$/;
    return nameRegex.test(name);
  };



  return (
    <div className="container2 border-1 border" id="cont">
      <div className="row">
        <div className="col-12 py-1 shadow  mt-5">
          <h3 className="ms-2 ">Sign Up with TITAN </h3>
          <form className="registration-form" onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                id="firstName"
                className={`form-control ${errors.firstName ? "is-invalid" : ""
                  }`}
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="lastName"
                className={`form-control ${errors.lastName ? "is-invalid" : ""
                  }`}
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                className={`form-control ${errors.password ? "is-invalid" : ""
                  }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                  }`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            {/* <div>
              <label className="ms-5">
                <input
                  type="radio"
                  value="ADMIN"
                  checked={userType === "ADMIN"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                ADMIN
              </label>
              <label className="ms-5">
                <input
                  type="radio"
                  value="USER"
                  checked={userType === "USER"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                USER
              </label>
            </div>
            {errors.userType && (
              <div className="invalid-feedback">{errors.userType}</div>
            )} */}

           
            <button className="bg-black text-white" type="submit">
              Register
            </button>
            
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-black w-25">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

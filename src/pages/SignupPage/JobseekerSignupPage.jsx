import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import backgroundImage from "./pomelopinkbg.png"; // Replace with your image path

function JobseekerSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, firstName, lastName };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .jssignup(requestBody)
      .then((response) => {
        // If the POST request is successful, redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <div className="signup-container">
        <div className="form-container">
          <h1> Sign up with POMELO and let us help you get your dream job</h1>
          <form onSubmit={handleSignupSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleFirstName}
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleLastName}
            />
            <button type="submit">Sign Up</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="image-container">
        <img src={backgroundImage} alt="Background" />
      </div>
    </div>
  );
}

export default JobseekerSignupPage;

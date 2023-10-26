import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import ConsSignupPage from "./ConsSignupPage";

function ConsultantSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [consultantBio, setConsultantBio] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleConsultantBio = (e) => setConsultantBio(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, firstName, lastName, consultantBio };

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
      .consignup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="ConsSignupPage">
      <div className="ConsImage-container">
        <img src="/pomelopinkbg.png"></img>
      </div>
      <div className="ConsSignup-wording">
        <div className="ConsSignupPage">
          <h1>
            Sign up as a POMELO Consultant. Help people get jobs and get paid
            for it.
          </h1>
        </div>

        <form onSubmit={handleSignupSubmit}>
          <div className="signup-container">
            <label></label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleFirstName}
              placeholder="First Name"
            />
          </div>
          <div className="signup-container">
            <label></label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleLastName}
              placeholder="Last Name"
            />
          </div>
          <div className="signup-container">
            <label></label>
            <input
              type="text"
              name="consultantBio"
              value={consultantBio}
              onChange={handleConsultantBio}
              placeholder="Tell us about yourself!"
            />
          </div>

          <div className="signup-container">
            <label></label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="email"
            />
          </div>

          <div className="signup-container">
            <label></label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="password"
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="text-right">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ConsultantSignup;

import "./ConsSignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function ConsSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [coverPicture, setcoverPicture] = useState("");
  const [cv, setcv] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlefirstName = (e) => setfirstName(e.target.value);
  const handlelastName = (e) => setlastName(e.target.value);
  const handleprofilePicture = (e) => setprofilePicture(e.target.value);
  const handlecoverPicture = (e) => setcoverPicture(e.target.value);
  const handlecv = (e) => setcv(e.taget.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      email,
      password,
      firstName,
      lastName,
      profilePicture,
      coverPicture,
      cv,
    };

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
      .signup(requestBody)
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
    <div className="ConsSignupPage">
      <div className="ConsImage-container">
        <img src="pomelopinkbg.png"></img>
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
              onChange={handlefirstName}
              placeholder="First Name"
            />
          </div>

          <div className="signup-container">
            <label></label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handlelastName}
              placeholder="Last Name"
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

          <div className="signup-container">
            <label></label>
            <input
              type="text"
              name="profilePicture"
              value={profilePicture}
              onChange={handleprofilePicture}
              placeholder="Profile Picture"
            />
          </div>
          <div className="signup-container">
            <label></label>
            <input
              type="text"
              name="coverPicture"
              value={coverPicture}
              onChange={handlecoverPicture}
              placeholder="Cover Picture"
            />
          </div>
          <div className="signup-container">
            <label></label>
            <input
              type="text"
              name="cv"
              value={cv}
              onChange={handlecv}
              placeholder="Your CV"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="text-right">
          <h2>
            Already have an account?
            <Link to={"/login"}> Login</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ConsSignupPage;

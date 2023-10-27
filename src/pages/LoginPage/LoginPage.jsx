import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("jobseeker");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, userType };

    authService
      .login(requestBody)
      .then((response) => {
        const { authToken, userType } = response.data;
        storeToken(authToken);
        authenticateUser();

        if (userType === "consultant") {
          navigate("/consult");
        } else if (userType === "jobseeker") {
          setLoginSuccess(true);
          setTimeout(() => {
            navigate("/jsprofile");
          }, 2000); // Navigate to the profile page after 2 seconds
        }
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const backgroundImageURL = "juicyPomelo.png";

  return (
    <div className="LoginPage">
      <div
        className="login-background-image"
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
      >
        <div className="login-container animate__animated animate__fadeInRight">
          <div className="welcome-text">
            <h1 className="welcome-heading">Welcome back to POMELO</h1>
          </div>
          <div className="login-box">
            {loginSuccess ? (
              // Render a success message or animation here
              <p className="success-message">
                Login Successful! Redirecting...
              </p>
            ) : (
              <>
                <form className="login-form" onSubmit={handleLoginSubmit}>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter your email"
                    className="input-field"
                  />

                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter your password"
                    className="input-field"
                  />

                  <label>Log in as:</label>
                  <select
                    value={userType}
                    onChange={handleUserTypeChange}
                    className="input-field"
                  >
                    <option value="consultant">Consultant</option>
                    <option value="jobseeker">Jobseeker</option>
                  </select>

                  <button type="submit" className="login-button">
                    Login
                  </button>
                </form>
              </>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {!loginSuccess && (
              <p className="signup-text">
                Don't have an account yet?&nbsp;
                <Link to="/signup" className="signup-link">
                  Sign Up
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/auth.context";
// import authService from "../../services/auth.service";
// import "./LoginPage.css";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("jobseeker");
//   const [errorMessage, setErrorMessage] = useState(undefined);

//   const navigate = useNavigate();

//   const { storeToken, authenticateUser } = useContext(AuthContext);

//   const handleEmail = (e) => setEmail(e.target.value);
//   const handlePassword = (e) => setPassword(e.target.value);

//   const handleUserTypeChange = (e) => setUserType(e.target.value);

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     const requestBody = { email, password, userType };

//     authService
//       .login(requestBody)
//       .then((response) => {
//         const { authToken, userType } = response.data;
//         storeToken(authToken);
//         authenticateUser();

//         if (userType === "consultant") {
//           navigate("/csprofile");
//         } else if (userType === "jobseeker") {
//           navigate("/jsprofile");
//         }
//       })
//       .catch((error) => {
//         const errorDescription = error.response.data.message;
//         setErrorMessage(errorDescription);
//       });
//   };

//   return (
//     <div className="LoginPage">
//       <h1>Login</h1>

//       <form onSubmit={handleLoginSubmit}>
//         <label>Email:</label>
//         <input type="email" name="email" value={email} onChange={handleEmail} />

//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={handlePassword}
//         />

//         <label>Log in as:</label>
//         <select value={userType} onChange={handleUserTypeChange}>
//           <option value="consultant">Consultant</option>
//           <option value="jobseeker">Jobseeker</option>
//         </select>

//         <button type="submit">Login</button>
//       </form>
//       <Link to={"/signup"}>Sign Up</Link>
//     </div>
//   );
// }

// export default LoginPage;

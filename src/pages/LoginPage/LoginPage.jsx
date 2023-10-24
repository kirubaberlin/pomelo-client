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

//   const handleUserTypeChange = (e) => setUserType(e.target.value); // Handle userType selection

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     const requestBody = { email, password, userType }; // Include userType in the request

//     authService
//       .login(requestBody)
//       .then((response) => {
//         const { authToken, userType } = response.data; // Extract userType from the response
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
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <p>Don't have an account yet?</p>
//       <Link to={"/signup"}>Sign Up</Link>
//     </div>
//   );
// }

// export default LoginPage;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("jobseeker");
  const [errorMessage, setErrorMessage] = useState(undefined);

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
          navigate("/csprofile");
        } else if (userType === "jobseeker") {
          navigate("/jsprofile");
        }
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <div className="image-container">
        <img src="orangepomelo.png"></img>
      </div>
      <div className="login-container">
        <h1>Welcome back to Pomelo.</h1>
        <h1>Trust the fruit.</h1>

        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label></label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="email"
          />

          <label></label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="password"
          />

 signuplogin
        <label>Log in as:</label>
        <select value={userType} onChange={handleUserTypeChange}>
          <option value="consultant">Consultant</option>
          <option value="jobseeker">Jobseeker</option>
        </select>

        <button type="submit">Login</button>
      </form>
      <Link to={"/signup"}>Sign Up</Link>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <h2>
          Don't have an account yet?
          <Link to={"/signup"}> Sign Up</Link>
        </h2>
      </div>

    </div>
  );
}

export default LoginPage;

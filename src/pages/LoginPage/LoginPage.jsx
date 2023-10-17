import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
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

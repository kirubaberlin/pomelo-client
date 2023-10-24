import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar1">
      <div className="navbar-button">
        <Link to="/">Home</Link>
      </div>
      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>

          <Link to="/profile">
            <button>Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <div className="navbar-item navbar-button">
            <Link to="/signup"> Jobseeker Sign Up </Link>
          </div>
          <div className="navbar-button">
            <Link to="/consultant"> Consultant Sign Up </Link>
          </div>
          <div className="push navbar-button">
            <Link to="/login"> Login </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;

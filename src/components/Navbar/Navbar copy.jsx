import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { ConsultantContext } from "../../context/consultant.context";
import "./Navbar.css";

function Navbar() {
  const consultant = useContext(ConsultantContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const getProfileLink = () => {
    if (user) {
      if (user.userType === "consultant") {
        return `/consultant-profile/${user._id}`;
      } else {
        return `/job-seeker-profile/${user._id}`;
      }
    } else {
      // Handle the case when the user is not available
      return "/";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          POMELO.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    to={getProfileLink()}
                    className="nav-link"
                    activeClassName="active"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/consultants"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Our Consultants
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" onClick={logOutUser} className="nav-link">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/jobseeker/signup" className="nav-link">
                    Book a consultant
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/consultant/signup" className="nav-link">
                    Apply as a consultant
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          {isLoggedIn && user && (
            <div className="ml-auto d-flex align-items-center">
              <Link to={getProfileLink()} className="nav-link">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="User Profile"
                    className="user-avatar"
                  />
                ) : (
                  <span className="user-initials">
                    {user.firstName ? user.firstName.charAt(0) : ""}
                    {user.lastName ? user.lastName.charAt(0) : ""}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

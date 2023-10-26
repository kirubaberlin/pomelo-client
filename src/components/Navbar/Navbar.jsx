import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ConsultantContext } from "../../context/consultant.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
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
    <nav className="navbar1">
      <div className="navbar-item navbar-button">
        <Link to="/">Home</Link>
      </div>
      {isLoggedIn && (
        <>
          <Link className="navbar-button" to="/consultants">
            Our Consultants
          </Link>

          <Link to={getProfileLink()}>
            <button className="navbar-button">PROFILE</button>
            {consultant.firstName}
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>
          <button className="push navbar-button" onClick={logOutUser}>
            Logout
          </button>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <div className="navbar-item navbar-button">
            <Link to="/jobseeker/signup"> Jobseeker Sign Up </Link>
          </div>
          <div className="navbar-button">
            <Link to="/signup/consultant"> Consultant Sign Up </Link>
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

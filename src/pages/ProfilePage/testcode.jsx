// // import React, { useState, useEffect, useContext } from "react";
// // import {
// //   CardSubtitle,
// //   Card,
// //   CardGroup,
// //   Spinner,
// //   Row,
// //   Col,
// //   Button,
// // } from "react-bootstrap";
// // import { AuthContext } from "../../context/auth.context";
// // import { JobSeekerContext } from "../../context/jobseeker.context";
// // import VideoChatComponent from "../../components/Booking/VideoChatComponent";
// // import "./ProfilePage.css";
// // import { Link } from "react-router-dom";

// // const JobSeekerProfilePage = () => {
// //   const { authToken, isLoading: authLoading, user } = useContext(AuthContext);
// //   const jobSeekerContext = useContext(JobSeekerContext);
// //   const [loadingJobSeeker, setLoadingJobSeeker] = useState(true);
// //   const [error, setError] = useState(null);
// //   const storedToken = localStorage.getItem("authToken");

// //   useEffect(() => {
// //     const fetchJobSeekerData = async () => {
// //       try {
// //         if (!storedToken) {
// //           setLoadingJobSeeker(false);
// //           return;
// //         }

// //         const response = await fetch(
// //           "http://localhost:5005/api/jobseeker/profile",
// //           {
// //             headers: { Authorization: `Bearer ${storedToken}` },
// //           }
// //         );

// //         if (response.ok) {
// //           const data = await response.json();
// //           jobSeekerContext.setJobSeeker(data.jobSeeker); // Update jobSeekerContext with jobSeeker data
// //           setLoadingJobSeeker(false);
// //         } else {
// //           setError("Error loading job seeker data.");
// //           setLoadingJobSeeker(false);
// //         }
// //       } catch (error) {
// //         console.error("Error loading job seeker data:", error);
// //         setError("Error loading job seeker data.");
// //         setLoadingJobSeeker(false);
// //       }
// //     };

// //     if (storedToken) {
// //       fetchJobSeekerData();
// //     }
// //   }, [storedToken]);

// //   if (authLoading || loadingJobSeeker) {
// //     return (
// //       <div className="text-center">
// //         <Spinner animation="border" role="status">
// //           <span className="visually-hidden">Loading...</span>
// //         </Spinner>
// //       </div>
// //     );
// //   }

// //   if (!user) {
// //     return <p>Not logged in.</p>;
// //   }

// //   if (error) {
// //     return <p>{error}</p>;
// //   }

// //   const { firstName, lastName, jobSeekerBio, bookings } =
// //     jobSeekerContext.jobSeeker;

// //   return (
// //     <div className="container profile-container">
// //       <div className="cover-picture">
// //         <img
// //           src="/testcover.png"
// //           alt="Cover"
// //           className="img-fluid cover-image"
// //         />
// //         <button className="edit-cover-icon">
// //           <i className="fas fa-pencil-alt"></i>
// //         </button>
// //       </div>
// //       <div className="profile-header text-center">
// //         <img
// //           src="/kiruba.webp"
// //           alt="Profile"
// //           className="profile-picture img-thumbnail rounded-circle"
// //         />
// //         <button className="edit-profile-icon">
// //           <i className="fas fa-pencil-alt"></i>
// //         </button>
// //         <h1 className="profile-title">{`${firstName} ${lastName}`}</h1>
// //         <p className="profile-info">{user.userType}</p>
// //       </div>

// //       <div className="profile-details-container">
// //         <Card className="profile-details-card">
// //           <Card.Body>
// //             <Card.Text className="text-center">{jobSeekerBio}</Card.Text>
// //           </Card.Body>
// //         </Card>
// //       </div>

// //       <Row>
// //         <Col md={12}>
// //           <h2 className="profile-subtitle">Booked Sessions</h2>
// //           <div className="d-flex flex-wrap">
// //             {bookings && bookings.length > 0 ? (
// //               bookings.map((booking, index) => (
// //                 <Card key={index} className="session-card mx-3 my-3">
// //                   <Card.Body>
// //                     <Card.Title>Session with {booking.consultant}</Card.Title>
// //                     <Card.Text>
// //                       Date: {new Date(booking.date).toLocaleString()}
// //                     </Card.Text>
// //                   </Card.Body>
// //                 </Card>
// //               ))
// //             ) : (
// //               <Card className="session-card">
// //                 <Card.Body>
// //                   <p className="text-muted">No past sessions found.</p>
// //                 </Card.Body>
// //               </Card>
// //             )}
// //           </div>
// //         </Col>
// //       </Row>

// //       <Row className="my-4">
// //         <Col md={12}>
// //           <h2 className="profile-subtitle">Video</h2>
// //           <div className="video-container">
// //             <iframe
// //               width="100%"
// //               height="600" // Adjust the height as needed
// //               src="https://www.youtube.com/embed/0MprWWQILbc"
// //               frameBorder="0"
// //               allowFullScreen
// //               title="YouTube Video"
// //             ></iframe>
// //           </div>
// //         </Col>
// //       </Row>

// //       <VideoChatComponent />

// //       <Link to={`/jsprofile/edit/${user._id}`}>
// //         <Button variant="success" className="edit-profile-link">
// //           Edit Profile
// //         </Button>
// //       </Link>
// //     </div>
// //   );
// // };

// // export default JobSeekerProfilePage;

// // router.get("/jobseeker/profile", isAuthenticated, (req, res) => {
// //     // req.payload contains the user information from the JWT
// //     const jobseekerId = req.payload._id;

// //     Booking.find({ jobseeker: jobseekerId })
// //       .populate("consultant", "firstName lastName")
// //       .then((bookings) => {
// //         if (bookings.length === 0) {
// //           return res
// //             .status(200)
// //             .json({ message: "No bookings found for this jobseeker." });
// //         }
// //         // Once bookings are found, fetch the job seeker's profile
// //         Jobseeker.findById(jobseekerId)
// //           .select("-password")
// //           .then((jobSeeker) => {
// //             if (!jobSeeker) {
// //               return res.status(404).json({ message: "Jobseeker not found." });
// //             }
// //             res.status(200).json({ jobSeeker, bookings });
// //           })
// //           .catch((error) => {
// //             res.status(500).json({ message: "Internal server error." });
// //           });
// //       })
// //       .catch((error) => {
// //         res.status(500).json({ message: "Internal server error." });
// //       });
// //   });

// //cs d
// import React, { useState, useEffect } from "react";
// import { Card, Button } from "react-bootstrap";
// import { useParams, Link } from "react-router-dom";
// import BookingModal from "../../components/Booking/BookingModal";
// import "./ConsultantDetail.css";

// const ConsultantDetail = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { id } = useParams();
//   const [consultant, setConsultant] = useState({
//     firstName: "",
//     lastName: "",
//     description: "",
//     availablePackages: [],
//     rating: 0,
//     profilePicture: "",
//   });

//   useEffect(() => {
//     fetch(`http://localhost:5005/api/consultant/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setConsultant(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching consultant data: ", error);
//       });
//   }, [id]);

//   const handleBookNowClick = () => {
//     setShowModal(true);
//   };

//   const closeBookingModal = () => {
//     setShowModal(false);
//   };

//   const { firstName, lastName, description, rating, profilePicture } =
//     consultant;

//   return (
//     <div className="container consultant-detail">
//       <div className="cover-picture">
//         <img
//           src={profilePicture}
//           alt={`${firstName} ${lastName}`}
//           className="cover-image"
//         />
//         <Link to="/consultants">
//           <button className="back-button">
//             <i className="fas fa-arrow-left"></i> Back to Consultants
//           </button>
//         </Link>
//       </div>
//       <div className="profile-header">
//         <img
//           src={profilePicture}
//           alt={`${firstName} ${lastName}`}
//           className="profile-picture"
//         />
//         <h1 className="profile-title">
//           {firstName} {lastName}
//         </h1>
//         <p className="profile-info">Consultant</p>
//       </div>
//       <div className="profile-details">
//         <Card className="profile-details-card">
//           <Card.Body>
//             <Card.Text className="profile-description">{description}</Card.Text>
//             <Card.Text className="profile-rating">
//               Rating: {rating} / 5
//             </Card.Text>
//           </Card.Body>
//           <Card.Footer>
//             <Button
//               className="book-now-button"
//               variant="primary"
//               onClick={handleBookNowClick}
//             >
//               Book Now
//             </Button>
//           </Card.Footer>
//         </Card>
//       </div>
//       {showModal && (
//         <BookingModal
//           isOpen={showModal}
//           onRequestClose={closeBookingModal}
//           consultant={consultant}
//         />
//       )}
//     </div>
//   );
// };

// export default ConsultantDetail;

//navbar -bkup

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth.context";
// import { ConsultantContext } from "../../context/consultant.context";
// import "./Navbar.css";

// function Navbar() {
//   const consultant = useContext(ConsultantContext);
//   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

//   const getProfileLink = () => {
//     if (user) {
//       if (user.userType === "consultant") {
//         return `/consultant-profile/${user._id}`;
//       } else {
//         return `/job-seeker-profile/${user._id}`;
//       }
//     } else {
//       // Handle the case when the user is not available
//       return "/";
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           POMELO.
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     to={getProfileLink()}
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     Profile
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     to="/consultants"
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     Our Consultants
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/" onClick={logOutUser} className="nav-link">
//                     Logout
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link to="/jobseeker/signup" className="nav-link">
//                     Book a consultant
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/consultant/signup" className="nav-link">
//                     Apply as a consultant
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/login" className="nav-link">
//                     Login
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {isLoggedIn && user && (
//             <div className="ml-auto d-flex align-items-center">
//               <Link to={getProfileLink()} className="nav-link">
//                 {user.profilePicture ? (
//                   <img
//                     src={user.profilePicture}
//                     alt="User Profile"
//                     className="user-avatar"
//                   />
//                 ) : (
//                   <span className="user-initials">
//                     {user.firstName ? user.firstName.charAt(0) : ""}
//                     {user.lastName ? user.lastName.charAt(0) : ""}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

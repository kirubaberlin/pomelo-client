// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Card, ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";
// import { AuthContext } from "../../context/auth.context";
// import VideoChatComponent from "../../components/Booking/VideoChatComponent";
// import "./ProfilePage.css";

// const JobSeekerProfilePage = () => {
//   const { authToken, isLoading: authLoading, user } = useContext(AuthContext);
//   const [loadingJobSeeker, setLoadingJobSeeker] = useState(true);
//   const [error, setError] = useState(null);

//   // Define state to store jobSeeker data and bookings
//   const [profileData, setProfileData] = useState({
//     jobSeeker: null,
//     bookings: [],
//   });

//   const storedToken = localStorage.getItem("authToken");

//   useEffect(() => {
//     const fetchJobSeekerData = async () => {
//       try {
//         if (!storedToken) {
//           setLoadingJobSeeker(false);
//           return;
//         }

//         console.log("Fetching job seeker data...");
//         const response = await fetch(
//           "http://localhost:5005/api/jobseeker/profile",
//           {
//             headers: { Authorization: `Bearer ${storedToken}` },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched job seeker data:", data);

//           // Check if data contains the jobSeeker property
//           if (data.jobSeeker) {
//             // Set the profileData state with the data
//             setProfileData(data);
//           } else {
//             setError("Job seeker data not available.");
//           }

//           setLoadingJobSeeker(false);
//         } else {
//           console.log("Error loading job seeker data.");
//           setError("Error loading job seeker data.");
//           setLoadingJobSeeker(false);
//         }
//       } catch (error) {
//         console.error("Error loading job seeker data:", error);
//         setError("Error loading job seeker data.");
//         setLoadingJobSeeker(false);
//       }
//     };

//     if (storedToken) {
//       fetchJobSeekerData();
//     }
//   }, [storedToken]);

//   if (authLoading || loadingJobSeeker) {
//     return (
//       <div className="text-center">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   if (!user) {
//     return <p>Not logged in.</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!profileData.jobSeeker) {
//     return <p>Job seeker data not available.</p>;
//   }

//   const { firstName, lastName, jobSeekerBio } = profileData.jobSeeker;

//   return (
//     <div className="container profile-container">
//       <div className="cover-picture">
//         <img
//           src="/testcover.png" // Add the appropriate source for the cover picture
//           alt="Cover"
//           className="img-fluid cover-image"
//         />
//         <button className="edit-cover-icon">
//           <i className="fas fa-pencil-alt"></i>
//         </button>
//       </div>

//       <div className="profile-header text-center">
//         <img
//           src="/kiruba.webp" // Add the appropriate source for the profile picture
//           alt="Profile"
//           className="profile-picture img-thumbnail rounded-circle"
//         />
//         <button className="edit-profile-icon">
//           <i className="fas fa-pencil-alt"></i>
//         </button>
//         <h1 className="profile-title">{`${firstName} ${lastName}`}</h1>
//         <p className="profile-info">{user.userType}</p>
//       </div>

//       <div className="profile-details-container">
//         <Card className="profile-details-card">
//           <Card.Body>
//             <Card.Text className="text-center">{jobSeekerBio}</Card.Text>
//           </Card.Body>
//         </Card>
//       </div>

//       <Row>
//         <Col md={4}>
//           <div className="profile-session-container">
//             <h2 className="profile-subtitle">Booked Sessions</h2>
//             {profileData.bookings ? (
//               profileData.bookings.map((booking, index) => (
//                 <Card key={index} className="session-card custom-card-width">
//                   <Card.Header className="bg-success text-white">
//                     Session
//                   </Card.Header>
//                   <Card.Body>
//                     <Card.Title>Session with {booking.consultant}</Card.Title>
//                     <Card.Text>
//                       <p>
//                         Session Date:{" "}
//                         {new Date(booking.sessionDate).toLocaleString()}
//                       </p>
//                       <p>Package Booked: {booking.packageType}</p>
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               ))
//             ) : (
//               <p>No booked sessions available.</p>
//             )}
//           </div>
//         </Col>

//         <Col md={8}>
//           <div className="video-chat-container">
//             <VideoChatComponent />
//           </div>
//         </Col>
//       </Row>

//       <Link to={`/jsprofile/edit/${user._id}`}>
//         <Button variant="success" className="edit-profile-link">
//           Edit Profile
//         </Button>
//       </Link>
//     </div>
//   );
// };

// export default JobSeekerProfilePage;

import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import VideoChatComponent from "../../components/Booking/VideoChatComponent";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";

const JobSeekerProfilePage = () => {
  const { authToken, isLoading: authLoading, user } = useContext(AuthContext);
  const [loadingJobSeeker, setLoadingJobSeeker] = useState(true);
  const [error, setError] = useState(null);

  // Define state to store jobSeeker data and bookings
  const [profileData, setProfileData] = useState({
    jobSeeker: null,
    bookings: [],
  });

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchJobSeekerData = async () => {
      try {
        if (!storedToken) {
          setLoadingJobSeeker(false);
          return;
        }

        console.log("Fetching job seeker data...");
        const response = await fetch(
          "http://localhost:5005/api/jobseeker/profile",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched job seeker data:", data);

          // Check if data contains the jobSeeker property
          if (data.jobSeeker) {
            // Set the profileData state with the data
            setProfileData(data);
          } else {
            setError("Job seeker data not available.");
          }

          setLoadingJobSeeker(false);
        } else {
          console.log("Error loading job seeker data.");
          setError("Error loading job seeker data.");
          setLoadingJobSeeker(false);
        }
      } catch (error) {
        console.error("Error loading job seeker data:", error);
        setError("Error loading job seeker data.");
        setLoadingJobSeeker(false);
      }
    };

    if (storedToken) {
      fetchJobSeekerData();
    }
  }, [storedToken]);

  if (authLoading || loadingJobSeeker) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return <p>Not logged in.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData.jobSeeker) {
    return <p>Job seeker data not available.</p>;
  }

  const { firstName, lastName, jobSeekerBio } = profileData.jobSeeker;

  return (
    <div className="container profile-container">
      <div className="cover-picture">
        <img
          src="/testcover.png"
          alt="Cover"
          className="img-fluid cover-image"
        />
        <button className="edit-cover-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>

      <div className="profile-header text-center">
        <img
          src="/kiruba.webp"
          alt="Profile"
          className="profile-picture img-thumbnail rounded-circle"
        />
        <button className="edit-profile-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <h1 className="profile-title">{`${firstName} ${lastName}`}</h1>
        <p className="profile-info">{user.userType}</p>
      </div>

      {/* <div className="profile-details-container">
        <Card className="profile-details-card">
          <Card.Body>
            <Card.Text className="text-center">{jobSeekerBio}</Card.Text>
          </Card.Body>
        </Card>
      </div> */}

      {/* <div className="profile-session-container">
        <h2 className="profile-subtitle">Booked Sessions</h2>
        {profileData.bookings ? (
          profileData.bookings.map((booking, index) => (
            <Card key={index} className="session-card custom-card-width">
              <Card.Header className="bg-success text-white">
                Session
              </Card.Header>
              <Card.Body>
                <Card.Title>Session with {booking.consultant}</Card.Title>
                <Card.Text>
                  <p>
                    Session Date:{" "}
                    {new Date(booking.sessionDate).toLocaleString()}
                  </p>
                  <p>Package Booked: {booking.packageType}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No booked sessions available.</p>
        )}
      </div> */}

      <div className="video-chat-container">
        <VideoChatComponent />
      </div>

      <Link to={`/jsprofile/edit/${user._id}`}>
        <Button variant="success" className="edit-profile-link">
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default JobSeekerProfilePage;

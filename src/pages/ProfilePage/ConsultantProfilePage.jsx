// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
// import { AuthContext } from "../../context/auth.context";
// import { ConsultantContext } from "../../context/consultant.context";
// //import VideoChatComponent from "../../components/Booking/VideoChatComponent";
// import "./ProfilePage.css";

// const ConsultantProfilePage = () => {
//   const { authToken, isLoading: authLoading, user } = useContext(AuthContext);
//   const consultantContext = useContext(ConsultantContext);
//   const [loadingConsultant, setLoadingConsultant] = useState(true);
//   const [error, setError] = useState(null);
//   const storedToken = localStorage.getItem("authToken");

//   useEffect(() => {
//     const fetchConsultantData = async () => {
//       try {
//         if (!storedToken) {
//           setLoadingConsultant(false);
//           return;
//         }

//         console.log("Fetching consultant data...");
//         const response = await fetch(
//           "http://localhost:5005/api/consultant/profile/",
//           { headers: { Authorization: `Bearer ${storedToken}` } }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched consultant data:", data);
//           consultantContext.setConsultant(data);
//           setLoadingConsultant(false);
//         } else {
//           console.log("Error loading consultant data.");
//           setError("Error loading consultant data.");
//           setLoadingConsultant(false);
//         }
//       } catch (error) {
//         console.error("Error loading consultant data:", error);
//         setError("Error loading consultant data.");
//         setLoadingConsultant(false);
//       }
//     };

//     if (storedToken) {
//       fetchConsultantData();
//     }
//   }, [storedToken]);

//   if (authLoading || loadingConsultant) {
//     return <p>Loading...</p>;
//   }

//   if (!user) {
//     return <p>Not logged in.</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!consultantContext.consultant) {
//     return <p>Not logged in or data not available.</p>;
//   }

//   const { firstName, lastName, ConsultantBio, bookings } =
//     consultantContext.consultant;

//   return (
//     <div className="container profile-container">
//       <div className="cover-picture">
//         <img
//           src="/testcover.png"
//           alt="Cover"
//           className="img-fluid cover-image"
//         />
//         <Button className="edit-icon" variant="primary">
//           <i className="fas fa-pencil-alt"></i>
//         </Button>
//       </div>
//       <div className="profile-header text-center">
//         <img
//           src="/kiruba.webp"
//           alt="Profile"
//           className="profile-picture img-thumbnail rounded-circle"
//         />
//         <Button className="edit-icon" variant="primary">
//           <i className="fas fa-pencil-alt"></i>
//         </Button>
//         <h1 className="profile-title">{`${firstName} ${lastName}`}</h1>
//         <p className="profile-info">{user.userType}</p>
//       </div>

//       <div className="profile-details-container">
//         <Card className="profile-details-card">
//           <Card.Body>
//             <Card.Text className="text-center">{ConsultantBio}</Card.Text>
//           </Card.Body>
//         </Card>
//       </div>

//       <Row>
//         <Col md={4}>
//           <div className="calendar-container smaller-calendar">
//             <h2 className="profile-subtitle">Upcoming Sessions</h2>
//             <Card>
//               <Card.Header className="bg-success text-white">
//                 Sessions
//               </Card.Header>
//             </Card>
//           </div>
//         </Col>

//         <Col md={8}>
//           <div className="profile-session-container">
//             <h2 className="profile-subtitle">Past Sessions</h2>
//             <Card className="session-card">
//               <Card.Header className="bg-success text-white">
//                 Past Sessions
//               </Card.Header>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>Session with Frank - 12/10/2023</ListGroup.Item>
//                 <ListGroup.Item>
//                   Session with Joseph - 12/12/2023
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   Session with Bright - 12/12/2023
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   Session with Bright - 12/12/2023
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   Session with Bright - 12/12/2023
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   Session with Bright - 12/12/2023
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   Session with Bright - 12/12/2023
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card>
//           </div>
//         </Col>
//       </Row>
//       {/* <div className="video-chat-container">
//         <VideoChatComponent />
//       </div> */}

//       <Link to={`/projects/edit/${user._id}`}>
//         <Button variant="info">Edit Project</Button>
//       </Link>
//     </div>
//   );
// };

// export default ConsultantProfilePage;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
//import { ConsultantContext } from "../../context/consultant.context";
import VideoChatComponent from "../../components/Booking/VideoChatComponent";
import "./ProfilePage.css";

const ConsultantProfilePage = () => {
  const { isLoading: authLoading, user } = useContext(AuthContext);
  //const consultantContext = useContext(ConsultantContext);
  const [loadingConsultant, setLoadingConsultant] = useState(true);
  const [error, setError] = useState(null);

  // Define state to store consultant data and bookings
  const [profileData, setProfileData] = useState({
    consultant: null,
    bookings: [],
  });

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        if (!storedToken) {
          setLoadingConsultant(false);
          return;
        }

        console.log("Fetching consultant data...");
        const response = await fetch(
          "https://pomelo-server.onrender.com/api/consultant/profile",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched consultant data:", data);

          // Set the profileData state with the data
          setProfileData(data);

          setLoadingConsultant(false);
        } else {
          console.log("Error loading consultant data.");
          setError("Error loading consultant data.");
          setLoadingConsultant(false);
        }
      } catch (error) {
        console.error("Error loading consultant data:", error);
        setError("Error loading consultant data.");
        setLoadingConsultant(false);
      }
    };

    if (storedToken) {
      fetchConsultantData();
    }
  }, [storedToken]);

  if (authLoading || loadingConsultant) {
    return <p>Loading ...</p>;
  }

  if (!user) {
    return <p>Not logged in.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData.consultant) {
    return <p>Not logged in or data not available.</p>;
  }

  const { firstName, lastName, consultantBio, profilePicture } =
    profileData.consultant;

  return (
    <div className="container profile-container">
      <div className="cover-picture">
        <img
          src="/pomelo.png" // Add the appropriate source for the cover picture
          alt="Cover"
          className="img-fluid cover-image"
        />
        <button className="edit-cover-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>

      <div className="profile-header text-center">
        <img
          src={profilePicture} // Add the appropriate source for the profile picture
          alt="Profile"
          className="profile-picture img-thumbnail rounded-circle"
        />
        <button className="edit-profile-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <h1 className="profile-title">{`${firstName} ${lastName}`}</h1>
        <p className="profile-info">{user.userType}</p>
        <p className="profile-info">{consultantBio}</p>
      </div>

      <div className="profile-session-container">
        <h2 className="profile-subtitle">Upcoming Sessions</h2>
        <Row>
          {profileData.bookings.map((booking) => (
            <Col key={booking._id} md={4}>
              <Card className="session-card custom-card-width">
                <Card.Header className="bg-success text-white">
                  Session
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Session with {booking.jobseeker || "Unknown Jobseeker"}
                  </Card.Title>
                  <Card.Text>
                    <p>
                      Session Date:{" "}
                      {new Date(booking.sessionDate).toLocaleString()}
                    </p>
                    <p>Package Booked: {booking.packageType}</p>
                  </Card.Text>
                </Card.Body>
                <Button className="btn-success">Send Meeting link</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <VideoChatComponent />
      <Link to={`/projects/edit/${user._id}`}>
        <Button>Edit Profile</Button>
      </Link>
    </div>
  );
};

export default ConsultantProfilePage;

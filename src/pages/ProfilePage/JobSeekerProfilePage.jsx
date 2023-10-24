import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import { JobSeekerContext } from "../../context/jobseeker.context";
import VideoChatComponent from "../../components/Booking/VideoChatComponent";
import "./ProfilePage.css";

const JobSeekerProfilePage = () => {
  const { authToken, isLoading: authLoading, user } = useContext(AuthContext);
  const jobSeekerContext = useContext(JobSeekerContext);
  const [loadingJobSeeker, setLoadingJobSeeker] = useState(true);
  const [error, setError] = useState(null);
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
          jobSeekerContext.setJobSeeker(data);
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

  if (!jobSeekerContext.jobSeeker) {
    return <p>Not logged in or data not available.</p>;
  }

  const { firstName, lastName, jobSeekerBio, bookings } =
    jobSeekerContext.jobSeeker;

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

      <div className="profile-details-container">
        <Card className="profile-details-card">
          <Card.Body>
            <Card.Text className="text-center">{jobSeekerBio}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Header className="bg-success text-white">Video</Card.Header>
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/0MprWWQILbc"
                frameBorder="0"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </div>
          </Card>
        </Col>

        <Col md={8}>
          <div className="profile-session-container">
            <h2 className="profile-subtitle">Booked Sessions</h2>
            <Card className="session-card">
              <Card.Header className="bg-success text-white">
                Sessions
              </Card.Header>
              <ListGroup variant="flush">
                {bookings && bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <ListGroup.Item key={index}>
                      Session with {booking.consultant} -{" "}
                      {new Date(booking.date).toLocaleString()}
                    </ListGroup.Item>
                  ))
                ) : (
                  <p>No past sessions found.</p>
                )}
              </ListGroup>
            </Card>
          </div>
        </Col>
      </Row>

      <VideoChatComponent />

      <Link to={`/jsprofile/edit/${user._id}`}>
        <Button variant="success" className="edit-profile-link">
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default JobSeekerProfilePage;

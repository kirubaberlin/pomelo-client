import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const showBookingDetails = (date) => {
    setSelectedDate(date);
  };

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
        <h1 className="profile-title">kiruba Berlin</h1>
        <p className="profile-info">Consultant</p>
      </div>
      <div className="profile-details-container">
        <Card className="profile-details-card">
          <Card.Body>
            <Card.Text className="text-center">
              I can help optimise your CV and give you tailor-made interview
              practice to secure that job. My expertise is in the legal
              industry, corporate management and the retail sector. I have over
              fifteen years in international corporate business.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Row>
        <Col md={4}>
          <div className="calendar-container smaller-calendar">
            <h2 className="profile-subtitle">Upcoming Sessions</h2>
            <Card>
              <Card.Header className="bg-success text-white"></Card.Header>
            </Card>
            <Calendar
              className="custom-calendar"
              tileClassName={({ date }) => {
                const upcomingSessionDates = [
                  new Date(2023, 11, 15),
                  new Date(2023, 11, 18),
                ];
                return upcomingSessionDates.find(
                  (sessionDate) =>
                    date.toDateString() === sessionDate.toDateString()
                )
                  ? "highlighted"
                  : "";
              }}
              onClickDay={(date) => {
                showBookingDetails(date);
              }}
            />
          </div>
        </Col>
        <Col md={8}>
          <div className="profile-session-container">
            <h2 className="profile-subtitle">Past Sessions</h2>
            <Card className="session-card">
              <Card.Header className="bg-success text-white"></Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Session with Frank - 12/10/2023</ListGroup.Item>
                <ListGroup.Item>
                  Session with Joseph - 12/12/2023
                </ListGroup.Item>
                <ListGroup.Item>
                  Session with Bright - 12/12/2023
                </ListGroup.Item>
                <ListGroup.Item>
                  Session with Bright - 12/12/2023
                </ListGroup.Item>
                <ListGroup.Item>
                  Session with Bright - 12/12/2023
                </ListGroup.Item>
                <ListGroup.Item>
                  Session with Bright - 12/12/2023
                </ListGroup.Item>
                <ListGroup.Item>
                  Session with Bright - 12/12/2023
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </Col>
      </Row>

      <Link to="/edit-profile" className="btn btn-success edit-profile-link">
        Edit Profile
      </Link>
    </div>
  );
};

export default ProfilePage;

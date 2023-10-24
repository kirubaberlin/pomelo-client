import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import BookingModal from "../../components/Booking/BookingModal";
import "./ConsultantDetail.css";

const ConsultantDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [consultant, setConsultant] = useState({
    firstName: "",
    lastName: "",
    description: "",
    availablePackages: [],
    rating: 0,
    profilePicture: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5005/api/consultant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setConsultant(data);
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, [id]);

  const handleBookNowClick = () => {
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowModal(false);
  };

  const { firstName, lastName, description, rating, profilePicture } =
    consultant;

  return (
    <div className="container consultant-detail-new">
      <div className="cover-picture">
        <img
          src={profilePicture}
          alt={`${firstName} ${lastName}`}
          className="img-fluid cover-image"
        />
        <button className="edit-cover-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
      <div className="profile-header text-center">
        <img
          src={profilePicture}
          alt={`${firstName} ${lastName}`}
          className="profile-picture img-thumbnail rounded-circle"
        />
        <button className="edit-profile-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>
        <h1 className="profile-title" style={{ color: "#ED6658" }}>
          {firstName} {lastName}
        </h1>
        <p className="profile-info">Consultant</p>
      </div>
      <div className="profile-details-container">
        <Card className="profile-details-card">
          <Card.Body>
            <Card.Text className="text-center profile-description">
              {description}
            </Card.Text>

            <Card.Text className="profile-rating">
              Rating: {rating} / 5
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Card.Footer>
        {/*
          Render the "Book Now" button which opens the booking modal when clicked.
        */}
        <Button
          className="book-now-button"
          variant="primary"
          style={{
            backgroundColor: "#ED6658",
            borderColor: "#948D24",
            color: "#FFF",
          }}
          onClick={handleBookNowClick}
        >
          Book Now
        </Button>

        {/*
          Include a link to return to the list of consultants.
        */}
        <Link to="/consultants">
          <Button variant="secondary">Back to Consultants</Button>
        </Link>
      </Card.Footer>

      {/*
        Render the booking modal when showModal state is true.
      */}
      {showModal && (
        <BookingModal
          isOpen={showModal}
          onRequestClose={closeBookingModal}
          consultant={consultant}
        />
      )}
    </div>
  );
};

export default ConsultantDetail;

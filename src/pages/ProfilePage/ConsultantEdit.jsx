import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icons
import {
  faCamera,
  faUser,
  faEnvelope,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import "./ProfilePage.css"; // You can place custom CSS in this file

const EditConsultantProfile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ConsultantBio: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5005/api/consultant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5005/api/consultant/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully!");
        // You can navigate to the consultant's profile page if needed
      } else {
        console.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("An error occurred while updating the profile:", error);
    }
  };

  return (
    <Container className="profile-container">
      <div className="cover-picture">
        <img
          src="/testcover.png"
          alt="Cover"
          className="img-fluid cover-image"
        />
        <button className="edit-cover-icon">
          <FontAwesomeIcon icon={faCamera} />
        </button>
      </div>
      <div className="profile-header text-center">
        <img
          src="/kiruba.webp"
          alt="Profile"
          className="profile-picture img-thumbnail rounded-circle mb-5"
        />
        <button className="edit-profile-icon">
          <FontAwesomeIcon icon={faCamera} />
        </button>
        <Form onSubmit={handleSubmit} className="profile-edit-form mt-5">
          <Form.Group className="mt-2">
            <Form.Label>
              <FontAwesomeIcon icon={faUser} /> First Name
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4">
            <Form.Label>
              <FontAwesomeIcon icon={faUser} /> Last Name
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <FontAwesomeIcon icon={faPencilAlt} /> Description
            </Form.Label>
            <Form.Control
              as="textarea"
              name="ConsultantBio"
              value={formData.ConsultantBio}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
      <Link
        to={`/csprofile/${id}`}
        className="btn btn-secondary edit-profile-link"
      >
        Cancel
      </Link>
    </Container>
  );
};

export default EditConsultantProfile;

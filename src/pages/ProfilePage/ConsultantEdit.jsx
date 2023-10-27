import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faUser,
  faEnvelope,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ProfilePage.css";

const EditConsultantProfile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    consultantBio: "",
    profilePicture: "",
  });
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    fetch(`https://pomelo-server.onrender.com/api/consultant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files[0]) {
      getBase64(files[0]).then((base64String) => {
        setFormData({ ...formData, [name]: base64String });
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      } else {
        console.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("An error occurred while updating the profile:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(
          `http://localhost:5005/api/consultant/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Account deleted successfully!");
          setIsDeleted(true);
        } else {
          console.error("Failed to delete account.");
        }
      } catch (error) {
        console.error("An error occurred while deleting the account:", error);
      }
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  };

  return (
    <Container className="profile-container">
      <div className="cover-picture">
        <img
          src="/pomelo.png" // Add the appropriate source for the cover picture
          alt="Cover"
          className="img-fluid cover-image"
        />
        <button className="edit-cover-icon">
          <i className="fas fa-pencil-alt"></i>
        </button>

        <button className="edit-cover-icon"></button>
      </div>
      <div className="profile-header text-center">
        <img
          src={formData.profilePicture}
          alt="Profile"
          className="profile-picture img-thumbnail rounded-circle mb-5"
        />
        <button className="edit-profile-icon"></button>
        <Form onSubmit={handleSubmit} className="profile-edit-form mt-5">
          <Form.Group className="mt-2">
            <Form.Control
              placeholder="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4">
            <Form.Control
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="tell us about yourself"
              as="textarea"
              name="consultantBio"
              value={formData.consultantBio}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="profile picture"
              type="file"
              name="profilePicture"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Apply Changes
          </Button>
        </Form>

        {isDeleted ? (
          <div className="account-deleted-message">
            <p>Your account has been deleted.</p>
          </div>
        ) : (
          <div className="delete-account">
            <Button variant="danger" onClick={handleDeleteAccount}>
              <FontAwesomeIcon icon={faTrash} /> Delete Account
            </Button>
          </div>
        )}
      </div>
      <div className=" done-cancel-buttons">
        <Link to={`/consultant-profile/${id}`} className="edit-profile-button">
          Done
        </Link>
        <Link to={`/consultant-profile/${id}`} className="edit-profile-button">
          Cancel
        </Link>
      </div>
    </Container>
  );
};

export default EditConsultantProfile;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, ListGroup, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icons
import { faCamera, faPencilAlt } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const EditJobSeekerProfile = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data including the CV file
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("description", description);
    formData.append("cvFile", cvFile);

    try {
      // Send a PUT request to update the job seeker's profile with the form data
      const response = await fetch(
        `http://localhost:5005/api/jobseeker/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Job seeker profile updated successfully!");
        // Handle success, e.g., redirect to the job seeker's profile page
      } else {
        console.error("Error updating job seeker profile");
        // Handle the error
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle any network or other errors
    }
  };

  useEffect(() => {
    if (!isDataFetched) {
      fetch(`http://localhost:5005/api/jobseeker/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setDescription(data.description);
          // Assuming the CV file is a URL, you can set it like this:
          // setCvFile(data.cvUrl);
          setIsDataFetched(true); // Mark data as fetched
        })
        .catch((error) => {
          console.error("Error fetching job seeker data:", error);
          // Handle any errors, e.g., show an error message
        });
    }
  }, [id, isDataFetched]);

  return (
    <div className="container profile-container">
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
          src="/bryte.png"
          alt="Profile"
          className="profile-picture img-thumbnail rounded-circle"
        />
        <button className="edit-profile-icon">
          <FontAwesomeIcon icon={faCamera} />
        </button>
        <h1 className="profile-title">
          {firstName} {lastName}
        </h1>
        <p className="profile-info">Job Seeker</p>
      </div>
      <div className="profile-details-container">
        <Card className="profile-details-card">
          <Card.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCvFile">
                <Form.Label>
                  <FontAwesomeIcon icon={faPencilAlt} /> Update CV
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setCvFile(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
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
            <h2 className="profile-subtitle">
              Booked Sessions with Consultants
            </h2>
            <Card className="session-card">
              <Card.Header className="bg-success text-white">
                Sessions
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Session with kiruba - 12/10/2023
                </ListGroup.Item>
                {/* Add more booked session items here */}
              </ListGroup>
            </Card>
          </div>
        </Col>
      </Row>
      <Link
        to={`/jsprofile/edit/${id}`}
        className="btn btn-secondary edit-profile-link"
      >
        Cancel
      </Link>
    </div>
  );
};

export default EditJobSeekerProfile;

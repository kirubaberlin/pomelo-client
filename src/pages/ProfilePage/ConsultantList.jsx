import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    // Fetch consultant data from your database here
    // Replace the URL with your API endpoint
    fetch("http://localhost:5005/api/consultants")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.consultants)) {
          setConsultants(data.consultants);
        } else {
          console.error("Consultant data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Consultants</h1>
      {Array.isArray(consultants) &&
        consultants.map((consultant) => (
          <Card key={consultant._id} className="mb-3">
            <Card.Body>
              <Card.Title>{consultant.firstName}</Card.Title>
              <Card.Text>{consultant.description}</Card.Text>
              <Link to={`/consultant/detail/${consultant._id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default ConsultantList;

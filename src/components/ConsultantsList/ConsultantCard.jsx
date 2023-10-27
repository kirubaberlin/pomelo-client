import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/ConsultantCard.css";

function ConsultantCard({ consultantId }) {
  const [consultant, setConsultant] = useState(null);

  useEffect(() => {
    // Fetch data for the specific consultant using the consultantId
    fetch(`http://localhost:5005/api/consultant/${consultantId}`)
      .then((response) => response.json())
      .then((data) => {
        setConsultant(data);
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, [consultantId]);

  if (!consultant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card consultant-card" style={{ width: "18rem" }}>
      <img
        src={consultant.consultant.profilePicture}
        className="card-img-top"
        alt={`${consultant.consultant.firstName} ${consultant.consultant.lastName}`}
      />
      <div className="card-body">
        <h5 className="card-title consultant-name">
          {consultant.consultant.firstName} {consultant.consultant.lastName}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted consultant-info">
          {" "}
          {consultant.consultant.Bio}
          Consultant
        </h6>
        <div className="card-body-bottom">
          <p className="card-text consultant-rating">
            Rating: {consultant.rating}
          </p>
          <Link
            to={`/consultant/detail/${consultant._id}`}
            className="btn btn-primary consultant-link"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConsultantCard;

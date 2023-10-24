import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/ConsultantCard.css";
//import "Navbar.css";

function ConsultantCard({ consultant }) {
  return (
    <div className="card consultant-card" style={{ width: "18rem" }}>
      <img
        src={consultant.profilePicture}
        className="card-img-top"
        alt={consultant.name}
      />
      <div className="card-body">
        <h5 className="card-title consultant-name">{consultant.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted consultant-info">
          {consultant.info}
        </h6>
        <div className="card-body-bottom">
          <p className="card-text consultant-rating">
            Rating: {consultant.rating}
          </p>
          <Link
            to={`/consultants/${consultant.id}`}
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

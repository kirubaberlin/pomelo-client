import React, { useState, useEffect } from "react";
import ConsultantCard from "./ConsultantCard";
import "./styles/ConsultantsList.css";

const backgroundImageURL = "juicyPomelo.png";

function ConsultantsList() {
  const [consultantData, setConsultantData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch consultant data from your API endpoint
    fetch(`http://localhost:5005/api/consultants`)
      .then((response) => response.json())
      .then((data) => {
        if (data.consultants && Array.isArray(data.consultants)) {
          setConsultantData(data.consultants);
        } else {
          console.error(
            "Invalid API response: Missing or invalid 'consultants' property"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching consultant data: ", error);
      });
  }, []);

  // Filter consultants based on the search term
  const filteredConsultants = consultantData.filter((consultant) =>
    consultant.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="consultants-list">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
      >
        <div className="transbox">
          <h1 className="title">Meet Our POMELO Consultants</h1>
          <p className="infoText">
            <div className="transparentPaper">
              You can rely on our talented group of international consultants to
              add sparkle to your CV and let you fly through your next
              interviews.
            </div>
          </p>
          <p className="paragraph">
            Trust the <span className="white">fruit.</span> Trust{" "}
            <span className="white">POMELO.</span>
          </p>
        </div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search consultants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="cards">
        {filteredConsultants.map((consultant) => (
          <ConsultantCard key={consultant._id} consultantId={consultant._id} />
        ))}
      </div>
    </div>
  );
}

export default ConsultantsList;

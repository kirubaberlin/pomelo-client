// import React from "react";
// import ConsultantCard from "./ConsultantCard";
// import "./styles/ConsultantsList.css";

// const consultantData = [
//   {
//     id: 1,
//     name: "Alex Palmer",
//     profilePicture: "alexPalmer.jpg",
//     info: "Experienced in international corporate recruitment for 15 years",
//     rating: 4,
//   },
//   {
//     id: 2,
//     name: "Martin Roberts",
//     profilePicture: "martin.jpg",
//     info: "Medical and pharmaceutical recruitment expert",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Sobana Swarnam",
//     profilePicture: "sobanaSwarnam.jpg",
//     info: "Talent-seeking consultant with 100% track record of matching jobseekers with positions",
//     rating: 5,
//   },
//   {
//     id: 4,
//     name: "Mark Settgast",
//     profilePicture: "Mark.jpg",
//     info: "Expert in CV optimisation and cover letters and the property development market",
//     rating: 5,
//   },
//   {
//     id: 5,
//     name: "Lindsey Goldwin",
//     profilePicture: "LindseyGoldwin.avif",
//     info: "Legal recruitment and international business experience across Europe, based in Madrid",
//     rating: 5,
//   },
//   {
//     id: 6,
//     name: "Pablo Vietta",
//     profilePicture: "PabloVietta.webp",
//     info: "Specialist in the German and British employment markets, based in Berlin",
//     rating: 5,
//   },
//   {
//     id: 7,
//     name: "Brian De Silva",
//     profilePicture: "briandesilva.png",
//     info: "Legal English expert and proofreader based in Paris. ",
//     rating: 5,
//   },
//   {
//     id: 8,
//     name: "Jamie Guthrie",
//     profilePicture: "JamieGuthrie.jpeg",
//     info: "International recruitment expert.",
//     rating: 5,
//   },
//   {
//     id: 9,
//     name: "Celia Dawson",
//     profilePicture: "celiadawson.jpg",
//     info: "recruitment expert in the hospitality market for 12 years.",
//     rating: 5,
//   },
//   {
//     id: 10,
//     name: "Matt Hughes",
//     profilePicture: "matthughes.jpg",
//     info: "Sustainable job market expert based in Berlin.",
//     rating: 5,
//   },
//   {
//     id: 11,
//     name: "Seniv Petro",
//     profilePicture: "SenivPetro.jpg",
//     rating: 4,
//     info: "Language consultant and recruitment expert based in Morocco.",
//   },
//   {
//     id: 12,
//     name: "Smita Singh",
//     profilePicture: "smitasingh.jpg",
//     info: "London based recruitment expert with proven track record.",
//     rating: 5,
//   },
//   {
//     id: 13,
//     name: "Kiruba Berlin",
//     profilePicture: "kiruba.webp",
//     info: "Legal and journalistic recruitment consultant with 20 years of international corporate experience. ",
//     rating: 5,
//   },
// ];

// const backgroundImageURL = "juicyPomelo.png";

// function ConsultantsList() {
//   return (
//     <div className="consultants-list  ">
//       {/* Background image div */}
//       <div
//         className="background-image"
//         style={{ backgroundImage: `url(${backgroundImageURL})` }}
//       >
//         <div className="transbox">
//           <h1 className="title">Meet our POMELO Consultants</h1>
//           <p className="infoText">
//             <div className="transparentPaper">
//               You can rely on our talented group of international consultants to
//               add sparkle to your CV and let you fly through your next
//               interviews.{" "}
//             </div>
//           </p>
//           <p className="paragraph">
//             Trust the <span className="white">fruit.</span> Trust{" "}
//             <span className="white">POMELO.</span>
//           </p>{" "}
//         </div>
//       </div>
//       <div className="cards">
//         {consultantData.map((consultant) => (
//           <ConsultantCard key={consultant.id} consultant={consultant} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ConsultantsList;

import React, { useEffect, useState } from "react";
import ConsultantCard from "./ConsultantCard";
import axios from "axios";
import "./styles/ConsultantsList.css";

const backgroundImageURL = "juicyPomelo.png";
const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
function ConsultantsList() {
  const [consultants, setConsultants] = useState([]);
  const getConsultants = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/consultants`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setConsultants(response.data.consultants);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getConsultants();
  }, []);

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
        {consultants.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
}

export default ConsultantsList;

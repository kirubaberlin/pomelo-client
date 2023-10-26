// import React, { useState, useEffect } from "react";
// import { Card, Button, Form, FormControl } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./ConsultantList.css";

// const ConsultantList = () => {
//   const [consultants, setConsultants] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5005/api/consultants")
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data.consultants)) {
//           setConsultants(data.consultants);
//         } else {
//           console.error("Consultant data is not an array:", data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching consultant data: ", error);
//       });
//   }, []);

//   const filteredConsultants = consultants.filter((consultant) =>
//     consultant.firstName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="consultant-list-container">
//       <div className="welcome-section">
//         <div className="welcome-overlay">
//           <div className="welcome-content">
//             <h1 className="welcome-heading">Meet Our POMELO Consultants</h1>
//             <p className="welcome-description">
//               Find the Perfect Consultant for Your Interviews
//             </p>
//             <Form className="search-form">
//               <FormControl
//                 type="text"
//                 placeholder="Search Consultants"
//                 className="search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Button variant="primary" className="search-button">
//                 Search
//               </Button>
//             </Form>
//           </div>
//         </div>
//       </div>
//       <div className="container">
//         <h2 className="consultant-list-heading">Qualified Consultants</h2>
//         <div className="card-container">
//           {filteredConsultants.map((consultant) => (
//             <Card key={consultant._id} className="consultant-card">
//               <Card.Body>
//                 <div className="card-profile">
//                   {consultant.profilePicture ? (
//                     <img
//                       src={consultant.profilePicture}
//                       alt={consultant.firstName}
//                       className="profile-picture"
//                     />
//                   ) : (
//                     <div className="avatar">Avatar</div>
//                   )}
//                 </div>
//                 <Card.Title className="card-title">
//                   {consultant.firstName}
//                 </Card.Title>
//                 <Card.Text className="card-description">
//                   {consultant.description}
//                 </Card.Text>
//                 <Button
//                   variant="primary"
//                   className="view-details-button"
//                   as={Link}
//                   to={`/consultant/detail/${consultant._id}`}
//                 >
//                   View Details
//                 </Button>
//               </Card.Body>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsultantList;

import React, { useState, useEffect } from "react";
import { Card, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ConsultantList.css"; // Import the custom styles here

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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

  const filteredConsultants = consultants.filter((consultant) =>
    consultant.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="consultant-list-container">
      <div className="welcome-section">
        <div className="welcome-overlay">
          <div className="welcome-content">
            <h1 className="welcome-heading">Meet Our POMELO Consultants</h1>
            <p className="welcome-description">
              Find the Perfect Consultant for Your Interviews
            </p>
            <Form className="search-form">
              <FormControl
                type="text"
                placeholder="Search Consultants"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" className="search-button">
                Search
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="consultant-list-heading">Qualified Consultants</h2>
        <div className="cards card-container">
          {filteredConsultants.map((consultant) => (
            <Card key={consultant._id} className="consultant-card">
              <Card.Body>
                <div className="card-profile ">
                  {consultant.profilePicture ? (
                    <img
                      src={consultant.profilePicture}
                      alt={consultant.firstName}
                      className="card-img-top"
                    />
                  ) : (
                    <div className="avatar">Avatar</div>
                  )}
                </div>
                <Card.Title className="card-title consultant-name">
                  {consultant.firstName}
                  {consultant.lastName}
                </Card.Title>
                <Button
                  variant="primary"
                  className="view-details-button consultant-link"
                  as={Link}
                  to={`/consultant/detail/${consultant._id}`}
                >
                  View Details
                </Button>
                <Card.Text className="card-description">
                  {consultant.consultantBio}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantList;

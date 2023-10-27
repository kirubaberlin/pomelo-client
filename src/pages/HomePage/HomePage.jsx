import React from "react";
import "./HomePage.css";
import ConsultantCard from "../../components/ConsultantsList/ConsultantCard";

const consultantData = [
  {
    id: 1,
    name: "Alex Palmer",
    profilePicture: "alexPalmer.jpg",
    info: "Experienced in international corporate recruitment for 15 years",
    rating: 4,
  },
  {
    id: 2,
    name: "Martin Roberts",
    profilePicture: "martin.jpg",
    info: "Medical and pharmaceutical recruitment expert",
    rating: 5,
  },
  {
    id: 3,
    name: "Sobana Swarnam",
    profilePicture: "sobanaSwarnam.jpg",
    info: "Talent-seeking consultant with a 100% track record of matching jobseekers with positions",
    rating: 5,
  },
  {
    id: 4,
    name: "Mark Settgast",
    profilePicture: "Mark.jpg",
    info: "Expert in CV optimization and cover letters and the property development market",
    rating: 5,
  },
];

const additionalInfo = [
  {
    title: "CV Optimization",
    text: "We can get your CV sparkling to be tailor-made to suit each job",
  },
  {
    title: "Job Interview Practice",
    text: "Know what to say without fear. Come across as the professional that you know you are.",
  },
  {
    title: "Experienced Consultants from All Over the World",
    text: "Choose an expert dedicated to your industry and region",
  },
  {
    title: "One-to-One Sessions in Packages",
    text: "One, three, or five sessions. Personalized and tailor-made, all just a click away with only your requirements in mind.",
  },
];

const backgroundImageURL = "juicyPomelo.png";

function HomePage() {
  return (
    <div className="consultants-list">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImageURL})` }}
      >
        <div className="transbox">
          <h1 className="title">
            POMELO. The only site a jobseeker will ever need. We can help you
            get your perfect job.
          </h1>
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
      <div className="cards">
        {consultantData.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>

      <div
        className="four-box-background"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/orangepomelo.png)`,
        }}
      >
        {additionalInfo.map((info, index) => (
          <div className="card" style={{ width: "18rem" }} key={index}>
            <div className="card-body">
              <h5 className="card-title">{info.title}</h5>
              <p className="card-text">{info.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

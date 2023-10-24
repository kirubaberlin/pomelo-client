import React from "react";
import { Container, Button } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="hero">
        <div className="hero-content">
          <Container>
            <h1 className="display-4">Welcome to Pomelo</h1>
            <p className="lead">
              Your destination for top-quality consultants.
            </p>
            <Button variant="primary">Find a Consultant</Button>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

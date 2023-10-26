import React from "react";
import { Container, Button } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="mentor-homepage">
      <header className="mentor-header">
        <nav className="mentor-nav">
          <h1 className="mentor-logo">MentorHub</h1>
          <ul className="mentor-menu"></ul>
        </nav>
      </header>

      <main className="mentor-main">
        <section className="mentor-welcome">
          <h1 className="mentor-title">Welcome to MentorHub</h1>
          <p className="mentor-description">
            Connect with mentees, share your expertise, and make a difference.
          </p>
        </section>

        <section className="mentor-cta">
          <h2 className="mentor-cta-title">Become a Mentor</h2>
          <p className="mentor-cta-description">
            Join MentorHub and help aspiring individuals reach their goals.
          </p>
        </section>
      </main>

      <footer className="mentor-footer">
        <p>&copy; 2023 MentorHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;

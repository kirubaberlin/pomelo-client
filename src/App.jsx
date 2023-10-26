import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";

import HomePage from "./pages/HomePage/HomePage";
import JobSeekerProfilePage from "./pages/ProfilePage/JobSeekerProfilePage";
import JobSeekerEdit from "./pages/ProfilePage/JobSeekerEdit";
import SignupPage from "./pages/SignupPage/SignupPage";
import ConsultantSignup from "./pages/SignupPage/ConsultantSignup";
import LoginPage from "./pages/LoginPage/LoginPage";
import ConsSignupPage from "./pages/ConsSignupPage/ConsSignupPage";
//import ConsultantsList from "./components/ConsultantsList/ConsultantsList";

import Navbar from "./components/Navbar/Navbar";
import Room from "./components/Room/Room";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ConsultantProfilePage from "./pages/ProfilePage/ConsultantProfilePage";
import ConsultantEdit from "./pages/ProfilePage/ConsultantEdit";
import ConsultantDetail from "./pages/ProfilePage/ConstultantDetail";
import JobseekerSignupPage from "./pages/SignupPage/JobseekerSignupPage";
import ConsultantList from "./pages/ProfilePage/ConsultantList";
import ConsultantsList from "./components/ConsultantsList/ConsultantsList";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<ConsultantsList />} />

        <Route
          path="/consultant-profile/:id"
          element={
            <IsPrivate>
              <ConsultantProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/room"
          element={
            <IsPrivate>
              <Room />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <IsPrivate>
              <ConsultantEdit />
            </IsPrivate>
          }
        />

        <Route
          path="/consultant/detail/:id"
          element={
            <IsPrivate>
              <ConsultantDetail />
            </IsPrivate>
          }
        />

        <Route
          path="/job-seeker-profile/:id"
          element={
            <IsPrivate>
              <JobSeekerProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/consultants"
          element={
            <IsPrivate>
              <ConsultantList />
            </IsPrivate>
          }
        />

        <Route
          path="/jsprofile/edit/:id"
          element={
            <IsPrivate>
              <JobSeekerEdit />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/signup/consultant"
          element={
            <IsAnon>
              <ConsultantSignup />
            </IsAnon>
          }
        />

        <Route
          path="/jobseeker/signup"
          element={
            <IsAnon>
              <JobseekerSignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/consultant"
          element={
            <IsAnon>
              <ConsSignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

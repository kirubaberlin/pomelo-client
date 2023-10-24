import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import JobSeekerProfilePage from "./pages/ProfilePage/JobSeekerProfilePage";
import JobSeekerEdit from "./pages/ProfilePage/JobSeekerEdit";
import SignupPage from "./pages/SignupPage/SignupPage";
import ConsultantSignup from "./pages/SignupPage/ConsultantSignup";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import Room from "./components/Room/Room";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ConsultantProfilePage from "./pages/ProfilePage/ConsultantProfilePage";
import ConsultantEdit from "./pages/ProfilePage/ConsultantEdit";
import ConsultantDetail from "./pages/ProfilePage/ConstultantDetail";
import JobseekerSignupPage from "./pages/SignupPage/JobseekerSignupPage";
import ConsultantList from "./pages/ProfilePage/ConsultantList";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/csprofile"
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
          path="/jsprofile"
          element={
            <IsPrivate>
              <JobSeekerProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/allcs"
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
          path="/signup/js"
          element={
            <IsAnon>
              <JobseekerSignupPage />
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

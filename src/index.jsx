import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ConsultantProvider } from "./context/consultant.context";
import { JobSeekerProvider } from "./context/jobseeker.context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51I45iRCt8DyxHOxWQ5MUcDJymTTrTnLzzBLdFILL3HjUN7YIdsEtnSNhEkHhXRuzuJ3rcV4L8FKIhE9iiI4JNSf900D0FjGlFH "
);

ReactDOM.render(
  <Router>
    <AuthProviderWrapper>
      <ConsultantProvider>
        <JobSeekerProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </JobSeekerProvider>
      </ConsultantProvider>
    </AuthProviderWrapper>
  </Router>,
  document.getElementById("root")
);

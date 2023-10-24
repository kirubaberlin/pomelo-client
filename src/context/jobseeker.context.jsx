import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const JobSeekerContext = createContext();

export const useJobSeekerContext = () => {
  return useContext(JobSeekerContext);
};

const JobSeekerProvider = ({ children }) => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateJobSeeker = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const user = response.data;
          setJobSeeker({
            firstName: user.firstName,
            _id: user._id,
            lastName: user.lastName,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          setJobSeeker(null);
          setIsLoading(false);
        });
    } else {
      setJobSeeker(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticateJobSeeker();
  }, []);

  return (
    <JobSeekerContext.Provider value={{ jobSeeker, setJobSeeker }}>
      {!isLoading ? (
        children
      ) : (
        // You can place a loading component here while verifying the token
        <p>Loading...</p>
      )}
    </JobSeekerContext.Provider>
  );
};

export { JobSeekerProvider, JobSeekerContext };

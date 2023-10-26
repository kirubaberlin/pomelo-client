import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const ConsultantContext = createContext();

export const useConsultantContext = () => {
  return useContext(ConsultantContext);
};

const ConsultantProvider = ({ children }) => {
  const [consultant, setConsultant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateConsultant = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const user = response.data;
          setConsultant({
            firstName: user.firstName,
            _id: user._id, // Updated line
            lastName: user.lastName,
            consultantBio: user.consultantBio,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          setConsultant(null);
          setIsLoading(false);
        });
    } else {
      setConsultant(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticateConsultant();
  }, []);

  return (
    <ConsultantContext.Provider value={{ consultant, setConsultant }}>
      {!isLoading ? children : <p>Loading...</p>}
    </ConsultantContext.Provider>
  );
};

export { ConsultantProvider, ConsultantContext };

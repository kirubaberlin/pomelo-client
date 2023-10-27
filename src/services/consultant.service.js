import axios from "axios";

class ConsultantService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET /api/consultants
  getAllConsultants = async () => {
    return this.api.get("/api/consultants");
  };

  // GET /api/consultant/:id
  getConsultantById = async (id) => {
    return this.api.get(`/api/consultant/${id}`);
  };

  // GET /api/consultant/:id/details
  getConsultantDetails = async (id) => {
    return this.api.get(`/api/consultant/${id}`);
  };

  // GET /api/consultant/profile
  getConsultantProfile = async () => {
    return this.api.get("/api/consultant/profile");
  };

  // Add more functions for other consultant-related actions as needed
  // For example, updating consultant information, creating sessions, etc.
}

// Create one instance of the service
const consultantService = new ConsultantService();

export default consultantService;

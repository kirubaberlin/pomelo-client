import axios from "axios";

class JobSeekerService {
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

  // GET /api/jobseekers
  getAllJobSeekers = async () => {
    return this.api.get("/api/jobseekers");
  };

  // GET /api/jobseeker/:id
  getJobSeekerById = async (id) => {
    return this.api.get(`/api/jobseeker/${id}`);
  };

  // GET /api/jobseeker/:id/details
  getJobSeekerDetails = async (id) => {
    return this.api.get(`/api/jobseeker/${id}`);
  };

  // GET /api/jobseeker/profile
  getJobSeekerProfile = async () => {
    return this.api.get("/api/jobseeker/profile");
  };

  // Add more functions for other job seeker-related actions as needed
  // For example, updating job seeker information, submitting applications, etc.
}

// Create one instance of the service
const jobSeekerService = new JobSeekerService();

export default jobSeekerService;

// consultant.service.js

import axios from "axios";

const API_BASE_URL = "http://localhost:5005";

const consultantService = {
  // Fetch consultant profile
  getConsultantProfile: async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/auth/consultant/profile/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add more functions for other consultant-related actions as needed
  // For example, updating consultant information, creating sessions, etc.
};

export default consultantService;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const authService = {
  async signup(token, email, userName) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/auth/signup`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async login(token, email) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/auth/login`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
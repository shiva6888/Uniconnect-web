import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Axios instance for real backend calls
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const apiService = {
  signup: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  verifyOtp: async (email, otp) => {
    const response = await apiClient.post('/auth/otp', {email, otp});
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  submitFeedback: async (feedbackData) => {
    const response = await apiClient.post('/feedback', feedbackData);
    return response.data;
  },

  addEvent: async (eventData) => {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await apiClient.delete(`/events/${eventId}`);
    return response.data;
  },

  getEvents: async () => {
    const response = await apiClient.get('/events');
    return response.data;
  },

  addAccommodation: async (accommodationData) => {
    const response = await apiClient.post('/accommodations', accommodationData);
    return response.data;
  },

  deleteAccommodation: async (accommodationId) => {
    const response = await apiClient.delete(`/accommodations/${accommodationId}`);
    return response.data;
  },

  getAccommodations: async () => {
    const response = await apiClient.get('/accommodations');
    return response.data;
  },

  addComment: async (commentData) => {
    const response = await apiClient.post('/comments', commentData);
    return response.data;
  },

  getComments: async (postId) => {
    const response = await apiClient.get(`/comments?postId=${postId}`);
    return response.data;
  },
};

export default apiService;
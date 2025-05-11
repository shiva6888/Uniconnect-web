import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const apiService = {
  signup: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  verifyOtp: async ({ email, otp }) => {
    try {
      const response = await apiClient.post('/auth/otp', { email, otp });
      console.log('OTP Verification Response:', response.data);
      const data = response.data;
      if (data.user) {
        return { user: data.user };
      } else if (data.data?.user) {
        return { user: data.data.user };
      } else if (data.message && data.user) {
        return { user: data.user };
      }
      throw new Error('Invalid OTP verification response: Missing user');
    } catch (error) {
      console.error('Error in verifyOtp:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error.response?.data?.message ? new Error(error.response.data.message) : error;
    }
  },

  login: async ({ email, password }) => {
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
    try {
      const response = await apiClient.get('/events');
      console.log('Get Events Response:', response.data); // Debug log
      // Normalize response to array
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error('Error in getEvents:', error);
      return []; // Fallback to empty array
    }
  },

  joinEvent: async (eventId) => {
    const response = await apiClient.post(`/events/${eventId}/participants`);
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
    try {
      const response = await apiClient.get('/accommodations');
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error('Error in getAccommodations:', error);
      return [];
    }
  },

  bookAccommodation: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  addComment: async (commentData) => {
    const response = await apiClient.post('/comments', commentData);
    return response.data;
  },

  getComments: async (postId, postType) => {
    const response = await apiClient.get(`/comments?postId=${postId}&postType=${postType}`);
    return response.data;
  },

  uploadMedia: async (postId, postType, mediaData) => {
    const formData = new FormData();
    formData.append('file', mediaData.file);
    formData.append('mediaType', mediaData.mediaType);
    const response = await apiClient.post(`/media?postId=${postId}&postType=${postType}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getMedia: async (postId, postType) => {
    const response = await apiClient.get(`/media?postId=${postId}&postType=${postType}`);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await apiClient.put('/users/me', userData);
    return response.data;
  },

  getBookings: async () => {
    try {
      const response = await apiClient.get('/bookings');
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error('Error in getBookings:', error);
      return [];
    }
  },
};

export default apiService;
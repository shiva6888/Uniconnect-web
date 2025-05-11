import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const getInitialUser = () => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing currentUser from localStorage:', error);
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(getInitialUser());
  const [userSignupPayload, setUserSignupPayload] = useState(null);
  const [otp, setOtp] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (currentUser !== null) {
      try {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } catch (error) {
        console.error('Error saving currentUser to localStorage:', error);
      }
    }
  }, [currentUser]);

  const login = (user) => {
    if (!user) {
      console.error('Invalid user during login:', user);
      return;
    }
    setCurrentUser(user);
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage during login:', error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setEvents([]);
    setAccommodations([]);
    setBookings([]);
    localStorage.removeItem('currentUser');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await apiService.getEvents();
      // Ensure response is an array
      const eventsArray = Array.isArray(response) ? response : response.data || [];
      setEvents(eventsArray);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAccommodations();
      const accommodationsArray = Array.isArray(response) ? response : response.data || [];
      setAccommodations(accommodationsArray);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      setAccommodations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await apiService.getBookings();
      const bookingsArray = Array.isArray(response) ? response : response.data || [];
      setBookings(bookingsArray);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {
    try {
      const response = await apiService.addEvent(eventData);
      setEvents((prev) => [...prev, response]);
      return { success: true, event: response };
    } catch (error) {
      console.error('Error adding event:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to add event' };
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await apiService.deleteEvent(eventId);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting event:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to delete event' };
    }
  };

  const joinEvent = async (eventId) => {
    try {
      const response = await apiService.joinEvent(eventId);
      return { success: true, participant: response };
    } catch (error) {
      console.error('Error joining event:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to join event' };
    }
  };

  const addAccommodation = async (accommodationData) => {
    try {
      const response = await apiService.addAccommodation(accommodationData);
      setAccommodations((prev) => [...prev, response]);
      return { success: true, accommodation: response };
    } catch (error) {
      console.error('Error adding accommodation:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to add accommodation' };
    }
  };

  const deleteAccommodation = async (accommodationId) => {
    try {
      await apiService.deleteAccommodation(accommodationId);
      setAccommodations((prev) => prev.filter((acc) => acc.id !== accommodationId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting accommodation:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to delete accommodation' };
    }
  };

  const bookAccommodation = async (bookingData) => {
    try {
      const response = await apiService.bookAccommodation(bookingData);
      setBookings((prev) => [...prev, response]);
      return { success: true, booking: response };
    } catch (error) {
      console.error('Error booking accommodation:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to book accommodation' };
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEvents();
      fetchAccommodations();
      fetchBookings();
    }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userSignupPayload,
        setUserSignupPayload,
        otp,
        setOtp,
        darkMode,
        toggleDarkMode,
        login,
        logout,
        events,
        accommodations,
        bookings,
        loading,
        fetchEvents,
        fetchAccommodations,
        fetchBookings,
        addEvent,
        deleteEvent,
        joinEvent,
        addAccommodation,
        deleteAccommodation,
        bookAccommodation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
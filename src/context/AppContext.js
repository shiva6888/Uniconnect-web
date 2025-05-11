// src/context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import apiService from '../apiService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
  const [registeredUsers, setRegisteredUsers] = useState(JSON.parse(localStorage.getItem('registeredUsers')) || []);
  const [userSignupPayload, setUserSignupPayload] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setEvents([]);
    setAccommodations([]);
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
      if (response.success) {
        const uniqueEvents = new Map();
        response.events.forEach(event => uniqueEvents.set(event.id, event));
        setEvents(Array.from(uniqueEvents.values()));
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAccommodations();
      if (response.success) {
        const uniqueAccommodations = new Map();
        response.accommodations.forEach(acc => uniqueAccommodations.set(acc.id, acc));
        setAccommodations(Array.from(uniqueAccommodations.values()));
      }
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {
    try {
      const response = await apiService.addEvent(eventData);
      if (response.success) {
        setEvents(prev => {
          if (prev.some(event => event.id === response.event.id)) {
            return prev;
          }
          return [...prev, response.event];
        });
      }
      return response;
    } catch (error) {
      console.error('Error adding event:', error);
      return { success: false, message: 'Failed to add event' };
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await apiService.deleteEvent(eventId);
      if (response.success) {
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
      }
      return response;
    } catch (error) {
      console.error('Error deleting event:', error);
      return { success: false, message: 'Failed to delete event' };
    }
  };

  const addAccommodation = async (accommodationData) => {
    try {
      const response = await apiService.addAccommodation(accommodationData);
      if (response.success) {
        setAccommodations((prev) => {
          if (prev.some((acc) => acc.id === response.accommodation.id)) {
            return prev;
          }
          return [...prev, response.accommodation];
        });
      }
      return response;
    } catch (error) {
      console.error('Error adding accommodation:', error);
      return { success: false, message: 'Failed to add accommodation' };
    }
  };

  const deleteAccommodation = async (accommodationId) => {
    try {
      const response = await apiService.deleteAccommodation(accommodationId);
      if (response.success) {
        setAccommodations((prev) => prev.filter((acc) => acc.id !== accommodationId));
      }
      return response;
    } catch (error) {
      console.error('Error deleting accommodation:', error);
      return { success: false, message: 'Failed to delete accommodation' };
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEvents();
      fetchAccommodations();
    }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        registeredUsers,
        setRegisteredUsers,
        userSignupPayload,
        setUserSignupPayload,
        darkMode,
        toggleDarkMode,
        login,
        logout,
        events,
        accommodations,
        loading,
        fetchEvents,
        fetchAccommodations,
        addEvent,
        deleteEvent,
        addAccommodation,
        deleteAccommodation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import StudentForm from './StudentForm';
import EventOrganiserForm from './EventOrganiserForm';
import AccommodationProviderForm from './AccommodationProviderForm';
import apiService from '../services/apiService';

function SignupPage() {
  const { setUserSignupPayload } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await apiService.signup(formData);
      setUserSignupPayload(formData);
      showSnackbar('Signup successful! Please verify OTP.', 'success');
      navigate('/otp');
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 4 }}>
          <Tab label="Student" />
          <Tab label="Event Organiser" />
          <Tab label="Accommodation Provider" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tab === 0 && <StudentForm onSubmit={handleSubmit} disabled={loading} />}
          {tab === 1 && <EventOrganiserForm onSubmit={handleSubmit} disabled={loading} />}
          {tab === 2 && <AccommodationProviderForm onSubmit={handleSubmit} disabled={loading} />}
        </Box>
      </Paper>
    </Container>
  );
}

export default SignupPage;
import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, RadioGroup, FormControlLabel, Radio, Button, Box } from '@mui/material';
import AccommodationProviderForm from './AccommodationProviderForm';
import EventOrganiserForm from './EventOrganiserForm';
import StudentForm from './StudentForm';
import { useNavigate } from 'react-router-dom';
import apiService from '../apiService';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
const backgroundImageUrl = '/signup.jpg'; // Example path

/**
 * SignupPage component for user registration.
 */
const SignupPage = () => {
  const { setUserSignupPayload, registeredUsers } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const [profileType, setProfileType] = useState('accommodationProvider');
  const navigate = useNavigate();

  const handleProfileTypeChange = (e) => setProfileType(e.target.value);

  /**
   * Submits signup form data.
   * For backend: Ensure OTP or token is returned.
   */
  const handleFormSubmit = async (formData) => {
    try {
      const response = await apiService.signup(formData, registeredUsers);
      if (response.success) {
        setUserSignupPayload(response.userData);
        showSnackbar('Signup successful! Verify your OTP.', 'success');
        navigate('/otp');
      } else {
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      showSnackbar('Failed to sign up', 'error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Adjust 64px based on your Header height if needed
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        py: 4, // Add some padding top/bottom
      }}
    >
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>Sign Up</Typography>
        <RadioGroup row value={profileType} onChange={handleProfileTypeChange} sx={{ justifyContent: 'center', mb: 3 }}>
          <FormControlLabel value="accommodationProvider" control={<Radio />} label="Accommodation Provider" />
          <FormControlLabel value="eventOrganiser" control={<Radio />} label="Event Organiser" />
          <FormControlLabel value="student" control={<Radio />} label="Student" />
        </RadioGroup>
        {profileType === 'accommodationProvider' && <AccommodationProviderForm onSubmit={handleFormSubmit} />}
        {profileType === 'eventOrganiser' && <EventOrganiserForm onSubmit={handleFormSubmit} />}
        {profileType === 'student' && <StudentForm onSubmit={handleFormSubmit} />}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Button onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Paper>
    </Container>
    </Box>
  );
};

export default SignupPage;
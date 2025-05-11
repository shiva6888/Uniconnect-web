import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import apiService from '../apiService';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';

/**
 * OtpVerification component for verifying signup OTP.
 */
function OtpVerification() {
  const { userSignupPayload, setRegisteredUsers, registeredUsers } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const [userOtp, setUserOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) setUserOtp(value);
  };

  /**
   * Verifies OTP and registers user.
   * For backend: Add resend OTP feature.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userOtp.length !== 4) {
      setError('Enter a 4-digit OTP');
      showSnackbar('Enter a 4-digit OTP', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.verifyOtp(userSignupPayload.email, userOtp);
      if (response.success) {
        const newUser = { ...userSignupPayload, id: Date.now().toString() };
        setRegisteredUsers((prev) => [...prev, newUser]);
        showSnackbar('OTP verified! Please log in.', 'success');
        navigate('/login', { state: { message: 'Registration successful!' } });
      } else {
        setError(response.message);
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      setError('Failed to verify OTP');
      showSnackbar('Failed to verify OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!userSignupPayload) return <Navigate to="/signup" />;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>Verify OTP</Typography>
        <Typography>Enter the 4-digit code sent to {userSignupPayload.email}</Typography>
        <TextField
          label="OTP"
          value={userOtp}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
          error={!!error}
          helperText={error}
          inputProps={{ maxLength: 4 }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </Paper>
    </Container>
  );
}

export default OtpVerification;
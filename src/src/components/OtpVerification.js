import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import apiService from '../services/apiService';

function OtpVerification() {
  const { userSignupPayload, login, setUserSignupPayload } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('OTP is required');
      showSnackbar('OTP is required', 'error');
      return;
    }
    if (!userSignupPayload) {
      setError('No signup data available. Please sign up again.');
      showSnackbar('No signup data available', 'error');
      navigate('/signup');
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.verifyOtp({ email: userSignupPayload.email, otp });
      console.log('OTP Verification Response in Component:', response); // Debug log
      if (!response.user) {
        throw new Error('Invalid response from server: Missing user');
      }
      login(response.user); // No token passed
      setUserSignupPayload(null); // Clear signup payload after successful verification
      showSnackbar('Account verified!', 'success');
      navigate('/');
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error.message || 'Invalid OTP. Please try again.';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!userSignupPayload) {
    navigate('/signup');
    return null;
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Verify OTP
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Enter the OTP sent to {userSignupPayload.email}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="OTP"
            value={otp}
            onChange={(e) => { setOtp(e.target.value); setError(''); }}
            error={!!error}
            helperText={error}
            fullWidth
            required
            disabled={loading}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default OtpVerification;
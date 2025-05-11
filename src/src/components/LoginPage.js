import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import apiService from '../services/apiService';

function LoginPage() {
  const { login } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await apiService.login(formData);
      if (!response.user) {
        throw new Error('Invalid response: Missing user');
      }
      login(response.user); // No token
      showSnackbar('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Typography align="center">
            Don't have an account? <Link component={RouterLink} to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
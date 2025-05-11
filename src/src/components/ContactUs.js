import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Grid, CardMedia } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import apiService from '../services/apiService';

function ContactUs() {
  const { showSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Email is not valid';
    if (!message.trim()) tempErrors.message = 'Message cannot be empty';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showSnackbar('Please fix the errors in the form', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.submitFeedback({ name, email, text: message });
      if (response.success) {
        setName('');
        setEmail('');
        setMessage('');
        showSnackbar('Message sent successfully!', 'success');
      } else {
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      showSnackbar('An error occurred while sending the message', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8.4}>
          <Box sx={{ width: '100%', height: { xs: 300, md: 500 }, overflow: 'hidden', borderRadius: 2 }}>
            <CardMedia
              component="img"
              image="/contactus.jpg"
              alt="Contact Us"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3.6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3 }}>
              Have questions or feedback? Fill out the form below to get in touch.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                    disabled={loading}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Your Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={loading}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Your Message"
                    multiline
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.message}
                    helperText={errors.message}
                    disabled={loading}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactUs;
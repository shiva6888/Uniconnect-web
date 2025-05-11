// src/components/ContactUs.js
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Grid, CardMedia } from '@mui/material';
// Optional: Import useSnackbar if you want to show a confirmation message
import { useSnackbar } from './SnackbarProvider'; // Uncomment if using snackbar

/**
 * ContactUsPage component for users to send messages.
 * Displays an image on the left and the contact form on the right.
 */
function ContactUs() {
  // Optional: Initialize snackbar hook
  const { showSnackbar } = useSnackbar(); // Uncomment if using snackbar

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Basic validation for the contact form.
   */
  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Basic email format check
      tempErrors.email = 'Email is not valid';
    }
    if (!message.trim()) tempErrors.message = 'Message cannot be empty';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /**
   * Handles form submission.
   * Replace console.log with an actual API call to send the message.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showSnackbar('Please fix the errors in the form', 'error'); // Use snackbar
      return;
    }
    setLoading(true);
    console.log('Submitting Contact Form:', { name, email, message });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // --- Replace with actual API call ---
    // try {
    //   // const response = await apiService.submitContactMessage({ name, email, message });
    //   // if (response.success) {
    //   //   setName('');
    //   //   setEmail('');
    //   //   setMessage('');
    //   //   showSnackbar('Message sent successfully!', 'success');
    //   // } else {
    //   //   showSnackbar(response.message || 'Failed to send message', 'error');
    //   // }
    // } catch (error) {
    //   showSnackbar('An error occurred while sending the message', 'error');
    // } finally {
    //   setLoading(false);
    // }
    // --- End of placeholder ---

    // For static demo:
    setName('');
    setEmail('');
    setMessage('');
    setLoading(false);
    // alert('Message Sent, Our Team will connect with you shortly'); // Replace with snackbar if preferred
    showSnackbar('Message sent successfully! (Demo)', 'success'); // Use snackbar
  };

  return (
    // Use a wider container or remove maxWidth for full width
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4} alignItems="center"> {/* Use Grid container */}

        {/* Left Column: Image (70%) */}
        <Grid item xs={12} md={8.4}> {/* md={8.4} is 70% of 12 columns */}
          <Box sx={{ width: '100%', height: { xs: 300, md: 500 }, overflow: 'hidden', borderRadius: 2 }}>
            <CardMedia
              component="img"
              // Replace with your actual image URL
              image="/contactus.jpg"
              alt="Contact Us "
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>

        {/* Right Column: Form (30%) */}
        <Grid item xs={12} md={3.6}> {/* md={3.6} is 30% of 12 columns */}
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
                    size="small" // Optional: make fields smaller
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
                    size="small" // Optional: make fields smaller
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
                    size="small" // Optional: make fields smaller
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

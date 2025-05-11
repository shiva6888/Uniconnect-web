import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import apiService from '../services/apiService';
import { useSnackbar } from './SnackbarProvider';

function FeedbackPage() {
  const { showSnackbar } = useSnackbar();
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      showSnackbar('Feedback cannot be empty', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await apiService.submitFeedback({ text: feedback });
      if (response.success) {
        setFeedback('');
        showSnackbar('Feedback submitted successfully!', 'success');
      } else {
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      showSnackbar('Failed to submit feedback', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Feedback
        </Typography>
        <Typography variant="body1" gutterBottom>
          We’d love to hear your thoughts!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Your Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default FeedbackPage;
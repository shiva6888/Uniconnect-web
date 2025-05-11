import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * NotFoundPage component for 404 errors.
 */
function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Container>
  );
}

export default NotFoundPage;
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
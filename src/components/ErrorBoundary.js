import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * ErrorBoundaryWrapper component to catch and handle runtime errors.
 */
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback navigate={this.props.navigate} />;
    }
    return this.props.children;
  }
}

/**
 * Fallback UI for when an error occurs.
 */
function ErrorFallback({ navigate }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" gutterBottom>
        We’re sorry for the inconvenience. Please try again.
      </Typography>
      <Button variant="contained" onClick={() => { navigate('/'); window.location.reload(); }}>
        Go Home
      </Button>
    </Box>
  );
}

/**
 * Wrapper to provide navigate prop from react-router-dom.
 */
function ErrorBoundaryWrapper({ children }) {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate}>{children}</ErrorBoundary>;
}

export default ErrorBoundaryWrapper;
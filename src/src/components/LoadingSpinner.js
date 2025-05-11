import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;
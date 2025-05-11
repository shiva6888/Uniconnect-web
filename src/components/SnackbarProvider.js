import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * SnackbarContext for managing global snackbar notifications.
 */
const SnackbarContext = createContext();

/**
 * SnackbarProvider component to wrap the app and provide snackbar functionality.
 */
export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const showSnackbar = (msg, sev = 'success') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

/**
 * Hook to use the snackbar in components.
 */
export function useSnackbar() {
  return useContext(SnackbarContext);
}
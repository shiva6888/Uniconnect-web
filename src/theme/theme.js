import { createTheme } from '@mui/material/styles';

/**
 * Light theme configuration for the app.
 */
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    error: { main: '#d32f2f' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#333333', secondary: '#666666' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, padding: '10px 20px' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiTextField: { styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } } } },
  },
});

/**
 * Dark theme configuration for the app.
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#ce93d8' },
    error: { main: '#f44336' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, padding: '10px 20px' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiTextField: { styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } } } },
  },
});
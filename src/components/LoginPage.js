import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box, // Box is used for the background wrapper
  Avatar,
  Alert,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from 'framer-motion';
import FormTextField from './FormTextField';
import apiService from '../apiService';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';

// --- IMPORTANT: Replace with the actual path to your background image ---
// If the image is in your `public` folder, use '/image-name.jpg'
// If you import it, use the imported variable: `import bgImage from './assets/image-name.jpg';`
const backgroundImageUrl = '/loginPAge.jpg'; // Example path

/**
 * LoginPage component for user authentication with enhanced design and background image.
 */
function LoginPage() {
  const { login, registeredUsers } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      const message = location.state.message;
      navigate(location.pathname, { replace: true, state: {} });
      showSnackbar(message, 'success');
    }
  }, [location.state, showSnackbar, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await apiService.login(email, password, registeredUsers);
      if (response.success) {
        login(response.user);
        showSnackbar('Login successful!', 'success');
        navigate(response.user.profileType === 'student' ? '/dashboard' : '/');
      } else {
        setError(response.message);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to log in. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    // Box acting as the background container
    <Box
      sx={{
        minHeight: 'auto', // Adjust 64px based on your Header height if needed
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'Adjust',
        backgroundRepeat: 'no-repeat',
        py: 4, // Add some padding top/bottom
      }}
    >
      <Container component="main" maxWidth="xs">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Paper
            elevation={6}
            sx={{
              // Removed marginTop, centering is handled by the outer Box
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,
              borderRadius: 2,
              // Optional: Add slight transparency to Paper if needed over complex backgrounds
              // backgroundColor: 'rgba(255, 255, 255, 0.95)', // Example for light mode
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" gutterBottom>
              Sign in
            </Typography>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormTextField
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    autoComplete="email"
                    autoFocus
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    size="large"
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" align="center">
                    Don't have an account?{' '}
                    <Button
                      onClick={() => navigate('/signup')}
                      disabled={loading}
                      sx={{ textTransform: 'none' }}
                    >
                      Sign Up
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default LoginPage;

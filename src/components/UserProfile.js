// src/components/UserProfile.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Grid,
  TextField,
  CircularProgress,
  Divider,
  Tooltip,
  IconButton,
  useTheme, // Import useTheme hook
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, PhotoCamera } from '@mui/icons-material'; // Icons
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import { validateURL } from '../utils/validationUtils';

/**
 * UserProfile component for viewing and updating user details.
 */
function UserProfile() {
  const { currentUser, setCurrentUser, registeredUsers, setRegisteredUsers } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme(); // Get the current theme

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState('');

  // State for editing mode and loading
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form fields when currentUser changes or component mounts
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setProfilePictureURL(currentUser.profilePictureURL || '');
      setIsEditing(false); // Start in view mode
      setErrors({}); // Clear errors on user change
    }
  }, [currentUser, navigate]);

  /**
   * Validates profile update form.
   */
  const validateForm = () => {
    const tempErrors = {};
    if (!firstName.trim()) tempErrors.firstName = 'First name is required';
    if (!lastName.trim()) tempErrors.lastName = 'Last name is required';
    if (profilePictureURL && !validateURL(profilePictureURL)) {
      tempErrors.profilePictureURL = 'Invalid URL format. Please provide a direct link to an image.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /**
   * Handles entering edit mode.
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Handles canceling edits and reverting changes.
   */
  const handleCancel = () => {
    // Revert fields to current user data
    setFirstName(currentUser.firstName || '');
    setLastName(currentUser.lastName || '');
    setProfilePictureURL(currentUser.profilePictureURL || '');
    setIsEditing(false);
    setErrors({}); // Clear errors
  };

  /**
   * Updates user profile.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showSnackbar('Please fix the errors in the form', 'error');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // --- Replace with actual API call (e.g., PATCH /users/me) ---
      const updatedUser = { ...currentUser, firstName, lastName, profilePictureURL };
      const userIndex = registeredUsers.findIndex((user) => user.id === currentUser.id);

      if (userIndex !== -1) {
        const updatedUsers = [...registeredUsers];
        updatedUsers[userIndex] = updatedUser;
        setRegisteredUsers(updatedUsers); // Update global state if needed
        setCurrentUser(updatedUser); // Update context
        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Update local storage
        showSnackbar('Profile updated successfully!', 'success');
        setIsEditing(false); // Exit edit mode
      } else {
        showSnackbar('Error: User not found locally', 'error'); // Should not happen if logged in
      }
      // --- End of placeholder ---

    } catch (error) {
      console.error("Profile update error:", error);
      showSnackbar('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Render loading or redirect if no user
  if (!currentUser) {
    return null; // Or a loading indicator
  }

  // Define styles based on edit mode for better visual distinction
  const fieldVariant = isEditing ? "outlined" : "filled";
  const fieldBackgroundColor = !isEditing ? theme.palette.action.hover : undefined; // Subtle background for read-only

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> {/* Changed to lg for more space */}
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        {/* --- Header --- */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}` // Divider line
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'medium' }}>
            My Profile
          </Typography>
          {!isEditing && (
            <Tooltip title="Edit Profile">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                size="medium"
              >
                Edit
              </Button>
            </Tooltip>
          )}
        </Box>

        <Grid container spacing={{ xs: 3, md: 5 }}> {/* Increased spacing */}
          {/* --- Avatar Section (Left Column) --- */}
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Avatar
                src={profilePictureURL || currentUser?.profilePictureURL}
                alt={`${firstName} ${lastName}`}
                sx={{
                  width: { xs: 120, sm: 150 }, // Responsive size
                  height: { xs: 120, sm: 150 },
                  mx: 'auto',
                  mb: 2,
                  fontSize: '4rem',
                  bgcolor: theme.palette.secondary.main, // Use secondary color for fallback background
                  color: theme.palette.secondary.contrastText
                }}
              >
                {firstName?.[0]?.toUpperCase()}{lastName?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {currentUser.firstName} {currentUser.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {currentUser.email}
              </Typography>

              {isEditing && (
                <TextField
                  label="Profile Picture URL"
                  value={profilePictureURL}
                  onChange={(e) => setProfilePictureURL(e.target.value)}
                  error={!!errors.profilePictureURL}
                  helperText={errors.profilePictureURL || 'Enter a valid image URL'}
                  fullWidth
                  size="small"
                  margin="normal"
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <PhotoCamera sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                />
              )}
            </Paper>
          </Grid>

          {/* --- Form Section (Right Column) --- */}
          <Grid item xs={12} md={8}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Personal Information Section */}
              <Typography variant="h6" component="div" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Personal Information
              </Typography>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      disabled={!isEditing || loading}
                      InputProps={{ readOnly: !isEditing }}
                      variant={fieldVariant}
                      sx={{ backgroundColor: fieldBackgroundColor }} // Subtle background when read-only
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      disabled={!isEditing || loading}
                      InputProps={{ readOnly: !isEditing }}
                      variant={fieldVariant}
                      sx={{ backgroundColor: fieldBackgroundColor }}
                    />
                  </Grid>
                  {/* Add more personal fields here if needed */}
                </Grid>
              </Paper>

              {/* Account Details Section */}
              <Typography variant="h6" component="div" sx={{ mb: 2, color: theme.palette.primary.main }}>
                Account Details
              </Typography>
              <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Email Address"
                      value={currentUser.email || ''}
                      fullWidth
                      disabled // Email usually shouldn't be editable
                      variant="filled" // Always filled for non-editable look
                      InputProps={{ readOnly: true }}
                      helperText="Email cannot be changed."
                    />
                  </Grid>
                  {/* Add other non-editable fields like 'User Type', 'Joined Date' etc. */}
                   <Grid item xs={12} sm={6}>
                     <TextField
                      label="User Type"
                      value={currentUser.profileType || 'N/A'} // Example
                      fullWidth
                      disabled
                      variant="filled"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                      label="Member Since"
                      value={currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'} // Example
                      fullWidth
                      disabled
                      variant="filled"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Action Buttons */}
              {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary" // Use secondary for cancel
                    onClick={handleCancel}
                    disabled={loading}
                    startIcon={<CancelIcon />}
                    size="large"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary" // Use primary for save
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    size="large"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserProfile;

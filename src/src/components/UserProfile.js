import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, Grid } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import apiService from '../services/apiService';
import { validatePhoneNumber, validateEmail, validateURL } from '../utils/validationUtils';

function UserProfile() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber || '',
    profilePictureURL: currentUser?.profilePictureURL || '',
    socialMediaLinks: currentUser?.socialMediaLinks || { linkedin: '', twitter: '' },
    universityName: currentUser?.universityName || '',
    studentId: currentUser?.studentId || '',
    preferences: currentUser?.preferences || '',
    organisationName: currentUser?.organisationName || '',
    businessName: currentUser?.businessName || '',
    companyWebsiteURL: currentUser?.companyWebsiteURL || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!formData.email || !validateEmail(formData.email)) tempErrors.email = 'Valid email is required';
    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) tempErrors.phoneNumber = 'Valid phone is required';
    if (formData.profilePictureURL && !validateURL(formData.profilePictureURL)) tempErrors.profilePictureURL = 'Invalid URL';
    if (formData.socialMediaLinks.linkedin && !validateURL(formData.socialMediaLinks.linkedin)) tempErrors.linkedin = 'Invalid LinkedIn URL';
    if (formData.socialMediaLinks.twitter && !validateURL(formData.socialMediaLinks.twitter)) tempErrors.twitter = 'Invalid Twitter URL';
    if (currentUser.profileType === 'student') {
      if (!formData.universityName) tempErrors.universityName = 'University name is required';
      if (!formData.studentId) tempErrors.studentId = 'Student ID is required';
    }
    if (currentUser.profileType === 'eventOrganiser' && !formData.organisationName) tempErrors.organisationName = 'Organisation name is required';
    if (currentUser.profileType === 'accommodationProvider' && !formData.businessName) tempErrors.businessName = 'Business name is required';
    if ((currentUser.profileType === 'eventOrganiser' || currentUser.profileType === 'accommodationProvider') && !formData.companyWebsiteURL) {
      tempErrors.companyWebsiteURL = 'Company website URL is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('socialMediaLinks')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialMediaLinks: { ...prev.socialMediaLinks, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await apiService.updateProfile(formData);
      setCurrentUser(response.user);
      setEditMode(false);
      showSnackbar('Profile updated successfully!', 'success');
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Your Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={!editMode || loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
                disabled={!editMode || loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email}
                disabled={!editMode || loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                disabled={!editMode || loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Profile Picture URL (Optional)"
                name="profilePictureURL"
                value={formData.profilePictureURL}
                onChange={handleChange}
                fullWidth
                error={!!errors.profilePictureURL}
                helperText={errors.profilePictureURL}
                disabled={!editMode || loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="LinkedIn URL (Optional)"
                name="socialMediaLinks.linkedin"
                value={formData.socialMediaLinks.linkedin}
                onChange={handleChange}
                fullWidth
                error={!!errors.linkedin}
                helperText={errors.linkedin}
                disabled={!editMode || loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Twitter URL (Optional)"
                name="socialMediaLinks.twitter"
                value={formData.socialMediaLinks.twitter}
                onChange={handleChange}
                fullWidth
                error={!!errors.twitter}
                helperText={errors.twitter}
                disabled={!editMode || loading}
              />
            </Grid>
            {currentUser.profileType === 'student' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="University Name"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.universityName}
                    helperText={errors.universityName}
                    disabled={!editMode || loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Student ID"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.studentId}
                    helperText={errors.studentId}
                    disabled={!editMode || loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Preferences"
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={!editMode || loading}
                  />
                </Grid>
              </>
            )}
            {currentUser.profileType === 'eventOrganiser' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Organisation Name"
                    name="organisationName"
                    value={formData.organisationName}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.organisationName}
                    helperText={errors.organisationName}
                    disabled={!editMode || loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Company Website URL"
                    name="companyWebsiteURL"
                    value={formData.companyWebsiteURL}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.companyWebsiteURL}
                    helperText={errors.companyWebsiteURL}
                    disabled={!editMode || loading}
                  />
                </Grid>
              </>
            )}
            {currentUser.profileType === 'accommodationProvider' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.businessName}
                    helperText={errors.businessName}
                    disabled={!editMode || loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Company Website URL"
                    name="companyWebsiteURL"
                    value={formData.companyWebsiteURL}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.companyWebsiteURL}
                    helperText={errors.companyWebsiteURL}
                    disabled={!editMode || loading}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              {editMode ? (
                <>
                  <Button type="submit" variant="contained" disabled={loading} sx={{ mr: 2 }}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="outlined" onClick={() => setEditMode(false)} disabled={loading}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserProfile;
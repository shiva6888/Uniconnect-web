// src/components/EventOrganiserForm.js
import React, { useState } from 'react';
import { Button, Grid, FormControlLabel, Checkbox, Typography } from '@mui/material';
import FormTextField from './FormTextField';
import { validatePhoneNumber, validateEmail, validatePassword, validateURL } from '../utils/validationUtils';

const EventOrganiserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    profileType: 'eventOrganiser',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    organisationName: '',
    companyWebsiteURL: '',
    socialMediaLinks: { linkedin: '', twitter: '' },
    profilePictureURL: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!formData.email || !validateEmail(formData.email)) tempErrors.email = 'Valid email is required';
    if (!formData.password || !validatePassword(formData.password)) tempErrors.password = 'Password must be 8+ chars with letters/numbers';
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords must match';
    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) tempErrors.phoneNumber = 'Valid phone is required';
    if (!formData.organisationName) tempErrors.organisationName = 'Organisation name is required';
    if (!formData.companyWebsiteURL || !validateURL(formData.companyWebsiteURL)) tempErrors.companyWebsiteURL = 'Valid company website URL is required';
    if (formData.socialMediaLinks.linkedin && !validateURL(formData.socialMediaLinks.linkedin)) tempErrors.linkedin = 'Invalid LinkedIn URL';
    if (formData.socialMediaLinks.twitter && !validateURL(formData.socialMediaLinks.twitter)) tempErrors.twitter = 'Invalid Twitter URL';
    if (formData.profilePictureURL && !validateURL(formData.profilePictureURL)) tempErrors.profilePictureURL = 'Invalid URL';
    if (!formData.termsAccepted) tempErrors.termsAccepted = 'You must accept the terms and conditions';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('socialMediaLinks')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialMediaLinks: { ...prev.socialMediaLinks, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}><FormTextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required error={errors.firstName} helperText={errors.firstName} /></Grid>
        <Grid item xs={6}><FormTextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required error={errors.lastName} helperText={errors.lastName} /></Grid>
        <Grid item xs={12}><FormTextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required error={errors.email} helperText={errors.email} /></Grid>
        <Grid item xs={12}><FormTextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required error={errors.password} helperText={errors.password} /></Grid>
        <Grid item xs={12}><FormTextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required error={errors.confirmPassword} helperText={errors.confirmPassword} /></Grid>
        <Grid item xs={12}><FormTextField label="Phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required error={errors.phoneNumber} helperText={errors.phoneNumber || '+1234567890'} /></Grid>
        <Grid item xs={12}><FormTextField label="Organisation Name" name="organisationName" value={formData.organisationName} onChange={handleChange} required error={errors.organisationName} helperText={errors.organisationName} /></Grid>
        <Grid item xs={12}><FormTextField label="Company Website URL" name="companyWebsiteURL" value={formData.companyWebsiteURL} onChange={handleChange} required error={errors.companyWebsiteURL} helperText={errors.companyWebsiteURL || 'e.g., https://example.com'} /></Grid>
        <Grid item xs={12}><FormTextField label="LinkedIn URL (Optional)" name="socialMediaLinks.linkedin" value={formData.socialMediaLinks.linkedin} onChange={handleChange} error={errors.linkedin} helperText={errors.linkedin || 'e.g., https://linkedin.com/in/username'} /></Grid>
        <Grid item xs={12}><FormTextField label="Twitter URL (Optional)" name="socialMediaLinks.twitter" value={formData.socialMediaLinks.twitter} onChange={handleChange} error={errors.twitter} helperText={errors.twitter || 'e.g., https://twitter.com/username'} /></Grid>
        <Grid item xs={12}><FormTextField label="Profile Picture URL (Optional)" name="profilePictureURL" value={formData.profilePictureURL} onChange={handleChange} error={errors.profilePictureURL} helperText={errors.profilePictureURL || 'e.g., https://example.com/image.jpg'} /></Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />}
            label="I accept the terms and conditions"
          />
          {errors.termsAccepted && <Typography color="error">{errors.termsAccepted}</Typography>}
        </Grid>
        <Grid item xs={12}><Button type="submit" variant="contained" fullWidth>Sign Up</Button></Grid>
      </Grid>
    </form>
  );
};

export default EventOrganiserForm;
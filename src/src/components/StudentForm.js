import React, { useState } from 'react';
import { Button, Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';
import FormTextField from './FormTextField';
import { validatePhoneNumber, validateEmail, validatePassword } from '../utils/validationUtils';

const StudentForm = ({ onSubmit, disabled }) => {
  const [formData, setFormData] = useState({
    profileType: 'student',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    universityName: '',
    studentId: '',
    preferences: '',
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
    if (!formData.universityName) tempErrors.universityName = 'University name is required';
    if (!formData.studentId) tempErrors.studentId = 'Student ID is required';
    if (!formData.termsAccepted) tempErrors.termsAccepted = 'Accept terms';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            error={errors.firstName}
            helperText={errors.firstName}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            error={errors.lastName}
            helperText={errors.lastName}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
            helperText={errors.email}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
            helperText={errors.password}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
            helperText={errors.confirmPassword}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label="Phone"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            error={errors.phoneNumber}
            helperText={errors.phoneNumber || '+1234567890'}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label="University Name"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            required
            error={errors.universityName}
            helperText={errors.universityName}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label="Student ID"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            error={errors.studentId}
            helperText={errors.studentId}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            label="Preferences (Optional)"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            multiline
            rows={3}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} disabled={disabled} />}
            label="I accept the terms"
          />
          {errors.termsAccepted && <Typography color="error">{errors.termsAccepted}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth disabled={disabled}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentForm;
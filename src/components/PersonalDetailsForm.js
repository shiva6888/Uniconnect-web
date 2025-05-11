// src/components/PersonalDetailsForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

function PersonalDetailsForm({ onNext, initialData }) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Basic validation feedback removal on change
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = formData.firstName ? "" : "First name is required.";
    tempErrors.lastName = formData.lastName ? "" : "Last name is required.";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid.";
    // Add more validation as needed (e.g., phone format)
    setErrors(tempErrors);
    // Return true if form is valid (no error messages)
    return Object.values(tempErrors).every(x => x === "");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onNext(formData); // Pass data to the parent component
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Your Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number (Optional)"
            fullWidth
            autoComplete="tel"
            variant="standard"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          type="submit" // Use type="submit" to trigger form onSubmit
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default PersonalDetailsForm;

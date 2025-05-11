import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';

function AddAccommodation() {
  const { addAccommodation, currentUser } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    address: '',
    zipCode: '',
    type: '',
    capacity: '',
    price: '',
    priceDuration: 'per month',
    availabilityStatus: true,
    contactNumber: '',
    email: '',
    rating: '',
    provider: { id: currentUser?.id || '' },
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.title) tempErrors.title = 'Title is required';
    if (!formData.description) tempErrors.description = 'Description is required';
    if (!formData.location) tempErrors.location = 'Location is required';
    if (!formData.address) tempErrors.address = 'Address is required';
    if (!formData.zipCode) {
      tempErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      tempErrors.zipCode = 'Invalid zip code format (e.g., 12345 or 12345-6789)';
    }
    if (!formData.type) tempErrors.type = 'Type is required';
    if (!formData.capacity || formData.capacity <= 0) tempErrors.capacity = 'Valid capacity is required';
    if (!formData.price || formData.price <= 0) tempErrors.price = 'Valid price is required';
    if (!formData.contactNumber) tempErrors.contactNumber = 'Contact number is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Valid email is required';
    }
    if (!formData.provider.id) tempErrors.provider = 'Provider ID is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' || name === 'rating' ? Number(value) || '' : value,
      provider: name === 'providerId' ? { id: value } : prev.provider,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showSnackbar('Please fix form errors', 'error');
      return;
    }
    try {
      const result = await addAccommodation(formData);
      if (result.success) {
        showSnackbar('Accommodation added successfully!', 'success');
        setFormData({
          title: '',
          description: '',
          location: '',
          address: '',
          zipCode: '',
          type: '',
          capacity: '',
          price: '',
          priceDuration: 'per month',
          availabilityStatus: true,
          contactNumber: '',
          email: '',
          rating: '',
          provider: { id: currentUser?.id || '' },
        });
      } else {
        showSnackbar(result.message || 'Failed to add accommodation', 'error');
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to add accommodation';
      showSnackbar(errorMessage, 'error');
      if (error.message.includes('zip code')) {
        setErrors((prev) => ({ ...prev, zipCode: errorMessage }));
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Accommodation
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            rows={4}
            required
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
            fullWidth
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
            required
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
            fullWidth
            required
          />
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            error={!!errors.type}
            helperText={errors.type}
            fullWidth
            required
          />
          <TextField
            label="Capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            error={!!errors.capacity}
            helperText={errors.capacity}
            fullWidth
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            fullWidth
            required
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            error={!!errors.contactNumber}
            helperText={errors.contactNumber}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />
          <TextField
            label="Provider ID"
            name="providerId"
            value={formData.provider.id}
            onChange={handleChange}
            error={!!errors.provider}
            helperText={errors.provider}
            fullWidth
            required
            disabled={!!currentUser?.id}
          />
          <Button type="submit" variant="contained" disabled={!currentUser}>
            Add Accommodation
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddAccommodation;
import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useDialog } from './DialogManager';
import { useSnackbar } from './SnackbarProvider';
import { AppContext } from '../context/AppContext';
import apiService from '../services/apiService';

function AddItemDialog() {
  const { dialogState, closeDialog } = useDialog();
  const { currentUser, addEvent, addAccommodation } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    eventType: '',
    contactEmail: '',
    contactNumber: '',
    registrationLink: '',
  });

  const [accommodationData, setAccommodationData] = useState({
    title: '',
    description: '',
    location: '',
    address: '',
    zipCode: '',
    type: '',
    capacity: '',
    price: '',
    priceDuration: '',
    contactNumber: '',
    email: '',
    availabilityStatus: true,
  });

  const [mediaFile, setMediaFile] = useState(null);

  const { isOpen, dialogType } = dialogState;
  const profileType = currentUser?.profileType;

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccommodationChange = (e) => {
    const { name, value } = e.target;
    setAccommodationData((prev) => ({ ...prev, [name]: name === 'availabilityStatus' ? value === 'true' : value }));
  };

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const validateEvent = () => {
    return eventData.title && eventData.description && eventData.location && eventData.startDate && eventData.endDate && eventData.maxParticipants;
  };

  const validateAccommodation = () => {
    return accommodationData.title && accommodationData.location && accommodationData.address && accommodationData.type && accommodationData.capacity && accommodationData.price && accommodationData.priceDuration;
  };

  const handleAddEvent = async () => {
    if (!validateEvent()) {
      showSnackbar('All required fields must be filled', 'error');
      return;
    }
    try {
      const response = await addEvent({ ...eventData, organiserId: currentUser.id });
      if (response.success && mediaFile) {
        await apiService.uploadMedia(response.event.id, 'EVENT', { file: mediaFile, mediaType: 'IMAGE' });
      }
      if (response.success) {
        setEventData({ title: '', description: '', location: '', startDate: '', endDate: '', maxParticipants: '', eventType: '', contactEmail: '', contactNumber: '', registrationLink: '' });
        setMediaFile(null);
        closeDialog();
        showSnackbar('Event added!', 'success');
      } else {
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      showSnackbar('Error adding event: ' + error.message, 'error');
    }
  };

  const handleAddAccommodation = async () => {
    if (!validateAccommodation()) {
      showSnackbar('All required fields must be filled', 'error');
      return;
    }
    try {
      const response = await addAccommodation({ ...accommodationData, providerId: currentUser.id });
      if (response.success && mediaFile) {
        await apiService.uploadMedia(response.accommodation.id, 'ACCOMMODATION', { file: mediaFile, mediaType: 'IMAGE' });
      }
      if (response.success) {
        setAccommodationData({ title: '', description: '', location: '', address: '', zipCode: '', type: '', capacity: '', price: '', priceDuration: '', contactNumber: '', email: '', availabilityStatus: true });
        setMediaFile(null);
        closeDialog();
        showSnackbar('Accommodation added!', 'success');
      } else {
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      showSnackbar('Error adding accommodation: ' + error.message, 'error');
    }
  };

  if (!isOpen || dialogType !== 'addItem' || !currentUser) return null;

  return (
    <Dialog open={isOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{profileType === 'eventOrganiser' ? 'Add New Event' : 'Add New Accommodation'}</DialogTitle>
      <DialogContent>
        {profileType === 'eventOrganiser' ? (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}><TextField label="Title" name="title" value={eventData.title} onChange={handleEventChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Description" name="description" value={eventData.description} onChange={handleEventChange} fullWidth multiline rows={3} required /></Grid>
            <Grid item xs={12}><TextField label="Location" name="location" value={eventData.location} onChange={handleEventChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Start Date" name="startDate" type="datetime-local" value={eventData.startDate} onChange={handleEventChange} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12}><TextField label="End Date" name="endDate" type="datetime-local" value={eventData.endDate} onChange={handleEventChange} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12}><TextField label="Max Participants" name="maxParticipants" type="number" value={eventData.maxParticipants} onChange={handleEventChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Event Type" name="eventType" value={eventData.eventType} onChange={handleEventChange} fullWidth /></Grid>
            <Grid item xs={12}><TextField label="Contact Email" name="contactEmail" type="email" value={eventData.contactEmail} onChange={handleEventChange} fullWidth /></Grid>
            <Grid item xs={12}><TextField label="Contact Number" name="contactNumber" value={eventData.contactNumber} onChange={handleEventChange} fullWidth /></Grid>
            <Grid item xs={12}><TextField label="Registration Link" name="registrationLink" value={eventData.registrationLink} onChange={handleEventChange} fullWidth /></Grid>
            <Grid item xs={12}><TextField type="file" onChange={handleFileChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}><TextField label="Title" name="title" value={accommodationData.title} onChange={handleAccommodationChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Description" name="description" value={accommodationData.description} onChange={handleAccommodationChange} fullWidth multiline rows={3} /></Grid>
            <Grid item xs={12}><TextField label="Location" name="location" value={accommodationData.location} onChange={handleAccommodationChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Address" name="address" value={accommodationData.address} onChange={handleAccommodationChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Zip Code" name="zipCode" value={accommodationData.zipCode} onChange={handleAccommodationChange} fullWidth /></Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select name="type" value={accommodationData.type} onChange={handleAccommodationChange} required>
                  <MenuItem value="APARTMENT">Apartment</MenuItem>
                  <MenuItem value="HOUSE">House</MenuItem>
                  <MenuItem value="ROOM">Room</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}><TextField label="Capacity" name="capacity" type="number" value={accommodationData.capacity} onChange={handleAccommodationChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Price" name="price" type="number" value={accommodationData.price} onChange={handleAccommodationChange} fullWidth required /></Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Price Duration</InputLabel>
                <Select name="priceDuration" value={accommodationData.priceDuration} onChange={handleAccommodationChange} required>
                  <MenuItem value="DAY">Day</MenuItem>
                  <MenuItem value="WEEK">Week</MenuItem>
                  <MenuItem value="MONTH">Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}><TextField label="Contact Number" name="contactNumber" value={accommodationData.contactNumber} onChange={handleAccommodationChange} fullWidth /></Grid>
            <Grid item xs={12}><TextField label="Email" name="email" type="email" value={accommodationData.email} onChange={handleAccommodationChange} fullWidth /></Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select name="availabilityStatus" value={accommodationData.availabilityStatus} onChange={handleAccommodationChange}>
                  <MenuItem value={true}>Available</MenuItem>
                  <MenuItem value={false}>Not Available</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}><TextField type="file" onChange={handleFileChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">Cancel</Button>
        <Button
          onClick={profileType === 'eventOrganiser' ? handleAddEvent : handleAddAccommodation}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddItemDialog;
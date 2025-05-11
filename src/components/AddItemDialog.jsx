// src/components/AddItemDialog.js
import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useDialog } from './DialogManager';
import { useSnackbar } from './SnackbarProvider';
import { AppContext } from '../context/AppContext';

function AddItemDialog() {
  const { dialogState, closeDialog } = useDialog();
  const { currentUser, addEvent, addAccommodation } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();

  const [newEvent, setNewEvent] = useState({ title: '', description: '' });
  const [newAccommodation, setNewAccommodation] = useState({ title: '', location: '', price: '' });

  const { isOpen, dialogType } = dialogState;
  const profileType = currentUser?.profileType;

  const handleAddEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.description.trim()) {
      showSnackbar('Title and Description are required', 'error');
      return;
    }
    try {
      const eventData = { ...newEvent, organiserId: currentUser.id };
      const response = await addEvent(eventData);
      if (response.success) {
        setNewEvent({ title: '', description: '' });
        closeDialog();
        showSnackbar('Event added!', 'success');
      } else {
        showSnackbar(response.message || 'Failed to add event', 'error');
      }
    } catch (error) {
      showSnackbar('Error adding event: ' + error.message, 'error');
    }
  };

  const handleAddAccommodation = async () => {
    if (!newAccommodation.title.trim() || !newAccommodation.location.trim() || !newAccommodation.price.trim()) {
      showSnackbar('All fields are required', 'error');
      return;
    }
    try {
      const accommodationData = { ...newAccommodation, providerId: currentUser.id };
      const response = await addAccommodation(accommodationData);
      if (response.success) {
        setNewAccommodation({ title: '', location: '', price: '' });
        closeDialog();
        showSnackbar('Accommodation added!', 'success');
      } else {
        showSnackbar(response.message || 'Failed to add accommodation', 'error');
      }
    } catch (error) {
      showSnackbar('Error adding accommodation: ' + error.message, 'error');
    }
  };

  if (!isOpen || dialogType !== 'addItem' || !currentUser) {
    return null;
  }

  return (
    <Dialog open={true} onClose={closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{profileType === 'eventOrganiser' ? 'Add New Event' : 'Add New Accommodation'}</DialogTitle>
      <DialogContent>
        {profileType === 'eventOrganiser' ? (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={newEvent.title}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={newAccommodation.title}
                onChange={(e) => setNewAccommodation((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                fullWidth
                value={newAccommodation.location}
                onChange={(e) => setNewAccommodation((prev) => ({ ...prev, location: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={newAccommodation.price}
                onChange={(e) => setNewAccommodation((prev) => ({ ...prev, price: e.target.value }))}
                required
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">
          Cancel
        </Button>
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
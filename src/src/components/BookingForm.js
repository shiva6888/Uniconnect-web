import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useDialog } from './DialogManager';
import { useSnackbar } from './SnackbarProvider';
import { AppContext } from '../context/AppContext';

function BookingForm({ accommodationId }) {
  const { dialogState, closeDialog } = useDialog();
  const { currentUser, bookAccommodation } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();

  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const validateBooking = () => {
    return bookingData.startDate && bookingData.endDate;
  };

  const handleSubmit = async () => {
    if (!validateBooking()) {
      showSnackbar('All fields are required', 'error');
      return;
    }
    try {
      const response = await bookAccommodation({
        accommodationId,
        studentId: currentUser.id,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
      });
      if (response.success) {
        setBookingData({ startDate: '', endDate: '' });
        closeDialog();
        showSnackbar('Booking successful!', 'success');
      } else {
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      showSnackbar('Error booking accommodation: ' + error.message, 'error');
    }
  };

  if (!dialogState.isOpen || dialogState.dialogType !== `book-${accommodationId}` || !currentUser) return null;

  return (
    <Dialog open={dialogState.isOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Book Accommodation</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Start Date"
              name="startDate"
              type="datetime-local"
              value={bookingData.startDate}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="End Date"
              name="endDate"
              type="datetime-local"
              value={bookingData.endDate}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Book</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookingForm;
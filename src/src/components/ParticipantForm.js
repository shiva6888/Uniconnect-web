import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useDialog } from './DialogManager';
import { useSnackbar } from './SnackbarProvider';
import { AppContext } from '../context/AppContext';

function ParticipantForm({ eventId }) {
  const { dialogState, closeDialog } = useDialog();
  const { currentUser, joinEvent } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      const response = await joinEvent(eventId);
      if (response.success) {
        closeDialog();
        showSnackbar('Successfully joined event!', 'success');
      } else {
        showSnackbar(response.message, 'error');
      }
    } catch (error) {
      showSnackbar('Error joining event: ' + error.message, 'error');
    }
  };

  if (!dialogState.isOpen || dialogState.dialogType !== `join-${eventId}` || !currentUser) return null;

  return (
    <Dialog open={dialogState.isOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Join Event</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to join this event?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Join</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParticipantForm;
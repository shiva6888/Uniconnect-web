// src/components/EventOrganiserDashboard.js
import React, { useContext } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import { useDialog } from './DialogManager';
import LoadingSpinner from './LoadingSpinner';
import CommentSection from './CommentSection';

function EventOrganiserDashboard() {
  const { currentUser, events, loading, deleteEvent } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  if (!currentUser) return null;
  if (loading) return <LoadingSpinner />;

  const handleDeleteEvent = async (eventId) => {
    const response = await deleteEvent(eventId);
    if (response.success) showSnackbar('Event deleted!', 'success');
    else showSnackbar(response.message, 'error');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">
          Welcome, {currentUser.firstName} {currentUser.lastName}!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openDialog('addItem')}
        >
          Add Event
        </Button>
      </Box>
      <Box mb={4}>
        <Typography variant="h6">Your Events</Typography>
        {events.filter((e) => Number(e.organiserId) == Number(currentUser.id)).length === 0 ? (
          <Typography>No events created yet.</Typography>
        ) : (
          events.filter((e) => Number(e.organiserId) == Number(currentUser.id)).map((event) => (
            <Card key={event.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography>{event.description}</Typography>
                <CommentSection postId={event.id} />
              </CardContent>
              <CardActions>
                <Button color="error" onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
}

export default EventOrganiserDashboard;
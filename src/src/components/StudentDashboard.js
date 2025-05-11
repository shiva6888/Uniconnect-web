import React, { useContext } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import { useDialog } from './DialogManager';
import LoadingSpinner from './LoadingSpinner';
import CommentSection from './CommentSection';
import BookingForm from './BookingForm';
import ParticipantForm from './ParticipantForm';

function StudentDashboard() {
  const { currentUser, events, accommodations, loading } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  if (!currentUser) return null;
  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Welcome, {currentUser.firstName} {currentUser.lastName}!
      </Typography>
      <Box mb={4}>
        <Typography variant="h6">Events</Typography>
        {events.length === 0 ? (
          <Typography>No events available.</Typography>
        ) : (
          events.map((event) => (
            <Card key={event.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography>{event.description}</Typography>
                <Typography>Location: {event.location}</Typography>
                <Typography>Start: {new Date(event.startDate).toLocaleString()}</Typography>
                <Typography>End: {new Date(event.endDate).toLocaleString()}</Typography>
                {event.media && event.media.length > 0 && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.media[0].mediaUrl}
                    alt={event.title}
                    sx={{ mt: 2 }}
                  />
                )}
                <CommentSection postId={event.id} postType="EVENT" />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => openDialog(`join-${event.id}`)}
                >
                  Join Event
                </Button>
              </CardActions>
              <ParticipantForm eventId={event.id} />
            </Card>
          ))
        )}
      </Box>
      <Box mb={4}>
        <Typography variant="h6">Accommodations</Typography>
        {accommodations.length === 0 ? (
          <Typography>No accommodations available.</Typography>
        ) : (
          accommodations.map((acc) => (
            <Card key={acc.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{acc.title}</Typography>
                <Typography>Location: {acc.location}</Typography>
                <Typography>Price: ${acc.price} ({acc.priceDuration})</Typography>
                <Typography>Capacity: {acc.capacity}</Typography>
                {acc.media && acc.media.length > 0 && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={acc.media[0].mediaUrl}
                    alt={acc.title}
                    sx={{ mt: 2 }}
                  />
                )}
                <CommentSection postId={acc.id} postType="ACCOMMODATION" />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => openDialog(`book-${acc.id}`)}
                  disabled={!acc.availabilityStatus}
                >
                  Book Now
                </Button>
              </CardActions>
              <BookingForm accommodationId={acc.id} />
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
}

export default StudentDashboard;
// src/components/EventListPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Mock Event Data (Replace with API call) ---
const mockEvents = [
  { id: 'evt101', title: 'Annual Tech Conference', description: 'Join us for the latest in tech trends.', date: '2024-10-15', location: 'Online' },
  { id: 'evt102', title: 'University Music Fest', description: 'Live bands and DJs all weekend.', date: '2024-11-05', location: 'Campus Green' },
  { id: 'evt103', title: 'Career Fair 2024', description: 'Meet top employers from various industries.', date: '2024-09-20', location: 'Grand Hall' },
];
// --- End Mock Data ---

function EventListPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      // TODO: Replace mockEvents with actual API call to fetch events
      // e.g., apiService.getEvents().then(data => setEvents(data));
      setEvents(mockEvents);
      setLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleRegisterClick = (eventId) => {
    // Navigate to the registration page for the specific event
    navigate(`/events/${eventId}/register`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Upcoming Events
      </Typography>
      {events.length === 0 && !loading ? (
         <Typography align="center">No events found.</Typography>
      ) : (
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Date: {event.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Location: {event.location}
                    </Typography>
                    <Typography variant="body2">
                      {event.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleRegisterClick(event.id)}
                    >
                      Register
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default EventListPage;

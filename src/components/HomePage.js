// src/components/HomePage.js
import React, { useContext } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, Paper, Avatar } from '@mui/material';
import { Event as EventIcon, HomeWork as AccommodationIcon, Group as CommunityIcon, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner'; // Assuming you might load featured items

function HomePage() {
  const navigate = useNavigate();
  const { currentUser, loading, events, accommodations } = useContext(AppContext); // Get context if needed for dynamic content

  // --- Placeholder Data (Replace with actual fetched featured items if desired) ---
  const featuredEvents = events?.slice(0, 2) || []; // Get first 2 events
  const featuredAccommodations = accommodations?.slice(0, 2) || []; // Get first 2 accommodations
  // --- End Placeholder Data ---

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const FeatureCard = ({ icon, title, description, link, linkText }) => (
    <motion.div variants={cardVariants}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', p: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', margin: '0 auto 16px', width: 56, height: 56 }}>
          {icon}
        </Avatar>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{description}</Typography>
        </CardContent>
        {link && (
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button size="small" onClick={() => navigate(link)} endIcon={<ArrowForward />}>
              {linkText || 'Learn More'}
            </Button>
          </CardActions>
        )}
      </Card>
    </motion.div>
  );

  if (loading && !currentUser) { // Show spinner only if initially loading data for the page
      return <LoadingSpinner />;
  }

  // If user is logged in, redirect to their specific dashboard
  // Comment this out if you want the rich HomePage visible even when logged in
  // if (currentUser) {
  //    // Or navigate('/dashboard') if you create a separate dashboard route
  //    switch (currentUser.profileType) {
  //       case 'student': return <StudentDashboard />;
  //       case 'eventOrganiser': return <EventOrganiserDashboard />;
  //       case 'accommodationProvider': return <AccommodationProviderDashboard />;
  //       default: break; // Fall through to show HomePage content below
  //    }
  // }

  return (
    <Box>
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <Paper
          sx={{
            py: { xs: 6, md: 10 },
            textAlign: 'center',
            mb: 6,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 0, // Full width feel
          }}
          elevation={3}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome to UniConnect
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 4 }}>
              Your central hub for university life – find events, accommodations, and connect with peers.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate(currentUser ? '/dashboard' : '/signup')} // Navigate to dashboard or signup
              endIcon={<ArrowForward />}
            >
              {currentUser ? 'Go to Dashboard' : 'Get Started'}
            </Button>
          </Container>
        </Paper>
      </motion.div>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Explore UniConnect
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<EventIcon />}
              title="Discover Events"
              description="Find exciting campus events, workshops, and social gatherings."
              link={currentUser ? '/dashboard' : '/login'} // Link to dashboard/feed if logged in
              linkText="View Events"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<AccommodationIcon />}
              title="Find Accommodation"
              description="Browse listings for student housing, apartments, and shared rooms near campus."
              link={currentUser ? '/dashboard' : '/login'} // Link to dashboard/feed if logged in
              linkText="Search Housing"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<CommunityIcon />}
              title="Join the Community"
              description="Connect with fellow students, share experiences, and stay updated."
              link="/reviews" // Example link
              linkText="Read Reviews"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Featured Content (Optional - requires data) */}
      {(featuredEvents.length > 0 || featuredAccommodations.length > 0) && (
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Featured Highlights
          </Typography>
          <Grid container spacing={3}>
            {/* Featured Events */}
            {featuredEvents.map((event) => (
              <Grid item xs={12} md={6} key={`event-${event.id}`}>
                 <motion.div variants={cardVariants} initial="hidden" animate="visible">
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{event.title}</Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>{event.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => navigate(currentUser ? '/dashboard' : '/login')}>View Details</Button>
                      </CardActions>
                    </Card>
                 </motion.div>
              </Grid>
            ))}
            {/* Featured Accommodations */}
            {featuredAccommodations.map((acc) => (
              <Grid item xs={12} md={6} key={`acc-${acc.id}`}>
                 <motion.div variants={cardVariants} initial="hidden" animate="visible">
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{acc.title}</Typography>
                      <Typography variant="body2" color="text.secondary">Location: {acc.location}</Typography>
                      <Typography variant="body2" color="text.secondary">Price: ${acc.price}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => navigate(currentUser ? '/dashboard' : '/login')}>View Details</Button>
                    </CardActions>
                  </Card>
                 </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

    </Box>
  );
}

export default HomePage;

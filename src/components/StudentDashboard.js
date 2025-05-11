// src/components/StudentDashboard.js
import React, { useContext } from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { AppContext } from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';
import CommentSection from './CommentSection';

function StudentDashboard() {
  const { currentUser, events, accommodations, loading } = useContext(AppContext);

  if (!currentUser) return null;
  if (loading) return <LoadingSpinner />;

  const feedItems = [...events, ...accommodations];

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">
          Welcome, {currentUser.firstName} {currentUser.lastName}!
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">Feed</Typography>
        {feedItems.length === 0 ? (
          <Typography>No items available.</Typography>
        ) : (
          feedItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                {item.description && <Typography>{item.description}</Typography>}
                {item.location && <Typography>Location: {item.location}</Typography>}
                {item.price && <Typography>Price: ${item.price}</Typography>}
                <CommentSection postId={item.id} />
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
}

export default StudentDashboard;
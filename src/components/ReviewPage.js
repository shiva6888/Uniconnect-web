// src/components/ReviewPage.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { Star } from '@mui/icons-material'; // For empty star icon in rating
import { useSnackbar } from './SnackbarProvider'; // To show feedback on submission

// --- Mock Data (Replace with API call in a real app) ---
const initialReviews = [
  {
    id: 1,
    name: 'Alice J',
    avatar: '/images/avatars/avatar1.jpg', // Replace with actual avatar paths
    rating: 5,
    comment: 'UniConnect has been incredibly helpful for finding events and connecting with fellow students. Highly recommended!',
    date: '2024-07-20',
  },
  {
    id: 2,
    name: 'Bob S',
    avatar: '/images/avatars/avatar2.jpg',
    rating: 4,
    comment: 'Great platform, easy to use. Found a fantastic accommodation listing quickly. Could use more event variety sometimes.',
    date: '2024-07-18',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    avatar: '/images/avatars/avatar3.jpg',
    rating: 4.5,
    comment: 'Love the interface and the dark mode! The comment sections are great for discussions.',
    date: '2024-07-15',
  },
  // Add more mock reviews as needed
];
// --- End Mock Data ---

function ReviewPage() {
  const { showSnackbar } = useSnackbar();
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (event, newValue) => {
    setNewReview((prev) => ({ ...prev, rating: newValue }));
  };

  const handleCommentChange = (event) => {
    setNewReview((prev) => ({ ...prev, comment: event.target.value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      showSnackbar('Please provide a rating and a comment.', 'warning');
      return;
    }
    setLoading(true);

    // --- Simulate API Call (Replace with actual API logic) ---
    console.log('Submitting review:', newReview);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, you'd get the user's name/avatar from context
    const submittedReview = {
      id: Date.now(), // Use a proper ID generation method
      name: 'CurrentUser Name', // Get from AppContext
      avatar: '/images/avatars/default.jpg', // Get from AppContext or use default
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [submittedReview, ...prev]); // Add new review to the top
    setNewReview({ rating: 0, comment: '' }); // Reset form
    showSnackbar('Thank you for your review!', 'success');
    // --- End Simulate API Call ---

    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        What Our Users Say
      </Typography>

      {/* Section to Submit a Review */}
      <Paper elevation={2} sx={{ p: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Leave Your Review
        </Typography>
        <Box component="form" onSubmit={handleSubmitReview} noValidate>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography component="legend" sx={{ mr: 1 }}>Your Rating:</Typography>
            <Rating
              name="user-rating"
              value={newReview.rating}
              onChange={handleRatingChange}
              precision={0.5}
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
              disabled={loading}
            />
          </Box>
          <TextField
            label="Your Comment"
            multiline
            rows={4}
            fullWidth
            value={newReview.comment}
            onChange={handleCommentChange}
            required
            margin="normal"
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading || newReview.rating === 0 || !newReview.comment.trim()}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ mb: 5 }} />

      {/* Section to Display Existing Reviews */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Recent Reviews
      </Typography>
      {reviews.length === 0 ? (
        <Typography>No reviews yet. Be the first!</Typography>
      ) : (
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      alt={review.name}
                      src={review.avatar}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {review.name}
                      </Typography>
                      <Rating value={review.rating} precision={0.5} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    "{review.comment}"
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
                   <Typography variant="caption" color="text.secondary">
                    Reviewed on: {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ReviewPage;
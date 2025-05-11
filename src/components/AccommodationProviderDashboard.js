// src/components/AccommodationProviderDashboard.js
import React, { useContext } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';
import { useDialog } from './DialogManager';
import LoadingSpinner from './LoadingSpinner';
import CommentSection from './CommentSection';

function AccommodationProviderDashboard() {
  const { currentUser, accommodations, loading, deleteAccommodation } = useContext(AppContext);
  const { showSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  if (!currentUser) return null;
  if (loading) return <LoadingSpinner />;

  const handleDeleteAccommodation = async (accommodationId) => {
    const response = await deleteAccommodation(accommodationId);
    if (response.success) showSnackbar('Accommodation deleted!', 'success');
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
          Add Accommodation
        </Button>
      </Box>
      <Box mb={4}>
        <Typography variant="h6">Your Accommodations</Typography>
        {accommodations.filter((a) => a.providerId === currentUser.id).length === 0 ? (
          <Typography>No accommodations listed yet.</Typography>
        ) : (
          accommodations
            .filter((a) => a.providerId === currentUser.id)
            .map((acc) => (
              <Card key={acc.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{acc.title}</Typography>
                  <Typography>Location: {acc.location}</Typography>
                  <Typography>Price: ${acc.price}</Typography>
                  <CommentSection postId={acc.id} />
                </CardContent>
                <CardActions>
                  <Button color="error" onClick={() => handleDeleteAccommodation(acc.id)}>
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

export default AccommodationProviderDashboard;
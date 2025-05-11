// src/components/ConfirmationPage.js
import React from 'react';
import { Typography, Box, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

function ConfirmationPage({ registrationData, eventDetails }) {
  const navigate = useNavigate();

  // Fallback if data is somehow missing (shouldn't happen in normal flow)
  if (!registrationData || !eventDetails) {
      return (
          <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h6" color="error">Registration details missing.</Typography>
              <Button variant="outlined" onClick={() => navigate('/events')} sx={{ mt: 2 }}>
                  Back to Events
              </Button>
          </Box>
      );
  }

  const { firstName, email, paymentInfo } = registrationData;
  const { title, price } = eventDetails;

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
      <Typography variant="h5" component="h2" gutterBottom>
        Registration Successful!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Thank you, {firstName}, for registering for **{title}**.
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mt: 2, mb: 3, textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
         <Typography variant="body1"><strong>Event:</strong> {title}</Typography>
         <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
         {paymentInfo?.amount > 0 && (
             <Typography variant="body1"><strong>Amount Paid:</strong> ${paymentInfo.amount.toFixed(2)}</Typography>
         )}
         {paymentInfo?.transactionId && paymentInfo.transactionId !== 'FREE_EVENT' && (
             <Typography variant="body1"><strong>Transaction ID:</strong> {paymentInfo.transactionId}</Typography>
         )}
         {price === 0 && (
             <Typography variant="body1"><strong>Cost:</strong> Free</Typography>
         )}
      </Paper>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        A confirmation email with your ticket details has been sent to **{email}**.
        (Email sending is simulated in this demo).
      </Typography>
      <Button variant="contained" onClick={() => navigate('/events')}>
        Back to Events
      </Button>
    </Box>
  );
}

export default ConfirmationPage;

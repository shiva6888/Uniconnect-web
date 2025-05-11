// src/components/PaymentForm.js
import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, Box, CircularProgress, Alert } from '@mui/material';

// IMPORTANT: This is a DUMMY payment form.
// For real payments, integrate Stripe Elements, PayPal SDK, or another secure payment provider.
// DO NOT handle raw credit card numbers directly in your frontend like this in production.

function PaymentForm({ onBack, onPaymentSuccess, eventPrice }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Basic validation (very simplistic)
    if (!cardNumber || !expiryDate || !cvv) {
        setError("Please fill in all card details.");
        return;
    }
    if (eventPrice === undefined) {
        setError("Event price is missing. Cannot proceed.");
        return;
    }

    setProcessing(true);

    // --- Simulate Payment Processing ---
    console.log(`Simulating payment of $${eventPrice}...`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call delay

    // Simulate success/failure (e.g., based on card number)
    const paymentSucceeded = !cardNumber.endsWith('0'); // Fail if card ends in 0

    setProcessing(false);

    if (paymentSucceeded) {
      console.log('Payment simulation successful.');
      onPaymentSuccess({
        transactionId: `SIM-${Date.now()}`,
        cardLast4: cardNumber.slice(-4),
        amount: eventPrice,
      });
    } else {
      console.error('Payment simulation failed.');
      setError('Payment failed. Please check your card details or try another card.');
    }
    // --- End Simulation ---
  };

  // Handle free events - show a confirmation instead of payment form
  if (eventPrice === 0) {
      return (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                  This is a free event!
              </Typography>
              <Typography gutterBottom>
                  No payment is required. Click 'Confirm Registration' to complete.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button onClick={onBack}>
                      Back
                  </Button>
                  <Button
                      variant="contained"
                      onClick={() => onPaymentSuccess({ transactionId: 'FREE_EVENT', amount: 0 })} // Pass success signal
                  >
                      Confirm Registration
                  </Button>
              </Box>
          </Box>
      );
  }

  // Render payment form for paid events
  return (
    <Box component="form" onSubmit={handlePaymentSubmit}>
      <Typography variant="h6" gutterBottom>
        Payment Method (Dummy Form)
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Amount: ${eventPrice.toFixed(2)}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            disabled={processing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date (MM/YY)"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            disabled={processing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            disabled={processing}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack} disabled={processing}>
          Back
        </Button>
        <Button
          variant="contained"
          type="submit" // Use type="submit"
          disabled={processing}
        >
          {processing ? <CircularProgress size={24} /> : `Pay $${eventPrice.toFixed(2)}`}
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentForm;

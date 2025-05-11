// src/components/EventRegistrationPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Stepper, Step, StepLabel, Paper, CircularProgress, Alert } from '@mui/material';
import PersonalDetailsForm from './PersonalDetailsForm';
import PaymentForm from './PaymentForm';
import ConfirmationPage from './ConfirmationPage';

// --- Mock Event Data Fetch (Replace with API call) ---
const fetchEventDetails = async (eventId) => {
  console.log(`Fetching details for event: ${eventId}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  // Find event from mock data (in real app, this would be an API response)
  const mockEvents = [
    { id: 'evt101', title: 'Annual Tech Conference', price: 50 },
    { id: 'evt102', title: 'University Music Fest', price: 25 },
    { id: 'evt103', title: 'Career Fair 2024', price: 0 }, // Example free event
  ];
  const event = mockEvents.find(e => e.id === eventId);
  if (!event) throw new Error('Event not found');
  return event;
};
// --- End Mock Data ---

const steps = ['Personal Details', 'Payment', 'Confirmation'];

function EventRegistrationPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [registrationData, setRegistrationData] = useState({});
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await fetchEventDetails(eventId);
        setEventDetails(details);
        // If event is free, skip payment step potentially
        if (details.price === 0) {
            // Adjust steps if needed, or handle in PaymentForm
            console.log("This is a free event.");
        }
      } catch (err) {
        console.error("Failed to load event details:", err);
        setError(err.message || 'Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);

  const handleNext = (data) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
    // If the event is free and we are at the personal details step, skip payment
    if (activeStep === 0 && eventDetails?.price === 0) {
        setActiveStep(steps.length - 1); // Go directly to confirmation
        // Here you would typically trigger the final registration logic
        console.log("Processing free registration:", { ...registrationData, ...data });
        // simulateBackendRegistration({ ...registrationData, ...data }, eventDetails);
    } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentSuccess = (paymentInfo) => {
     console.log('Payment successful:', paymentInfo);
     setRegistrationData((prev) => ({ ...prev, paymentInfo }));
     // Here you would typically trigger the final registration logic on your backend
     console.log("Processing paid registration:", { ...registrationData, paymentInfo });
     // simulateBackendRegistration({ ...registrationData, paymentInfo }, eventDetails);
     setActiveStep((prevActiveStep) => prevActiveStep + 1); // Move to confirmation
  };

  // --- Simulate Backend Call ---
  // In a real app, this would be an API call to your server
  const simulateBackendRegistration = async (finalData, event) => {
      console.log("Sending registration to backend:", finalData);
      console.log("For event:", event);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Backend simulation: Registration successful. Sending email...");
      // Simulate email sending
      alert(`Simulating: Email sent to ${finalData.email} for event ${event.title}`);
      return { success: true, ticketId: `TKT-${Date.now()}` };
  }
  // --- End Simulation ---


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetailsForm onNext={handleNext} initialData={registrationData} />;
      case 1:
        // Pass event price to payment form
        return <PaymentForm onBack={handleBack} onPaymentSuccess={handlePaymentSuccess} eventPrice={eventDetails?.price || 0} />;
      case 2:
        return <ConfirmationPage registrationData={registrationData} eventDetails={eventDetails} />;
      default:
        throw new Error('Unknown step');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
     return (
       <Container sx={{ py: 4 }}>
         <Alert severity="error">Error: {error} <Button onClick={() => navigate('/events')}>Go Back</Button></Alert>
       </Container>
     );
  }

  return (
    <Container component={Paper} maxWidth="md" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Register for: {eventDetails?.title || 'Event'}
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {getStepContent(activeStep)}
      </React.Fragment>
    </Container>
  );
}

export default EventRegistrationPage;

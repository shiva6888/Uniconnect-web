// src/components/HelpPage.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom'; // For internal links

// --- FAQ Data ---
const faqData = [
  {
    id: 'faq1',
    question: 'How do I get started with UniConnect?',
    answer: (
      <>
        Welcome to UniConnect! To get started, simply{' '}
        <Link component={RouterLink} to="/signup">
          sign up
        </Link>{' '}
        for an account based on your profile type (Student, Event Organiser, or Accommodation Provider). Once registered and logged in, you can explore the dashboard, view feeds, manage your profile, and interact with the community.
      </>
    ),
  },
  {
    id: 'faq2',
    question: 'How can I update my profile information?',
    answer: (
      <>
        You can update your profile details, including your name, profile picture, and other relevant information, by navigating to the{' '}
        <Link component={RouterLink} to="/profile">
          Profile
        </Link>{' '}
        page. Click the user icon in the header, then select "Profile". Make your changes and click "Update Profile".
      </>
    ),
  },
  {
    id: 'faq3',
    question: 'I forgot my password. What should I do?',
    answer:
      'Currently, we are working on a password reset feature. In the meantime, please contact support through the Contact Us page for assistance.',
  },
  {
    id: 'faq4',
    question: 'How do I post an event or accommodation listing?',
    answer: (
      <>
        If you are registered as an Event Organiser or Accommodation Provider, you will see an "Add" button (or similar) on your dashboard. Click this button to open a form where you can enter the details for your event or listing.
      </>
    ),
  },
  {
    id: 'faq5',
    question: 'How can I report an issue or provide feedback?',
    answer: (
      <>
        We appreciate your feedback! You can report issues or suggest improvements by visiting the{' '}
        <Link component={RouterLink} to="/feedback">
          Feedback
        </Link>{' '}
        page. For urgent matters or specific questions, please use the{' '}
        <Link component={RouterLink} to="/ContactUs">
          Contact Us
        </Link>{' '}
        form.
      </>
    ),
  },
  // Add more FAQs as needed
];
// --- End FAQ Data ---

function HelpPage() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Help & Support
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 5 }}>
          Find answers to common questions below. If you need further assistance, please don't hesitate to{' '}
          <Link component={RouterLink} to="/ContactUs">
            contact us
          </Link>
          .
        </Typography>

        <Box>
          {faqData.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                '&:before': {
                  display: 'none', // Remove default top border
                },
                mb: 1, // Add margin between accordions
              }}
              elevation={1} // Subtle shadow
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${faq.id}-content`}
                id={`${faq.id}-header`}
                sx={{
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                  '&:hover': {
                     backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
                  }
                }}
              >
                <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 2, pb: 2 }}>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}

export default HelpPage;

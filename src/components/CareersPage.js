import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { LocationOn, Person, CalendarToday } from '@mui/icons-material';

// Option 1: Import from JSON file (if you created one)
// import jobData from '../data/jobs.json';

// Option 2: Define data directly in the component
const jobData = [
  {
    "id": "job001",
    "role": "Frontend Developer",
    "location": "Remote",
    "hrName": "Shiva",
    "createdDate": "2024-07-20",
    "description": "We are looking for a skilled Frontend Developer proficient in React and Material UI to join our dynamic team. You will be responsible for building user-facing features and ensuring a seamless user experience.",
    "applyLink": "#" // Placeholder link
  },
  {
    "id": "job002",
    "role": "Backend Engineer",
    "location": "New York, NY",
    "hrName": "Farhana",
    "createdDate": "2024-07-18",
    "description": "Seeking a Backend Engineer experienced with Node.js and database management. You will work on server-side logic, database interactions, and API development.",
     "applyLink": "#" // Placeholder link
  },
  {
    "id": "job003",
    "role": "Cloud Engineer",
    "location": "Austin, TX",
    "hrName": "Shruthi",
    "createdDate": "2024-07-15",
    "description": "Join our infrastructure team as a Cloud Engineer. Experience with AWS or GCP, containerization (Docker, Kubernetes), and CI/CD pipelines is required.",
     "applyLink": "#" // Placeholder link
  }
];

// Helper function to format date (optional)
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CareersPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Join Our Team
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Explore exciting career opportunities at UniConnect.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {jobData.length > 0 ? (
          jobData.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {job.role}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{job.location}</Typography>
                  </Box>
                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <Person fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">HR: {job.hrName}</Typography>
                  </Box>
                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                    <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">Posted: {formatDate(job.createdDate)}</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {job.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: 'auto', p: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    href={job.applyLink} // Use the apply link from JSON
                    target="_blank" // Open in new tab if it's an external link
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="text.secondary">
              No open positions at the moment. Check back soon!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CareersPage;

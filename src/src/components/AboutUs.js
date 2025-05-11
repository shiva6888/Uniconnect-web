import React from 'react';
import { Container, Typography, Box, Grid, Avatar } from '@mui/material';

const teamMembers = [
  { name: 'Sruthi', photo: '/images/member6.jpg', role: 'Frontend Developer' },
  { name: 'Farhan', photo: '/images/member2.jpg', role: 'Backend Developer' },
  { name: 'Akhila', photo: '/images/member3.jpg', role: 'Database Engineer' },
  { name: 'Shiva', photo: '/images/member4.jpg', role: 'Cloud Engineer' },
  { name: 'Farhana', photo: '/images/member5.jpg', role: 'Project Planning' },
  { name: 'Vandana', photo: '/images/member1.jpg', role: 'Frontend Developer' },
];

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to UniConnect! We are dedicated to connecting students and building a vibrant community.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to provide a platform where students can share, collaborate, and grow together.
        </Typography>
        <Typography variant="body1" paragraph>
          We strive to bring students together through innovative and modern applications.
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Contact us at uniconnect@email.com
        </Typography>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar alt={member.name} src={member.photo} sx={{ width: 100, height: 100, mb: 2 }} />
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">{member.role}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
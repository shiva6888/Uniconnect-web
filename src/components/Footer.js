import React from 'react';
import { Box, Container, Typography, Link, Divider, Grid, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                px: 2,
                mt: 'auto',
                backgroundColor: theme.palette.mode === 'light'
                    ? 'background.paper'
                    : 'background.paper',
                boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.05)'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={5}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                           UniConnect 
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                        UniConnect is a dynamic platform designed to foster a vibrant community among students. It serves as a central hub where students can connect, collaborate, and share their academic journeys.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link href="#" color="inherit">
                                <Facebook />
                            </Link>
                            <Link href="#" color="inherit">
                                <Twitter />
                            </Link>
                            <Link href="#" color="inherit">
                                <Instagram />
                            </Link>
                            <Link href="#" color="inherit">
                                <LinkedIn />
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Quick Links
                        </Typography>
                        <Typography variant="body2" paragraph>
                        <Link component={RouterLink} to="/AboutUs" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                        About Us
                            </Link>
                            <Link component={RouterLink} to="/login" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                                Login
                            </Link>
                            <Link component={RouterLink} to="/ContactUs" underline="hover" display="block" sx={{ mb: 1 }}>
                                Contact Us
                            </Link>
                            <Link component={RouterLink} to="/help" color="inherit" underline="hover" display="block">
                                Help
                            </Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Company
                        </Typography>
                        <Typography variant="body2" paragraph>
                        <Link component={RouterLink} to="/AboutUs" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                        About Us
                            </Link>
                            <Link component={RouterLink} to="/careers" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                                Careers
                            </Link>
                            <Link component={RouterLink} to="/reviews" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                                Reviews
                            </Link>
                            <Link component={RouterLink} to="/ContactUs" underline="hover" display="block" sx={{ mb: 1 }}>
                                Contact Us
                            </Link>
                        </Typography>
                    </Grid>

                    {/* <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Legal
            </Typography>
            <Typography variant="body2" paragraph>
              <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Terms of Service
              </Link> */}
                </Grid>
            </Container>
        </Box>)
}

export default Footer;
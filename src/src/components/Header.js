import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Drawer from './Drawer';

function Header() {
  const { currentUser, logout, darkMode, toggleDarkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              UniConnect
            </Link>
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer open={drawerOpen} onClose={toggleDrawer} />
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit" component={Link} to="/about">About Us</Button>
              <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
              <Button color="inherit" component={Link} to="/feedback">Feedback</Button>
              {currentUser ? (
                <>
                  <Button color="inherit" component={Link} to="/profile">Profile</Button>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                </>
              )}
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
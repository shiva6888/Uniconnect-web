import React, { useState, useContext, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Box,
  Badge,
} from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness6Outlined, Logout, Person, Notifications, Shop as SchoolIcon } from '@mui/icons-material';
import Drawer from './Drawer';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

/**
 * Header component with navigation and user options.
 * Memoized to prevent unnecessary re-renders.
 */
const Header = memo(() => {
  const { currentUser, logout, darkMode, toggleDarkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationsMenu = (event) => setNotificationsAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleNotificationsClose = () => setNotificationsAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // Static notifications (replace with dynamic data from backend)
  const notifications = [
    { text: 'New event added', time: '5 mins ago' },
    { text: 'Comment received', time: '1 hour ago' },
    { text: 'New Message received', time: '2 hour ago' },
  ];

  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar>
          {currentUser && (
             <IconButton edge="start" onClick={toggleDrawer}>
             <MenuIcon />
           </IconButton>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1, // Allow this box to grow
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')} // Keep the click handler on the Box
          >
            <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} /> {/* Added Icon */}
            <Typography variant="h5" component="div" sx={{ flexGrow: 0 }}> {/* Removed flexGrow from Typography */}
              Uniconnect
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton onClick={toggleDarkMode}>
                <motion.div animate={{ scale: darkMode ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
                  {darkMode ? <Brightness6Outlined /> : <Brightness4 />}
                </motion.div>
              </IconButton>
            </Tooltip>
            {currentUser && (
              <>
                <IconButton onClick={handleNotificationsMenu}>
                  <Badge badgeContent={notifications.length} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <Tooltip title="Account">
                  <IconButton onClick={handleMenu}>
                    <Avatar alt={currentUser.firstName} src={currentUser.profilePictureURL} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {currentUser && (
        <>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleProfile}>
              <Person sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {notifications.map((item, index) => (
              <MenuItem key={index} onClick={handleNotificationsClose}>
                <Typography variant="body2">{item.text} - {item.time}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
      )}
    </>
  );
});

export default Header;
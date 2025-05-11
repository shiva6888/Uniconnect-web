// src/components/Drawer.js
import React, { useContext } from 'react'; // Import useContext
import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'; // Use ListItemButton, add Divider
// Import Event icon
import { Home, Feedback, Person, Chat as ChatIcon, Dashboard as DashboardIcon, Event as EventIcon } from '@mui/icons-material'; // Add ChatIcon, DashboardIcon, and EventIcon
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Import AppContext

const Drawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext); // Get currentUser

  // Base items visible to everyone (or logged-in users)
  const baseItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    // Add Events link here
    { text: 'Events', icon: <EventIcon />, path: '/events' }, // <-- New Event Link
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Feedback', icon: <Feedback />, path: '/feedback' },
    // Add other public links like About, Contact, Help here if desired
  ];

  // Items only for logged-in users
  const loggedInItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
  ];

  // Combine items based on login status
  const items = currentUser ? [...baseItems, ...loggedInItems] : baseItems;

  // Filter out Chat/Feedback/Profile if not logged in (optional, depends on your requirements)
  // const items = currentUser
  //  ? [...baseItems, { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }, { text: 'Profile', icon: <Person />, path: '/profile' }]
  //  : [{ text: 'Home', icon: <Home />, path: '/' }]; // Only show Home if not logged in

  return (
    <MuiDrawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250, pt: 2 }}> {/* Added padding top */}
        {items.map((item, index) => (
          // Add a divider before Profile if user is logged in and Profile is not the first loggedInItem
          <React.Fragment key={item.text}>
            {currentUser && item.text === 'Profile' && index > 0 && <Divider sx={{ my: 1 }} />}
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate(item.path); onClose(); }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;

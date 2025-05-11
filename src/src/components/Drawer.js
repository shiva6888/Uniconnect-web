import React from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Feedback, Person, Info, ContactMail } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Drawer = ({ open, onClose }) => {
  const navigate = useNavigate();

  const items = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Feedback', icon: <Feedback />, path: '/feedback' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'About Us', icon: <Info />, path: '/about' },
    { text: 'Contact Us', icon: <ContactMail />, path: '/contact' },
  ];

  return (
    <MuiDrawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {items.map((item) => (
          <ListItem button key={item.text} onClick={() => { navigate(item.path); onClose(); }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
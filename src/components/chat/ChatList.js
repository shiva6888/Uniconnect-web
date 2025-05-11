// src/components/chat/ChatList.js
import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

// Simple badge for online status
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function ChatList({ users = [], onSelectChat, selectedUserId }) {
  return (
    <List sx={{ p: 0 }}>
      {users.length === 0 && (
        <ListItem>
          <ListItemText primary="No users available to chat." />
        </ListItem>
      )}
      {users.map((user) => (
        <ListItem
          button
          key={user.id}
          onClick={() => onSelectChat(user)}
          selected={selectedUserId === user.id}
          divider
        >
          <ListItemAvatar>
            {user.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt={user.name} src={user.avatar || '/images/avatars/default.jpg'} />
              </StyledBadge>
            ) : (
              <Avatar alt={user.name} src={user.avatar || '/images/avatars/default.jpg'} />
            )}
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default ChatList;

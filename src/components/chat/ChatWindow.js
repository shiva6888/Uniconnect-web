// src/components/chat/ChatWindow.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, Paper, List, ListItem, ListItemText, Avatar, AppBar, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// --- Placeholder Data/Logic ---
const mockMessages = [
    // { id: 1, senderId: 'user1', text: 'Hey there!', timestamp: Date.now() - 50000 },
    // { id: 2, senderId: 'currentUser', text: 'Hi Alice!', timestamp: Date.now() - 40000 },
];
// --- End Placeholder ---

function ChatWindow({ selectedUser, currentUser, /* socket */ }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // To scroll to bottom

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // TODO: Fetch initial messages for the selected user
  useEffect(() => {
    if (selectedUser) {
      console.log(`Fetching messages for ${selectedUser.name}`);
      // Replace with API call or socket event to get history
      setMessages(mockMessages); // Use mock data for now
    }
  }, [selectedUser]);

  // TODO: Listen for incoming messages via WebSocket
  // useEffect(() => {
  //   if (!socket) return;

  //   const messageListener = (message) => {
  //     // Check if the message belongs to the currently selected chat
  //     if (message.senderId === selectedUser.id || message.recipientId === selectedUser.id) {
  //        setMessages((prevMessages) => [...prevMessages, message]);
  //     }
  //   };

  //   socket.on('newMessage', messageListener);

  //   return () => {
  //     socket.off('newMessage', messageListener);
  //   };
  // }, [socket, selectedUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !selectedUser) return;

    const messageData = {
      id: Date.now(), // Use proper ID generation
      senderId: currentUser.id,
      senderName: `${currentUser.firstName} ${currentUser.lastName}`,
      recipientId: selectedUser.id,
      text: newMessage,
      timestamp: Date.now(),
    };

    // TODO: Send message via WebSocket
    // socket.emit('sendMessage', messageData);

    // Optimistically add message to UI (remove if backend confirms via event)
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage('');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar variant="dense">
          <Avatar sx={{ mr: 2 }} alt={selectedUser.name} src={selectedUser.avatar || '/images/avatars/default.jpg'} />
          <Typography variant="h6">{selectedUser.name}</Typography>
        </Toolbar>
      </AppBar>

      {/* Message List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, backgroundColor: (theme) => theme.palette.background.default }}>
        <List>
          {messages.map((msg) => (
            <ListItem key={msg.id} sx={{ display: 'flex', justifyContent: msg.senderId === currentUser.id ? 'flex-end' : 'flex-start' }}>
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: '70%',
                  bgcolor: msg.senderId === currentUser.id ? 'primary.main' : 'grey.300',
                  color: msg.senderId === currentUser.id ? 'primary.contrastText' : 'text.primary',
                  borderRadius: msg.senderId === currentUser.id ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                }}
              >
                <ListItemText
                  primary={msg.text}
                  secondary={
                    <Typography variant="caption" sx={{ color: msg.senderId === currentUser.id ? 'rgba(255,255,255,0.7)' : 'text.secondary', display: 'block', textAlign: 'right', mt: 0.5 }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  }
                />
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} /> {/* Anchor for scrolling */}
        </List>
      </Box>

      {/* Message Input */}
      <Paper elevation={2} sx={{ p: 1, backgroundColor: (theme) => theme.palette.background.paper }}>
        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            autoComplete="off"
          />
          <IconButton type="submit" color="primary" disabled={!newMessage.trim()}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default ChatWindow;

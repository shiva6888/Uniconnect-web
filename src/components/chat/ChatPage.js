// src/components/chat/ChatPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client'; // You'll need to install socket.io-client: npm install socket.io-client

// --- Placeholder Data/Logic ---
// Replace with actual user fetching and chat logic
const mockUsers = [
  { id: 'user1', name: 'Shruthi', online: true },
  { id: 'user2', name: 'Farhan', online: false },
  { id: 'user3', name: 'Farhana', online: true },
  { id: 'user41', name: 'Shiva', online: true },
  { id: 'user5', name: 'Akhila', online: false },
  { id: 'user6', name: 'Vandana', online: true },
];
// --- End Placeholder ---

function ChatPage() {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedChatUser, setSelectedChatUser] = useState(null); // User object { id, name }
  const [users, setUsers] = useState([]); // List of users to chat with
  const [loading, setLoading] = useState(true);
  // const [socket, setSocket] = useState(null); // State for the socket connection

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return; // Early exit if no user
    }

    // --- TODO: Initialize WebSocket Connection ---
    // const newSocket = io('YOUR_BACKEND_URL'); // Replace with your backend server URL
    // setSocket(newSocket);

    // newSocket.on('connect', () => {
    //   console.log('Connected to chat server');
    //   newSocket.emit('join', { userId: currentUser.id }); // Announce user joining
    // });

    // newSocket.on('disconnect', () => {
    //   console.log('Disconnected from chat server');
    // });

    // newSocket.on('userList', (userList) => { // Example event from backend
    //   setUsers(userList.filter(u => u.id !== currentUser.id)); // Exclude self
    //   setLoading(false);
    // });

    // // Cleanup on unmount
    // return () => {
    //   newSocket.disconnect();
    // };

    // --- Placeholder Loading ---
    setTimeout(() => {
      setUsers(mockUsers.filter(u => u.id !== currentUser.id)); // Simulate fetching users
      setLoading(false);
    }, 1000);
    // --- End Placeholder ---

  }, [currentUser, navigate]);

  const handleSelectChat = (user) => {
    setSelectedChatUser(user);
    // TODO: Maybe fetch chat history for this user or join a specific room via socket
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: 'calc(100vh - 150px)' }}> {/* Adjust height as needed */}
      <Grid container component={Paper} elevation={3} sx={{ height: '100%', overflow: 'hidden' }}>
        {/* Chat List (Left Side) */}
        <Grid item xs={12} sm={4} md={3} sx={{ borderRight: '1px solid #ddd', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
            Chats
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <ChatList users={users} onSelectChat={handleSelectChat} selectedUserId={selectedChatUser?.id} />
          </Box>
        </Grid>

        {/* Chat Window (Right Side) */}
        <Grid item xs={12} sm={8} md={9} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {selectedChatUser ? (
            <ChatWindow selectedUser={selectedChatUser} currentUser={currentUser} /* socket={socket} */ />
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h6" color="text.secondary">
                Select a chat to start messaging
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;

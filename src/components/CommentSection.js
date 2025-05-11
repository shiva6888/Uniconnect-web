// src/components/CommentSection.js
import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { CommentContext } from '../context/CommentContext';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';

const CommentSection = ({ postId }) => {
  const { currentUser } = useContext(AppContext);
  const { comments, fetchComments, addComment } = useContext(CommentContext);
  const { showSnackbar } = useSnackbar();
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (postId) {
      const debounceFetch = setTimeout(() => {
        fetchComments(postId);
      }, 300);
      return () => clearTimeout(debounceFetch);
    }
  }, [postId, fetchComments]);

  const handleAddComment = async () => {
    const commentData = {
      postId,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      text: commentText,
    };
    const response = await addComment(commentData);
    if (response.success) {
      setCommentText('');
      showSnackbar('Comment added!', 'success');
    } else {
      showSnackbar(response.message, 'error');
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle2">Comments:</Typography>
      {comments.filter((c) => c.postId === postId).length === 0 ? (
        <Typography variant="body2">No comments yet.</Typography>
      ) : (
        comments.filter((c) => c.postId === postId).map((comment) => (
          <Box key={comment.id} display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ mr: 1, width: 24, height: 24 }}>{comment.userName[0]}</Avatar>
            <Typography>
              {comment.userName}: {comment.text}
            </Typography>
          </Box>
        ))
      )}
      <TextField
        label="Comment"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        sx={{ mt: 1 }}
      />
      <Button
        variant="contained"
        onClick={handleAddComment}
        sx={{ mt: 1 }}
        disabled={!commentText}
      >
        Post
      </Button>
    </Box>
  );
};

export default CommentSection;
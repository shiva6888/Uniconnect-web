import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { CommentContext } from '../context/CommentContext';
import { AppContext } from '../context/AppContext';
import { useSnackbar } from './SnackbarProvider';

const CommentSection = ({ postId, postType }) => {
  const { currentUser } = useContext(AppContext);
  const { comments, fetchComments, addComment } = useContext(CommentContext);
  const { showSnackbar } = useSnackbar();
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (postId && postType) {
      fetchComments(postId, postType);
    }
  }, [postId, postType, fetchComments]);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      showSnackbar('Comment cannot be empty', 'error');
      return;
    }
    const commentData = {
      postId,
      postType,
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
      {comments.filter((c) => c.postId === postId && c.postType === postType).length === 0 ? (
        <Typography variant="body2">No comments yet.</Typography>
      ) : (
        comments
          .filter((c) => c.postId === postId && c.postType === postType)
          .map((comment) => (
            <Box key={comment.id} display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ mr: 1, width: 24, height: 24 }}>{comment.userName[0]}</Avatar>
              <Typography>{comment.userName}: {comment.text}</Typography>
            </Box>
          ))
      )}
      {currentUser && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default CommentSection;
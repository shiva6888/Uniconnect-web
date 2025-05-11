import React, { createContext, useState } from 'react';
import apiService from '../services/apiService';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async (postId, postType) => {
    try {
      const response = await apiService.getComments(postId, postType);
      setComments((prev) => {
        const filteredComments = prev.filter((c) => c.postId !== postId || c.postType !== postType);
        return [...filteredComments, ...response];
      });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (commentData) => {
    try {
      const response = await apiService.addComment(commentData);
      setComments((prev) => [...prev, response]);
      return { success: true, comment: response };
    } catch (error) {
      console.error('Error adding comment:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to add comment' };
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};
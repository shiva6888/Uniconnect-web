// src/context/CommentContext.js
import React, { createContext, useState } from 'react';
import apiService from '../apiService';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async (postId) => {
    try {
      const response = await apiService.getComments(postId);
      if (response.success) {
        setComments(prev => {
          const filteredComments = prev.filter(c => c.postId !== postId);
          return [...filteredComments, ...response.comments];
        });
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (commentData) => {
    try {
      const response = await apiService.addComment(commentData);
      if (response.success) {
        setComments(prev => [...prev, response.comment]);
        await fetchComments(commentData.postId);
      }
      return response;
    } catch (error) {
      console.error('Error adding comment:', error);
      return { success: false, message: 'Failed to add comment' };
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};
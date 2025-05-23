import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const PostContext = createContext(null);

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/posts");
      setPosts(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (content) => {
    try {
      const res = await axios.post("/api/posts", { content });
      setPosts([res.data, ...posts]);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error creating post");
      throw err;
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await axios.put(`/api/posts/${postId}/like`);
      setPosts(posts.map((post) => (post.id === postId ? res.data : post)));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error liking post");
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting post");
    }
  };

  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    likePost,
    deletePost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

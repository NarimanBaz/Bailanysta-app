import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/users/${user.id}/posts`
      );
      setUserPosts(res.data);
    } catch (err) {
      setError("Error fetching user posts");
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`);
      setUserPosts(userPosts.filter((post) => post.id !== postId));
    } catch (err) {
      setError("Error deleting post");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Member since:</span>{" "}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Your Posts</h2>
        {userPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-500 text-sm">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-800">{post.content}</p>
          </div>
        ))}
        {userPosts.length === 0 && (
          <p className="text-gray-500 text-center">No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

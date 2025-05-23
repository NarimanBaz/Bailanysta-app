import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePosts } from "../contexts/PostContext";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    likePost,
    deletePost,
  } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (content) => {
    try {
      await createPost(content);
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await likePost(postId);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isAuthenticated && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Create Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const content = e.target.content.value;
              handleCreatePost(content);
              e.target.content.value = "";
            }}
          >
            <textarea
              name="content"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="What's on your mind?"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {post.username}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
                {isAuthenticated && post.user_id === user?.id && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="mt-4 text-gray-800">{post.content}</p>
              {isAuthenticated && (
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="text-blue-500 hover:text-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <span>
                      {post.likes?.includes(user?.id) ? "Unlike" : "Like"}
                    </span>
                    <span className="text-gray-500">
                      ({post.likes?.length || 0})
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

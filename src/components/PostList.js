import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentingOn, setCommentingOn] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('posts/');
      setPosts(response.data);
    } catch (error) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts', error);
    }
  };

  const handleComment = async (postId) => {
    try {
      await api.post(`posts/${postId}/comments/`, { text: newComment });
      setNewComment('');
      setCommentingOn(null);
      fetchPosts(); // Refresh posts to show new comment
    } catch (error) {
      setError('Failed to add comment');
      console.error('Error adding comment', error);
    }
  };

  const handleEditPost = async (postId) => {
    try {
      await api.put(`posts/${postId}/`, { caption: editContent });
      setEditingPost(null);
      setEditContent('');
      fetchPosts();
    } catch (error) {
      setError('Failed to edit post');
      console.error('Error editing post', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`posts/${postId}/`);
      fetchPosts();
    } catch (error) {
      setError('Failed to delete post');
      console.error('Error deleting post', error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      await api.put(`comments/${commentId}/`, { text: editContent });
      setEditingComment(null);
      setEditContent('');
      fetchPosts();
    } catch (error) {
      setError('Failed to edit comment');
      console.error('Error editing comment', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`comments/${commentId}/`);
      fetchPosts();
    } catch (error) {
      setError('Failed to delete comment');
      console.error('Error deleting comment', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.user}</h3>
          {editingPost === post.id ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditPost(post.id);
            }}>
              <input 
                type="text" 
                value={editContent} 
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              <p>{post.caption}</p>
              <button onClick={() => {
                setEditingPost(post.id);
                setEditContent(post.caption);
              }}>Edit</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </>
          )}
          {post.image && <img src={post.image} alt="Post" />}
          <h4>Comments:</h4>
          {post.comments && post.comments.map(comment => (
            <div key={comment.id}>
              {editingComment === comment.id ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleEditComment(comment.id);
                }}>
                  <input 
                    type="text" 
                    value={editContent} 
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <p>{comment.user}: {comment.text}</p>
                  <button onClick={() => {
                    setEditingComment(comment.id);
                    setEditContent(comment.text);
                  }}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
          {commentingOn === post.id ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleComment(post.id);
            }}>
              <input 
                type="text" 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <button type="submit">Post Comment</button>
            </form>
          ) : (
            <button onClick={() => setCommentingOn(post.id)}>Add Comment</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
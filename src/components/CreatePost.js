import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.post('posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/posts');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating post');
      console.error('Error creating post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
import React, { useState } from 'react';
import axios from 'axios';

const UpdatePost = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dërgo kërkesën PUT për përditësimin e postimit
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        title,
        content,
      });
      alert('Postimi u përditësua me sukses!');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të postimit:', error);
    }
  };

  return (
    <div>
      <h2>Përditëso Postim</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID i Postimit:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Titulli:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Përmbajtja:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Përditëso</button>
      </form>
    </div>
  );
};

export default UpdatePost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Gabim gjatë marrjes së postimeve:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Gabim gjatë fshirjes së postimit:', error);
    }
  };

  return (
    <div>
      <h1>Lista e Postimeve</h1>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Shto Postimin</Link>
      {posts.map((post) => (
        <div key={post.id} className="border-b py-2">
          <p><strong>{post.title}</strong>: {post.content}</p>
          <Link to={`/edit/${post.id}`} className="text-blue-500">Redakto</Link>
          <button onClick={() => deletePost(post.id)} className="ml-4 bg-red-500 text-white px-2 py-1">Fshi</button>
        </div>
      ))}
    </div>
  );
};

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const addPost = async () => {
    try {
      await axios.post('http://localhost:5000/api/posts', { title, content });
      navigate('/posts');
    } catch (error) {
      console.error('Gabim gjatë shtimit të postimit:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1>Shto Postimin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Titulli"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Përmbajtja"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addPost}>Shto</button>
    </div>
  );
};
const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error('Gabim gjatë marrjes së postimit:', error);
    }
  };

  const updatePost = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content });
      navigate('/posts');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të postimit:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1>Redakto Postimin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Titulli"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Përmbajtja"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updatePost}>Përditëso</button>
    </div>
  );
};


export { PostList, AddPost, EditPost };

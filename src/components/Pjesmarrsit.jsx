import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Komponenti për shtimin e pjesëmarrësve
const AddParticipant = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const addParticipant = async () => {
    try {
      await axios.post('http://localhost:5000/participants', { name, email }, { withCredentials: true });
      navigate('/participants');
    } catch (error) {
      console.error('Error adding participant:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shto Pjesëmarrës</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addParticipant}>Shto</button>
    </div>
  );
};

// Komponenti për redaktimin e pjesëmarrësve
const EditParticipant = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipant();
  }, [id]);

  const fetchParticipant = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/participants/${id}`, { withCredentials: true });
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching participant:', error.response || error.message);
    }
  };

  const updateParticipant = async () => {
    try {
      await axios.put(`http://localhost:5000/participants/${id}`, { name, email }, { withCredentials: true });
      navigate('/participants');
    } catch (error) {
      console.error('Error updating participant:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redakto Pjesëmarrës</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updateParticipant}>Përditëso</button>
    </div>
  );
};

// Komponenti për listimin e pjesëmarrësve
const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/participants', { withCredentials: true });
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error.response || error.message);
    }
  };

  const deleteParticipant = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/participants/${id}`, { withCredentials: true });
      setParticipants(participants.filter((participant) => participant.id !== id));
    } catch (error) {
      console.error('Error deleting participant:', error.response || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista e Pjesëmarrësve</h1>
      <Link to="/add-participant" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Shto Pjesëmarrës</Link>
      {participants.map((participant) => (
        <div key={participant.id} className="border-b py-2">
          <p><strong>{participant.name}</strong> ({participant.email})</p>
          <Link to={`/edit-participant/${participant.id}`} className="text-blue-500">Redakto</Link>
          <button onClick={() => deleteParticipant(participant.id)} className="ml-4 bg-red-500 text-white px-2 py-1">Fshi</button>
        </div>
      ))}
    </div>
  );
};

// Eksporto të gjithë komponentët për t'i përdorur në aplikacionin tënd
export { AddParticipant, EditParticipant, ParticipantList };

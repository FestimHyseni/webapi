import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

// Komponenti për Shtimin e Sponsorëve
const AddSponsor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const addSponsor = async () => {
    if (!name || !email) {
      alert('Emri dhe email janë të detyrueshme!');
      return;
    }
    try {
      await axios.post('http://localhost:5000/sponsors', { name, email, phone, address }, { withCredentials: true });
      navigate('/sponsors');
    } catch (error) {
      console.error('Error adding sponsor:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shto Sponsorin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Adresa"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addSponsor}>Shto Sponsorin</button>
    </div>
  );
};

// Komponenti për Editimin e Sponsorëve
const EditSponsor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSponsor();
  }, [id]);

  const fetchSponsor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/sponsors/${id}`, { withCredentials: true });
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setAddress(response.data.address);
    } catch (error) {
      console.error('Error fetching sponsor:', error.response || error.message);
    }
  };

  const updateSponsor = async () => {
    if (!name || !email) {
      alert('Emri dhe email janë të detyrueshme!');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/sponsors/${id}`, { name, email, phone, address }, { withCredentials: true });
      navigate('/sponsors');
    } catch (error) {
      console.error('Error updating sponsor:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redakto Sponsorin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Adresa"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updateSponsor}>Përditëso Sponsorin</button>
    </div>
  );
};

// Komponenti për Listimin e Sponsorëve
const SponsorList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sponsors', { withCredentials: true });
        setSponsors(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsor();
  }, []);

  const deleteSponsor = async (id) => {
    console.log('Dërgimi i kërkesës për DELETE për ID-në:', id); // Log për debugging
    try {
      await axios.delete(`http://localhost:5000/sponsors/${id}`, { withCredentials: true });
      setSponsors(sponsors.filter(sponsor => sponsor.id !== id)); // Përditëso listën pas fshirjes
    } catch (err) {
      console.error('Gabim gjatë fshirjes së sponsorit:', err.message);
    }
  };
  if (loading) return <p>Po ngarkohen ...</p>;
  if (error) return <p>Gabim: {error}</p>;


  return (
    <div>
      <h1>Lista e Sponsorëve</h1>
      {sponsors.length === 0 ? (
        <p>Nuk ka sponsorë të shtuar.</p>
      ) : (
        <ul>
          {sponsors.map((sponsor) => (
            <li key={sponsor.id} className="mb-4">
              <h2 className="text-xl font-semibold">{sponsor.name}</h2>
              <p> {sponsor.email}</p>
              <p><strong>Telefoni:</strong> {sponsor.phone || 'Nuk është dhënë'}</p>
              <p><strong>Adresa:</strong> {sponsor.address || 'Nuk është dhënë'}</p>
              <div className="mt-2">
                <Link to={`/edit-sponsor/${sponsor.id}`} className="bg-yellow-500 text-white px-4 py-2">Redakto</Link>
                <button
                  onClick={() => deleteSponsor(sponsor.id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2"
                >
                  Fshi
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


// Eksportoni të gjithë komponentët për t'i përdorur në aplikacionin tuaj
export { AddSponsor, EditSponsor, SponsorList };

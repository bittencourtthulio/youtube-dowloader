import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://refreshing-beauty-production-f560.up.railway.app';
      const response = await fetch(`${apiUrl}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>YT Video Saver</h1>
      <p className="home-subtitle">Cole a URL do vídeo do YouTube para baixar</p>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          placeholder="Insira a URL do vídeo a ser baixado"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Baixando...' : 'Baixar'}
        </button>
      </form>
      {message && <p className="home-message">{message}</p>}
    </div>
  );
}

export default Home;

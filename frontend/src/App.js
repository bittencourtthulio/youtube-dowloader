import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3005';
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
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YT Video Saver</h1>
        <form onSubmit={handleDownload}>
          <input
            type="text"
            placeholder="Insira a URL do vídeo a ser baixado"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Baixar</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;

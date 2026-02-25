import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [directUrl, setDirectUrl] = useState('');
  const [directFilename, setDirectFilename] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setDownloadUrl('');
    setVideoTitle('');
    setThumbnail('');
    setDirectUrl('');
    setDirectFilename('');
    setCopied(false);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://refreshing-beauty-production-f560.up.railway.app';

      const [infoRes, directRes] = await Promise.all([
        fetch(`${apiUrl}/info`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        }),
        fetch(`${apiUrl}/direct-url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        }),
      ]);

      const data = await infoRes.json();
      const streamUrl = `${apiUrl}/stream?url=${encodeURIComponent(url)}`;

      if (infoRes.ok) {
        setVideoTitle(data.title);
        setThumbnail(data.thumbnail);
        setDownloadUrl(streamUrl);
        setMessage(`${data.title} - ${data.duration_string}`);
      } else {
        setMessage(data.error);
      }

      if (directRes.ok) {
        const directData = await directRes.json();
        setDirectUrl(streamUrl);
        setDirectFilename(directData.filename);
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
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {downloadUrl && (
        <div className="video-result">
          {thumbnail && <img src={thumbnail} alt={videoTitle} className="video-thumbnail" />}
          <p className="video-title">{message}</p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="download-btn">
            Download MP4
          </a>
          {directUrl && (
            <div className="direct-url-box">
              <p className="direct-url-label">{directFilename}</p>
              <div className="direct-url-row">
                <input type="text" readOnly value={directUrl} className="direct-url-input" />
                <button
                  className="copy-btn"
                  onClick={() => { navigator.clipboard.writeText(directUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!downloadUrl && message && <p className="home-message">{message}</p>}
    </div>
  );
}

export default Home;

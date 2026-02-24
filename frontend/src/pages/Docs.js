import React from 'react';
import './Docs.css';

function Docs() {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://refreshing-beauty-production-f560.up.railway.app';

  return (
    <div className="docs">
      <h1>API Documentation</h1>
      <p className="docs-subtitle">
        URL Base: <code>{apiUrl}</code>
      </p>

      <section className="docs-section">
        <div className="endpoint-card">
          <div className="endpoint-header">
            <span className="method post">POST</span>
            <span className="path">/download</span>
          </div>
          <p className="endpoint-desc">
            Inicia o download de um vídeo do YouTube utilizando o yt-dlp.
          </p>

          <h3>Headers</h3>
          <table>
            <thead>
              <tr>
                <th>Header</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Content-Type</code></td>
                <td><code>application/json</code></td>
              </tr>
            </tbody>
          </table>

          <h3>Body (JSON)</h3>
          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Tipo</th>
                <th>Obrigatório</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>url</code></td>
                <td>string</td>
                <td>Sim</td>
                <td>URL do vídeo do YouTube</td>
              </tr>
            </tbody>
          </table>

          <h3>Exemplo de Request</h3>
          <pre>
{`curl -X POST ${apiUrl}/download \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'`}
          </pre>

          <h3>Respostas</h3>

          <div className="response-block success">
            <div className="response-header">
              <span className="status-code">200</span> OK
            </div>
            <pre>{`{
  "message": "Vídeo baixado com sucesso!"
}`}</pre>
          </div>

          <div className="response-block error">
            <div className="response-header">
              <span className="status-code">400</span> Bad Request
            </div>
            <p>Retornado quando o campo <code>url</code> não é enviado.</p>
            <pre>{`{
  "error": "A URL do vídeo é necessária."
}`}</pre>
          </div>

          <div className="response-block error">
            <div className="response-header">
              <span className="status-code">500</span> Internal Server Error
            </div>
            <p>Retornado quando o yt-dlp falha ao processar o download.</p>
            <pre>{`{
  "error": "Erro ao baixar vídeo. Código de saída: 1"
}`}</pre>
          </div>
        </div>
      </section>

      <section className="docs-section">
        <h2>Tecnologias</h2>
        <ul className="tech-list">
          <li><strong>Runtime:</strong> Node.js 18</li>
          <li><strong>Framework:</strong> Express 4.19</li>
          <li><strong>Download Engine:</strong> yt-dlp</li>
          <li><strong>CORS:</strong> Habilitado para todas as origens</li>
        </ul>
      </section>
    </div>
  );
}

export default Docs;

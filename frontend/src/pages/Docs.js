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

      {/* POST /info */}
      <section className="docs-section">
        <div className="endpoint-card">
          <div className="endpoint-header">
            <span className="method post">POST</span>
            <span className="path">/info</span>
          </div>
          <p className="endpoint-desc">
            Retorna metadados completos e URL direta de um vídeo do YouTube.
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
{`curl -X POST ${apiUrl}/info \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'`}
          </pre>

          <h3>Respostas</h3>

          <div className="response-block success">
            <div className="response-header">
              <span className="status-code">200</span> OK
            </div>
            <pre>{`{
  "title": "Nome do Vídeo",
  "thumbnail": "https://i.ytimg.com/vi/.../maxresdefault.jpg",
  "duration": 212,
  "duration_string": "3:32",
  "channel": "Nome do Canal",
  "view_count": 1500000,
  "upload_date": "20240115",
  "description": "Descrição do vídeo...",
  "url": "https://...(URL direta do vídeo)",
  "formats": [
    {
      "format_id": "18",
      "ext": "mp4",
      "resolution": "360p",
      "filesize": 15000000,
      "url": "https://..."
    }
  ]
}`}</pre>
          </div>

          <h3>Campos da Resposta</h3>
          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>title</code></td>
                <td>string</td>
                <td>Título do vídeo</td>
              </tr>
              <tr>
                <td><code>thumbnail</code></td>
                <td>string</td>
                <td>URL da thumbnail</td>
              </tr>
              <tr>
                <td><code>duration</code></td>
                <td>number</td>
                <td>Duração em segundos</td>
              </tr>
              <tr>
                <td><code>duration_string</code></td>
                <td>string</td>
                <td>Duração formatada (ex: "3:32")</td>
              </tr>
              <tr>
                <td><code>channel</code></td>
                <td>string</td>
                <td>Nome do canal</td>
              </tr>
              <tr>
                <td><code>view_count</code></td>
                <td>number</td>
                <td>Número de visualizações</td>
              </tr>
              <tr>
                <td><code>upload_date</code></td>
                <td>string</td>
                <td>Data de upload (YYYYMMDD)</td>
              </tr>
              <tr>
                <td><code>description</code></td>
                <td>string</td>
                <td>Descrição do vídeo</td>
              </tr>
              <tr>
                <td><code>url</code></td>
                <td>string</td>
                <td>URL direta do vídeo (melhor qualidade)</td>
              </tr>
              <tr>
                <td><code>formats</code></td>
                <td>array</td>
                <td>Lista de formatos disponíveis com URLs individuais</td>
              </tr>
            </tbody>
          </table>

          <div className="response-block error">
            <div className="response-header">
              <span className="status-code">400</span> Bad Request
            </div>
            <pre>{`{
  "error": "A URL do vídeo é necessária."
}`}</pre>
          </div>

          <div className="response-block error">
            <div className="response-header">
              <span className="status-code">500</span> Internal Server Error
            </div>
            <pre>{`{
  "error": "Erro ao obter informações do vídeo.",
  "details": "..."
}`}</pre>
          </div>
        </div>
      </section>

      {/* POST /download */}
      <section className="docs-section">
        <div className="endpoint-card">
          <div className="endpoint-header">
            <span className="method post">POST</span>
            <span className="path">/download</span>
          </div>
          <p className="endpoint-desc">
            Retorna a URL direta de download do vídeo na melhor qualidade disponível.
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
  "message": "URL do vídeo obtida com sucesso!",
  "download_url": "https://...(URL direta do vídeo)"
}`}</pre>
          </div>

          <div className="response-block error">
            <div className="response-header">
              <span className="status-code">400</span> Bad Request
            </div>
            <pre>{`{
  "error": "A URL do vídeo é necessária."
}`}</pre>
          </div>

          <div className="response-block error">
            <div className="response-header">
              <span className="status-code">500</span> Internal Server Error
            </div>
            <pre>{`{
  "error": "Erro ao obter URL do vídeo.",
  "details": "..."
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

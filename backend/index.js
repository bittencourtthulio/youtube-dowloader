const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/info', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'A URL do vídeo é necessária.' });
  }

  const args = ['-j', '--no-download', url];
  const process = spawn('yt-dlp', args);

  let output = '';
  let errorOutput = '';

  process.stdout.on('data', (data) => {
    output += data.toString();
  });

  process.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  process.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Erro ao obter informações do vídeo.', details: errorOutput });
    }

    try {
      const videoData = JSON.parse(output);

      const formats = (videoData.formats || [])
        .filter((f) => f.url && f.ext)
        .map((f) => ({
          format_id: f.format_id,
          ext: f.ext,
          resolution: f.resolution || 'audio only',
          filesize: f.filesize || null,
          url: f.url,
        }));

      res.json({
        title: videoData.title,
        thumbnail: videoData.thumbnail,
        duration: videoData.duration,
        duration_string: videoData.duration_string,
        channel: videoData.channel,
        view_count: videoData.view_count,
        upload_date: videoData.upload_date,
        description: videoData.description,
        url: videoData.url || (formats.length > 0 ? formats[formats.length - 1].url : null),
        formats,
      });
    } catch (e) {
      res.status(500).json({ error: 'Erro ao processar dados do vídeo.' });
    }
  });
});

app.post('/direct-url', (req, res) => {
  const { url, format } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'A URL do vídeo é necessária.' });
  }

  const args = ['-j', '--no-download', '-f', format || 'b', url];
  const process = spawn('yt-dlp', args);

  let output = '';
  let errorOutput = '';

  process.stdout.on('data', (data) => {
    output += data.toString();
  });

  process.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  process.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Erro ao obter URL direta do vídeo.', details: errorOutput });
    }

    try {
      const data = JSON.parse(output);
      const ext = data.ext || 'mp4';
      const title = (data.title || 'video').replace(/[^a-zA-Z0-9_\-\s]/g, '');

      res.json({
        url: data.url,
        ext,
        filename: `${title}.${ext}`,
        resolution: data.resolution || null,
        filesize: data.filesize || data.filesize_approx || null,
      });
    } catch (e) {
      res.status(500).json({ error: 'Erro ao processar dados do vídeo.' });
    }
  });
});

app.get('/stream', (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'A URL do vídeo é necessária. Use ?url=YOUTUBE_URL' });
  }

  // Primeiro pega metadados para os headers
  const infoProc = spawn('yt-dlp', ['-j', '--no-download', '-f', 'b', url]);
  let infoOutput = '';
  let infoError = '';

  infoProc.stdout.on('data', (data) => { infoOutput += data.toString(); });
  infoProc.stderr.on('data', (data) => { infoError += data.toString(); });

  infoProc.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Erro ao obter informações do vídeo.', details: infoError });
    }

    try {
      const info = JSON.parse(infoOutput);
      const ext = info.ext || 'mp4';
      const title = (info.title || 'video').replace(/[^a-zA-Z0-9_\-\s]/g, '');
      const filename = `${title}.${ext}`;
      const mime = ext === 'webm' ? 'video/webm' : 'video/mp4';

      res.setHeader('Content-Type', mime);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      if (info.filesize) {
        res.setHeader('Content-Length', info.filesize);
      }

      // Faz streaming do vídeo direto para o response
      const dlProc = spawn('yt-dlp', ['-o', '-', '-f', 'b', url]);

      dlProc.stdout.pipe(res);

      dlProc.stderr.on('data', (data) => {
        console.error('yt-dlp stream stderr:', data.toString());
      });

      dlProc.on('error', () => {
        if (!res.headersSent) {
          res.status(500).json({ error: 'Erro ao fazer streaming do vídeo.' });
        }
      });

      res.on('close', () => {
        dlProc.kill();
      });
    } catch (e) {
      res.status(500).json({ error: 'Erro ao processar dados do vídeo.' });
    }
  });
});

app.post('/download', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'A URL do vídeo é necessária.' });
  }

  const args = ['--get-url', '-f', 'b', url];
  const process = spawn('yt-dlp', args);

  let output = '';
  let errorOutput = '';

  process.stdout.on('data', (data) => {
    output += data.toString();
  });

  process.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  process.on('close', (code) => {
    if (code === 0) {
      res.json({ message: 'URL do vídeo obtida com sucesso!', download_url: output.trim() });
    } else {
      res.status(500).json({ error: 'Erro ao obter URL do vídeo.', details: errorOutput });
    }
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

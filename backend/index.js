const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/download', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: 'A URL do vídeo é necessária.' });
  }

  const videoDir = path.resolve(os.homedir(), 'Downloads');
  const command = 'yt-dlp';
  const args = ['-o', `${videoDir}/%(title)s.%(ext)s`, url];

  const downloadProcess = spawn(command, args);

  downloadProcess.stdout.on('data', (data) => {
    console.log(`Status: ${data}`);
  });

  downloadProcess.stderr.on('data', (data) => {
    console.error(`Erro: ${data}`);
  });

  downloadProcess.on('close', (code) => {
    if (code === 0) {
      res.send({ message: 'Vídeo baixado com sucesso!' });
    } else {
      res.status(500).send({ error: `Erro ao baixar vídeo. Código de saída: ${code}` });
    }
  });
});

app.listen(3005, () => {
  console.log('Servidor rodando na porta 3005');
});

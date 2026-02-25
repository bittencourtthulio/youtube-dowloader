# Use a imagem oficial do Node.js como base
FROM node:18

# Instale o yt-dlp e ffmpeg
RUN apt-get update && apt-get install -y python3 ffmpeg unzip && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp && \
    curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/usr/local sh && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependências primeiro
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta usada pela aplicação
EXPOSE 3005

# Comando para iniciar o servidor
CMD ["npm", "start"]

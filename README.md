# YouTube Video Downloader

![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)
![Express](https://img.shields.io/badge/Express-4.19-lightgrey.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Suportado-blue.svg)

Este é um serviço para **download de vídeos do YouTube**, utilizando **Node.js** com **Express** no backend e **React** no frontend. O sistema permite que os usuários insiram o link de um vídeo do YouTube e façam o download no formato **MP4**.

## Funcionalidades

- Download de vídeos do YouTube via **yt-dlp**.
- Interface simples e intuitiva para inserir o link e baixar o vídeo.
- Suporte a **Docker** para facilitar a execução.

## Tecnologias Utilizadas

### Backend (Node.js - Express)
- **Node.js 18**
- **Express 4.19** (Framework backend)
- **yt-dlp** (Download de vídeos)
- **CORS** (Habilita CORS para integração com o frontend)

### Frontend (React)
- **React 18.3**
- **Create React App** (Toolchain)

## Pré-requisitos

- **Node.js 18 ou superior**
- **yt-dlp** instalado no sistema (apenas para execução local sem Docker)
- **Docker e Docker Compose** (opcional, para execução em containers)

## Como Executar o Projeto

### Com Docker (recomendado)

```sh
docker-compose up --build
```

- Frontend: http://localhost:8099
- Backend: http://localhost:3005

### Sem Docker

#### Backend
```sh
cd backend
npm install
npm start
```

#### Frontend
```sh
cd frontend
npm install
npm start
```

## Variáveis de Ambiente

### Frontend
| Variável | Descrição | Padrão |
|---|---|---|
| `REACT_APP_API_URL` | URL base da API do backend | `http://localhost:3005` |

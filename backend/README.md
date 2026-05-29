# Backend - Sistema de Citas Medicas

## 1) Instalacion

```bash
cd backend
npm install
```

## 2) Variables de entorno

Crear archivo `.env` tomando como base `.env.example`.

Contenido recomendado:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=12345
DB_NAME=sistema_citas_medicas
JWT_SECRET=super_secret_change_me
```

## 3) Ejecutar

```bash
npm run dev
```

## 4) Endpoints principales

Base URL: `http://localhost:3000/api`

- `POST /auth/login`
- `GET/POST/PUT/DELETE /pacientes`
- `GET/POST/PUT/DELETE /medicos`
- `GET/POST/PUT/DELETE /hospitales`
- `GET/POST/PUT/DELETE /citas`
- `GET/POST/PUT/DELETE /historial`
- `GET /historial/paciente/:pacienteId`

## 5) Health checks

- `GET /health`
- `GET /api`

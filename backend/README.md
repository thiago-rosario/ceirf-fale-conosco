# CEIRF API

API basica para receber mensagens do formulario e listar no painel `/admin`.

## Como rodar

```bash
npm install
npm run dev:api
```

A API sobe em `http://localhost:3001`.

## Endpoints

- `POST /api/messages` (JSON)
- `GET /api/messages?limit=200&offset=0`
- `GET /api/health`

## Variaveis de ambiente

- `PORT` (padrao: 3001)
- `API_TOKEN` (padrao: `ceirf-2026`)
- `DB_PATH` (padrao: `backend/data/messages.db`)
- `ADMIN_USER` e `ADMIN_PASS` (se definidos, protegem `/admin` com Basic Auth)

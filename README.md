# small web

Browser UI + API for a tiny web of one-page sites.

Stack: Next.js, NestJS, MongoDB, TypeScript.

## run

Need Node. Mongo can be local or Atlas (set `backend/.env`).

```bash
# 1) api
cd backend
cp .env.example .env
npm install
npm run start:dev

# 2) seed (safe to run more than once)
cd backend
npm run seed

# 3) ui
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

- ui: http://localhost:3000
- api: http://localhost:3001
- health: `GET http://localhost:3001/health`

## notes

- seed wipes people/sites/visits then loads demo data
- don't commit `.env` files

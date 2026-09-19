# small web

Take-home for Wyxan. Tiny web of one-page sites + a browser UI to read them.

Stack: Next.js, NestJS, MongoDB, TypeScript.

## setup

Need Node and Mongo running locally.

```bash
# api
cd backend
npm install
npm run start:dev

# seed (resets people/sites/visits, safe to run twice)
cd backend
npm run seed

# ui
cd frontend
npm install
npm run dev
```

- api: http://localhost:3001
- ui: http://localhost:3000

`GET /health` if you want a quick check that the api is up.

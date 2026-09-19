# FlowDesk – Team Task & Project Management Platform

Professional MERN SaaS: workspaces, RBAC, projects, Kanban tasks, comments, activity, notifications.

## Stack
- Backend: Express, Mongoose, Zod, JWT cookies, Helmet, rate-limit, Pino, modular monolith, `/api/v1`
- Frontend: React + TS + Vite + Tailwind, TanStack Query, Zustand, Axios with refresh

## Run backend
```bash
cd server
npm install
npm run dev
```

## Run frontend
```bash
cd client
npm install
npm run dev
```

## Env
Copy `server/.env.example` semantics; local `server/.env` is git-ignored and uses Atlas `flowdesk` DB.

# Team Task Manager Backend

Backend API for a full-stack Team Task Manager application built using Node.js, Express, Prisma, and PostgreSQL.

## Features

- User Authentication (JWT)
- Role-Based Access Control (Admin / Member)
- Project Management
- Task Assignment
- Task Status Updates
- Dashboard Statistics
- Protected Routes
- PostgreSQL Database
- Prisma ORM

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Railway (Deployment)

---

## API Routes

### Auth

- POST `/api/auth/signup`
- POST `/api/auth/login`

### Projects

- POST `/api/projects`
- GET `/api/projects`

### Tasks

- POST `/api/tasks`
- GET `/api/tasks/my-tasks`
- PUT `/api/tasks/:id/status`

### Dashboard

- GET `/api/dashboard`

### Users

- GET `/api/users`

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

## Installation

```bash
npm install
```

Run migrations:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

---

## Deployment

Backend deployed using Railway.

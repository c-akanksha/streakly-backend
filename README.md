# Streakly Backend 🚀

Backend REST API for **Streakly**, a habit tracking and streak management app built with Node.js, Express, and MongoDB.

This API handles user authentication, streak creation, and daily streak tracking.


## ✨ Features

- User signup (username, email, password)
- Secure password hashing with bcrypt
- JWT authentication
- Protected routes
- Create streaks
- Get all user streaks
- Mark streak as completed
- Unit testing with Jest & Supertest
- MongoDB integration with Mongoose
- Production-ready structure

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
-  Web Token (JWT)
- bcryptjs
- dotenv
- CORS
- Jest
- Supertest
- MongoDB Memory Server (for testing)


## 📂 Project Structure

```
streakly-backend/
│
├── models/
│ ├── User.js
│ └── Streak.js
│
├── routes/
│ ├── auth.js
│ └── streak.js
│
├── middleware/
│ └── authMiddleware.js
│
├── tests/
│
├── server.js
├── package.
└── README.md
```

## ⚙️ Installation & Running Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/streakly-backend.git
cd streakly-backend

```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Setup environment variables

```ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=8080
```

### 4️⃣ Run the server

Development mode:
```
npm run dev
```
Production mode:
```
npm run dev
```
Server runs on:
```
http://localhost:8080
```

## 🔐 Authentication
After login, the API returns a JWT token.

Protected routes require:
```
Authorization: Bearer <JWT_TOKEN>
```

## API Documentation (Swagger Style)

### 🔑 Auth Routes
**🔹 POST /api/auth/signup**
Create a new user.

Request Body:
```
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}
```
Response:
```
{
  "message": "User signed up"
}
```
**🔹 POST /api/auth/login**

Login user and receive JWT token.

Request Body:
```
{
  "username": "john",
  "password": "123456"
}
```
Response:
```
{
  "token": "jwt_token_here",
  "message": "User logged in"
}
```

### 🔥 Streak Routes (Protected)

All streak routes require JWT authentication.

**🔹 GET /api/streaks**

Get all streaks for the logged-in user.

Headers:
```
Authorization: Bearer <token>
```
Response:
```
[
  {
    "_id": "streak_id",
    "title": "Drink Water",
    "currentStreak": 5,
    "lastCompleted": "2026-02-13T00:00:00.000Z"
  }
]
```

**🔹 POST /api/streaks**

Create a new streak.

Headers:
```
Authorization: Bearer <token>
```
Request Body:
```
{
  "title": "Read 10 pages"
}
```
Response:
```
{
  "_id": "streak_id",
  "title": "Read 10 pages",
  "currentStreak": 0
}
```

**🔹 PUT /api/streaks/:id/done**

Mark a streak as completed for today.

Headers:
```
Authorization: Bearer <token>
```
Response:
```
{
  "_id": "streak_id",
  "title": "Read 10 pages",
  "currentStreak": 6,
  "lastCompleted": "2026-02-14T00:00:00.000Z"
}
```
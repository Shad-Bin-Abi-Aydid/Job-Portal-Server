# 💼 Job Portal — Server

The REST API backend for the Job Portal application. Handles job listings, applications, and JWT-based authentication using cookies.

🔗 **Frontend Repo:** [Job-Portal-Client](https://github.com/Shad-Bin-Abi-Aydid/Job-Portal-Client)  
🔗 **Live App:** [https://job-portal-52572.firebaseapp.com](https://job-portal-52572.firebaseapp.com)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express v5 |
| Database | MongoDB (native driver) |
| Authentication | JWT (via HTTP-only cookies) |
| Deployment | Vercel |

---

## 🔐 Authentication

Authentication uses **Firebase on the client** for sign-in, and **JWT tokens stored in HTTP-only cookies** on the server for protecting API routes. This prevents token theft via XSS attacks.

---

## 📡 API Endpoints

### Jobs
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/jobs` | Get all job listings | Public |
| GET | `/jobs/:id` | Get a single job by ID | Public |
| POST | `/jobs` | Post a new job | 🔒 Required |
| DELETE | `/jobs/:id` | Delete a job posting | 🔒 Required |

### Applications
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/applications` | Get applications for logged-in user | 🔒 Required |
| POST | `/applications` | Submit a job application | 🔒 Required |
| DELETE | `/applications/:id` | Withdraw an application | 🔒 Required |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/jwt` | Generate and set JWT cookie |
| POST | `/logout` | Clear JWT cookie |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB database (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/Shad-Bin-Abi-Aydid/Job-Portal-Server.git
cd Job-Portal-Server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the server

```bash
node index.js
```

The server will run at `http://localhost:5000`

---

## 🔗 Related

- **Frontend:** [Job-Portal-Client](https://github.com/Shad-Bin-Abi-Aydid/Job-Portal-Client) — React app with Firebase Auth

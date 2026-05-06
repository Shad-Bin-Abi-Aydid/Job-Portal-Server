# 💼 CareerConnect — Job Portal Server

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-v5-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

> Backend REST API for CareerConnect — a full-stack job portal where employers post listings and candidates apply. Secured with JWT stored in HTTP-only cookies.

> 🔗 Frontend repository: [Job-Portal-Client](https://github.com/Shad-Bin-Abi-Aydid/Job-Portal-Client)
> 🌐 Live Frontend: [https://job-portal-52572.web.app](https://job-portal-52572.web.app)

---

## ✨ Features

- 🔐 JWT authentication stored in HTTP-only cookies
- 💼 Job listings — create, browse, and delete
- 📋 Application management — apply and track
- 🛡️ Protected routes with JWT verification middleware
- 🌐 CORS configured for frontend integration
- 🚀 Deployed on Vercel

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js v18+ | JavaScript runtime |
| Express.js v5 | REST API framework |
| MongoDB | NoSQL database (native driver) |
| JSON Web Tokens | Stateless authentication |
| cookie-parser | HTTP-only cookie handling |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| Vercel | API deployment |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/jwt` | Public | Generate JWT token and set cookie |
| POST | `/logout` | Public | Clear JWT cookie and logout |

### Jobs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/jobs` | Public | Get all job listings |
| GET | `/jobs/:id` | Public | Get single job listing |
| POST | `/jobs` | Authenticated | Post a new job listing |
| DELETE | `/jobs/:id` | Authenticated | Delete a job listing |

### Applications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/applications` | Authenticated | Get all applications |
| POST | `/applications` | Authenticated | Submit a job application |
| DELETE | `/applications/:id` | Authenticated | Delete an application |

---

## 🔐 Authentication Flow

```
Login → POST /jwt → JWT stored in HTTP-only cookie → Protected API Routes
```

- JWT is issued on login and stored in an HTTP-only cookie
- Cookie is automatically sent with each subsequent request
- Protected routes verify the token before returning data
- Logout clears the cookie via POST `/logout`

---

## 🏗️ Project Structure

```
job-portal-server/
├── index.js          # Express app — routes, middleware, DB connection
├── vercel.json       # Vercel deployment config
├── package.json      # Dependencies
└── .env              # Environment variables (not committed)
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB database ([mongodb.com](https://www.mongodb.com))

### 1. Clone the repository
```bash
git clone https://github.com/Shad-Bin-Abi-Aydid/Job-Portal-Server.git
cd Job-Portal-Server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
PORT=5000
```

### 4. Run the development server
```bash
node index.js
```

API runs at **http://localhost:5000**

---

## 🌐 Deployment

This API is deployed on **Vercel** using `vercel.json` configuration.

```bash
vercel --prod
```

---

## 👨‍💻AutHor

**Shad Bin Abi Aydid**
- Portfolio: [shadaydid.com](https://shadaydid.com)
- GitHub: [@Shad-Bin-Abi-Aydid](https://github.com/Shad-Bin-Abi-Aydid)
- LinkedIn: [shad-aydid](https://www.linkedin.com/in/shad-aydid)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

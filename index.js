const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://job-portal-52572.web.app",
      "https://job-portal-52572.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

// MongoDB Connection Setup
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_password}@cluster0.oetnlio.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Cache the database connection
let db;
async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db("jobPortal");
  return db;
}

// --- Auth Related APIs ---
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5h" });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
});

app.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ message: "LogOut successful" });
});

// --- Jobs Related APIs ---
app.get("/jobs", async (req, res) => {
  const database = await connectDB();
  const jobsCollection = database.collection("jobs");
  const email = req.query.email;
  let query = email ? { hr_email: email } : {};
  const result = await jobsCollection.find(query).toArray();
  res.send(result);
});

app.get("/jobs/:id", async (req, res) => {
  const database = await connectDB();
  const jobsCollection = database.collection("jobs");
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await jobsCollection.findOne(query);
  res.send(result);
});

app.post("/jobs", async (req, res) => {
  const database = await connectDB();
  const jobsCollection = database.collection("jobs");
  const newJob = req.body;
  const result = await jobsCollection.insertOne(newJob);
  res.send(result);
});

app.delete("/jobs/:id", verifyToken, async (req, res) => {
  const database = await connectDB();
  const jobsCollection = database.collection("jobs");
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await jobsCollection.deleteOne(query);
  res.send(result);
});

// --- Job Application APIs ---
app.get("/job-applications",verifyToken, async (req, res) => {
  const database = await connectDB();
  const jobsCollection = database.collection("jobs");
  const jobApplicationCollection = database.collection("job-applications");
  
  const email = req.query.email;
  const query = { applicant_email: email };
  const result = await jobApplicationCollection.find(query).toArray();

  // Optimized lookup
  for (const application of result) {
    const job = await jobsCollection.findOne({ _id: new ObjectId(application.job_id) });
    if (job) {
      application.title = job.title;
      application.company = job.company;
      application.company_logo = job.company_logo;
      application.location = job.location;
      application.category = job.category;
    }
  }
  res.send(result);
});

app.post("/job-applications", async (req, res) => {
  const database = await connectDB();
  const jobApplicationCollection = database.collection("job-applications");
  const application = req.body;
  const result = await jobApplicationCollection.insertOne(application);
  res.send(result);
});

app.get("/job-applications/jobs/:job_id", async (req, res) => {
  const database = await connectDB();
  const jobApplicationCollection = database.collection("job-applications");
  const query = { job_id: req.params.job_id };
  const result = await jobApplicationCollection.find(query).toArray();
  res.send(result);
});

app.patch("/job-applications/:id", async (req, res) => {
  const database = await connectDB();
  const jobApplicationCollection = database.collection("job-applications");
  const filter = { _id: new ObjectId(req.params.id) };
  const updatedDoc = { $set: { status: req.body.status } };
  const result = await jobApplicationCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

app.delete("/job-applications/:id", verifyToken, async (req, res) => {
  const database = await connectDB();
  const jobApplicationCollection = database.collection("job-applications");
  const query = { _id: new ObjectId(req.params.id) };
  const result = await jobApplicationCollection.deleteOne(query);
  res.send(result);
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Job Portal Server is running");
});

// Start Server locally
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for Vercel
module.exports = app;
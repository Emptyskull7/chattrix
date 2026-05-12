import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors';
import path from "path";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config();


const PORT = process.env.PORT || 9001

const __dirname = path.resolve();

// CORS configuration - allow requests from Vercel and localhost
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://chattrix.vercel.app",
];

app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());


//Mounting the Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Health check endpoints
app.get("/", (req, res) => {
  res.json({ message: "Backend is running..." });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req,res)=>{
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//     })
// }

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT} port..`);
    connectDB();
})
import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import cors from 'cors';

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

import { connectDB } from "./lib/db.js";
const app = express();
dotenv.config();


const PORT = process.env.PORT
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true, //allow frontend to send cookies
}))

app.use(cookieParser());
app.use(express.json());


//Mounting the Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT} port..`);
    connectDB();
})
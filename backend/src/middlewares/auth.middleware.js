import { StreamChat } from 'stream-chat'; 
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) =>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message:"Unauthorized - No token provided."
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({
                message:"Unautorized - Invalid token"
            })
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({
                message:"Unauthorized- User not found."
            })
        }
        req.user = user;
        
        next();

    }catch(err){
        console.log("Error in protected middleware.", err);
        res.status(500).json({
            message:"Interval server error.",
        })
    }
}
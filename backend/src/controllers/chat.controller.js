import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req,res) {
    try{
        const token = generateStreamToken(req.user.id);
        res.status(200).json({token});
    }catch(err){
        console.log("Error in generateStreamToken Controller.", err.message);
        res.status(500).json({message:"Interval server error."})
    }
}
import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream Api Key or Api Secret is Missing.");
}


const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (err) {
    console.log("Error upserting stream User.", err);
  }
};


//Todo: doing it later
export const generateStreamToken = (userId) => {
    try{
        //ensure userId must be a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    }catch(err){
        console.log("Error in generating Stream Token. ", err.message);
    }
}

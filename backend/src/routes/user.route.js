import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getMyFriends,
  getRecommendedUsers,
  acceptFriendRequest,
  sendFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequests,
} from "../controllers/user.controller.js";

const router = express.Router();

//Applying auth middleeware for every Route
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-requests/:id", sendFriendRequest);
router.put("/friend-requests/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;

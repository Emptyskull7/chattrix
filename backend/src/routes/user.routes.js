import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMyFriends, getRecommendedUsers , friendRequest, acceptFriendRequest } from '../controllers/user.controller.js';

const router = express.Router();

//Applying auth middleeware for every Route
router.use(protectRoute);

router.get('/', getRecommendedUsers);
router.get('/friends',getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.post("/friend-request/:id/accept", acceptFriendRequest);


export default router;
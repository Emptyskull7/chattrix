import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getMyFriends, getRecommendedUsers } from '../controllers/user.controller.js';

const router = express.Router();

//Applying auth middleeware for every Route
router.use(protectRoute);

router.get('/', getRecommendedUsers);
router.get('/friends',getMyFriends);

export default router;
import User from "../models/User";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //excluding current user
        { $id: { $nin: currentUser.friends } }, //exclude current user's friend
        { isOnboarded: true },
      ],
    });
    return res.status(200).json(recommendedUser);
  } catch (err) {
    console.log("Error in getRecommendedUser controller", err.message);
    res.status(500).json({
      message: "Interval server error",
    });
  }
}

export async function getMyFriends(req, res) {
  try{
    const user = await User.findById(req.user.id)
    .select("friends")
    .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
    res.status(200).json(user.friends);
    
  }catch(err){
    console.log("Error in getMyFriends controller", err.message);
    res.status(500).json({
        message:"Interval server error",
    })
  }
}

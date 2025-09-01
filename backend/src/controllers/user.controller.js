import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId }}, //excluding current user
        { _id: { $nin: currentUser.friends } },//  //exclude current user's friend
        { isOnboarded: true },
      ],
    });
    console.log("Recommended count:", recommendedUsers.length);
    console.log("Friends:", currentUser.friends);
    res.status(200).json(recommendedUsers);
  } catch (err) {
    console.log("Error in getRecommendedUsers controller", err.message);
    res.status(500).json({
      message: "Interval server error",
    });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (err) {
    console.log("Error in getMyFriends controller", err.message);
    res.status(500).json({
      message: "Interval server error",
    });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;
    
    console.log("Friend request attempt:", { myId, recipientId });

    //Preventing to send friend Request to yourself
    if (myId == recipientId) {
      console.log("❌ Tried to send request to self");
      return res.status(400).json({
        message: "Cannot send a friend request to yourself.",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      console.log("❌ Recipient not found in DB");
      return res.status(400).json({
        message: "Recipient not Found.",
      });
    }

    //checking users are already friends
    if (recipient.friends.includes(myId)) {
      console.log("❌ Already friends");
      return res.status(400).json({
        message: "Your are already friends to each other.",
      });
    }

    //check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      console.log("❌ Request already exists");
      return res.status(400).json({
        message:
          "A friend request is already existing between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    console.log("✅ Friend request created:", friendRequest);

    res.status(201).json(friendRequest);
  } catch (err) {
    console.log("Error in sending friend request. ", err.message);
    return res.status(500).json({
      message: "Interval Server Error.",
    });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend Request not found",
      });
    }

    //Verify the current user is a recepient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Yor are not authorized to accept this request.",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    //adding each user to the other's friends array
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: {
        friends: friendRequest.recipient,
      },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: {
        friends: friendRequest.sender,
      },
    });

    res.status(200).json({
      message: "Friend request accepted.",
    });
  } catch (err) {
    console.log("Error in accepting friend request controller.", err.message);
    return res.status(500).json({
      message: "Interval sever error.",
    });
  }
}

export async function getFriendRequests(req, res) {
  try {
    console.log("🔥 Current user:", req.user);
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    return res.status(200).json({
      incomingReqs,
      acceptedReqs,
    });
  } catch (err) {
    console.log("Error in getFriendRequests controller. ",err.message );
    return res.status(500).json({
        message:"Interval Server Error."
    });
  }
}
// export async function getFriendRequests(req, res) {
//   try {
//     const incomingReqs = await FriendRequest.find({
//       recipient: req.user.id,
//       status: "pending",
//     }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

//     const acceptedReqs = await FriendRequest.find({
//       sender: req.user.id,
//       status: "accepted",
//     }).populate("recipient", "fullName profilePic");

//     res.status(200).json({ incomingReqs, acceptedReqs });
//   } catch (error) {
//     console.log("Error in getPendingFriendRequests controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

export async function getOutgoingFriendRequests(req,res) {
    try{
        const outgoingRequests = await FriendRequest.find({
            sender:req.user.id,
            status:"pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);

    }   catch(err){
        console.log("Error in getOutGoingFriendRequests contoller. ", err.message);
        res.status(500).json({
            message:"Interval server error."
        });
    } 
}



const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleswares/requireLogin");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");

router.get("/user/:id", async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.params.id }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await POST.find({ postedBy: req.params.id })
      .populate("postedBy", "_id name Photo")
      .populate("comments.postedBy", "_id name Photo");

    res.status(200).json({ user, posts });
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

router.put("/follow", requireLogin, async (req, res) => {
  try {
    const updatedFollowedUser = await USER.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );

    const updatedCurrentUser = await USER.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      { new: true }
    );

    res.json({ updatedFollowedUser, updatedCurrentUser });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const updatedUnfollowedUser = await USER.findByIdAndUpdate(
      req.body.followId,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    );

    const updatedCurrentUser = await USER.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.followId },
      },
      { new: true }
    );

    res.json({ updatedUnfollowedUser, updatedCurrentUser });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/uploadProfilePic", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic },
    },
    {
      new: true,
    }
  )
    .then((result) => res.json(result))
    .catch((err) => res.status(422).json(err));
});

module.exports = router;

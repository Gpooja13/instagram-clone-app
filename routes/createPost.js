const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleswares/requireLogin");
const POST = mongoose.model("POST");

router.get("/allPosts", requireLogin, (req, res) => {
  let limit = req.query.limit;
  let skip = req.query.skip;
  POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name Photo")
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createPost", requireLogin, (req, res) => {
  const { body, photo,mediaType } = req.body;
  if (!photo || !body ||!mediaType) {
    return res.status(422).json({ error: "Enter all details" });
  }
 
  const post = new POST({ body, photo, postedBy: req.user,mediaType });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myPosts", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name Photo")
    .sort("-createdAt")
    .then((mypost) => res.json(mypost));
});

router.put("/like", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  POST.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name Photo")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/uncomment", requireLogin, async (req, res) => {
  try {
    const result = await POST.updateOne(
      { _id: req.body.id },
      { $pull: { comments: { _id: req.body.cid } } }
    );
    
    res.json(result);
  } catch (err) {
    return res.status(422).json({ error: err });
  }
});


router.delete("/deletePost/:postId", requireLogin, (req, res) => {
  POST.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(422).json({ error: "Post not found" });
      }

      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .deleteOne()
          .then(() => {
            return res.json({ message: "Successfully Deleted" }); //not showing
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/myfollowingpost", requireLogin, (req, res) => {
  POST.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jwtSecret = process.env.JWT_SECRET;

router.post("/signUp", (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(422).json({ error: "Please send all the details" });
  }
  USER.findOne({ $or: [{ email: email }, { username: username }] }).then(
    (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with this username or email" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new USER({
          name,
          username,
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved successfully" });
          })
          .catch((error) => console.log(error));
      });
    }
  );
});

router.post("/signIn", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please send all the details" });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ id: savedUser._id }, jwtSecret);
          const { _id, name, email, username,Photo } = savedUser;
          res.json({ token, user: { _id, name, email, username ,Photo} });
          // return res.status(200).json({ message: "Signed in successfully" });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/googleLogin", (req, res) => {
  const { email_verified, email, name, clientId, username, Photo } = req.body;
  if (email_verified) {
    USER.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          const token = jwt.sign({ id: savedUser._id }, jwtSecret);
          const { _id, name, email, username } = savedUser;
          res.json({ token, user: { _id, name, email, username } });
        } else {
          const password = email + clientId;
          const newUserName = username.split("@")[0];
          const user = new USER({
            name,
            username: newUserName,
            email,
            password: password,
            Photo,
          });
          user.save().then((user) => {
            let userId = user._id.toString();
            const token = jwt.sign({ id: userId }, jwtSecret);
            const { _id, name, email, username } = user;
            res.json({ token, user: { _id, name, email, username } });
           
          });
        }
      })
      .catch((error) => console.log(error));
  }
});

module.exports = router;

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Login first" });
  } else {
   
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        console.log(payload)
      if (error) {
        return res.status(401).json({ error: "Login first" });
      }
      const { id } = payload;
      USER.findById(id).then((userData) => {
        req.user=userData
        next();
      });
    });
  }
};

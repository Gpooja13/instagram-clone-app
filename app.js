const express = require("express");
const app = express();
const PORT = process.env.port || 5000;
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

app.use(cors());
require("./models/models");
require("./models/post");
app.use(express.json());
app.use(require("./routes/createPost"));
app.use(require("./routes/auth"));
app.use(require("./routes/user"));

mongoose.connect(
  "mongodb+srv://gpooja13:OnMGKLLko0Zsohy9@cluster0.2srtyqa.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("Successfully Connected to mongodb");
});

mongoose.connection.on("error", () => {
  console.log("Not Connected to mongodb");
});

//serving the frontend
// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html")),
//     function (err) {
//       res.status(500).send(err);
//     }
// });

app.listen(PORT, () => {
  console.log("Connected to server on " + PORT);
});

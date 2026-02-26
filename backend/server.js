
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/cloudcart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  email: String,
  password: String,
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) res.json({ message: "Login successful" });
  else res.status(401).json({ message: "Invalid credentials" });
});

app.get("/", (req, res) => {
  res.send("CloudCart API Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));

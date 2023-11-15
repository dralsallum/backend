const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const applyRoute = require("./routes/apply");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const postRoute = require("./routes/posts");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

app.use("/images", express.static(path.join(__dirname, "images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post(
  "/api/upload",
  upload.single("file"),
  (req, res) => {
    res.status(200).json("File has been uploaded");
  },
  (error, req, res, next) => {
    // Error handling jpg
    res.status(400).send({ error: error.message });
  }
);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/posts", postRoute);
app.use("/api/applies", applyRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running!");
});

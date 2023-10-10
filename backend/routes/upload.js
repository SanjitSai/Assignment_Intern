const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 3004;
const fs = require("fs");
const { User, userService } = require("../userService");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.put("/uploadimage", upload.single("testImage"), (req, res) => {
  const saveImage = User({
    name: req.body.name,
    img: {
      data: req.body.testImage, // Use the base64 image data from the request body
      contentType: "image/png",
    },
  });

  saveImage
    .save()
    .then((result) => {
      console.log("Image is saved to the database");
      res.send('Image is saved');
    })
    .catch((err) => {
      console.log("Error occurred while saving image:", err);
      res.status(500).json({ error: "Error occurred while saving image" });
    });
});

app.get('/image', async (req, res) => {
  const allData = await User.find();
  res.json(allData);
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});

const express = require("express");
const { createArticle } = require("../Controllers/article.controller");
const multer = require("multer");

const articleRouter = express.Router(); // ✅ Correct way to create a router

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// API Route with Image Upload

articleRouter.post("/createArticle",upload.single("article_image"), createArticle);

module.exports = { articleRouter }; 

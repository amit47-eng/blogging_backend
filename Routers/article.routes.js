const express = require("express");
const multer = require("multer");
const path = require("path");
const { createArticle } = require("../Controllers/article.controller");

const articleRouter = express.Router(); // ✅ Define the router first

// Ensure 'uploads' directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

articleRouter.get("/articles", async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// ✅ Define the route using `articleRouter`
articleRouter.post("/createArticle", upload.single("article_image"), createArticle);

module.exports = articleRouter; // ✅ Export the router

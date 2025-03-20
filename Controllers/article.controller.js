const { Article } = require("../Models/article.model");
const {User} = require("../Models/user.model")

const createArticle = async (req, res) => {
  try {
    const { article_title, article_description, user, tags } = req.body;
    const article_image_url = req.file ? `/uploads/${req.file.filename}` : ""; // Get image URL

    if (!article_title || article_title.length < 10) {
      return res.status(400).json({ message: "Title must be at least 10 characters long." });
    }
    if (!article_description || article_description.length < 10) {
      return res.status(400).json({ message: "Description must be at least 10 characters long." });
    }

    const newArticle = new Article({
      article_title,
      article_description,
      user,
      article_image_url,
      tags,
    });

    await newArticle.save();
    res.status(201).json({ message: "Article created successfully!", article: newArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

function getPosts(req, res) {
  Article.find()
    .populate({ path: "comments" })
    .select("-comments")
    .then((response) => {
      res.status(200).json({
        Message: "Posts are Successfully fetched!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong", error: error });
    });
}
async function deletePostById(req, res) {

  let { id } = req.user;
  let { postId } = req.params;
  let user = await User.findOne({ _id: id });
  if(!user.article.includes(postId)){
    return res.status(400).json({Message: "You are not authorized to delete this post"})
  }
  Article.findOne
  let post = await Article.findOneAndDelete({ _id: postId });
 

}

module.exports = { createArticle, getPosts, deletePostById };

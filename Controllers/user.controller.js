const { User } = require("../Models/user.model");
var bcrypt = require("bcrypt");
const { response } = require("express");
var jwt = require("jsonwebtoken");
require("dotenv").config();

function createUser(req, res) {
  console.log("Received Data:", req.body); // Debugging

  User.create(req.body)
    .then((response) => {
      res
        .status(201)
        .json({ message: "User registered successfully", response: response });
    })
    .catch((error) => {
      console.error("Error creating user:", error); // Log full error
      res.status(500).json({
        message: "Something went wrong while creating user",
        error: error.message, // Send error message for debugging
      });
    });
}


async function loginUser(req, res) {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist, please register" });
    }

    let isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    let token = await jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h", algorithm: "HS256" }
    );

    if (token) {
      res.cookie("myToken", token);
      res.status(200).json({ message: "You have successfully logged in" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
}

function getUsers(req, res) {
  User.find(req.body)
    .then((response) => {
      res.status(200).json({ message: "Users retrieved successfully", response: response });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
}

function deleteUser(req,res){
let useremail =req.body.email
 User.deleteMany({email:useremail}).then((responce)=>{
    res.status(200).json({ message: "Users deleted successfully", response: responce });
  })
  .catch((err) => {
    res.status(500).json({ message: "Somethings wrong", error: err });
  console.log(err)
  })
}

function getUserById(req, res) {
  let { id } = req.params;
  User.findOne({ _id: id })
    .then((response) => {
      res.status(200).json({
        Message: "User is fetched!! Successfully!",
        response: response,
      });
    })
    .catch((error) => {
      res.status(500).json({ Message: "Something went wrong", error: error });
    });
}
async function subscribeUser(req, res) {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, {
      isSubscribed: true,
    });
    if (!updateUser) {
      return res.status(404).json({ Message: "Page not found!" });
    }
    res.status(200).json({ Message: "User is Subscribed" });
  } catch (err) {
    res.status(500).json({ Message: "Something went wrong", error: error });
  }
}

module.exports = { 
  createUser, 
  loginUser, 
  getUsers, 
  deleteUser, 
  getUserById, 
  subscribeUser 
};

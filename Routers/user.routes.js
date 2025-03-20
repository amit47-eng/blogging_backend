var express = require("express");
const { createUser, loginUser, getUsers, deleteUser, getUserById, subscribeUser } = require("../Controllers/user.controller");
const {isLoggedIn} = require("../Middlewares/login.middlewares");
const { authorizeRole } = require("../Middlewares/role.middlewares");
var userRouter =express.Router();

userRouter.post("/createuser", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/getuser",isLoggedIn, getUsers);
userRouter.post("/delete",isLoggedIn, authorizeRole("ADMIN"), deleteUser);
userRouter.post("/getuser/:id", getUserById);
userRouter.patch("/subscribeUser", isLoggedIn, subscribeUser);


module.exports = {userRouter};


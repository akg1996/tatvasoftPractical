const express = require("express");
const Router = express.Router();
const {isEmailExist, login, testRoute, addUser, fetchUsers} = require('./routes/userRoute')

Router.get("/", testRoute);
Router.get("/fetch-users", fetchUsers);
Router.post("/add-user",isEmailExist, addUser);
Router.post("/login", login);

module.exports = Router;

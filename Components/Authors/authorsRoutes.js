const express = require("express");
const { registerAuthor, loginAuthor } = require("./authoursController");

const authorsRouter = express.Router();

authorsRouter.route("/register").post(registerAuthor);
authorsRouter.route("/login").post(loginAuthor);
module.exports = authorsRouter;

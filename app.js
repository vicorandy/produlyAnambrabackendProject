/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const authorsRouter = require("./Components/Authors/authorsRoutes");
const blogRouter = require("./Components/Blogs/blogRoutes");

const app = express();
app.use(express.json());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per wiondowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/authors", authorsRouter);
app.use("/blogs", blogRouter);
module.exports = app;

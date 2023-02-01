const express = require("express");
const authenticateAuthor = require("../../MiddleWare/authenticationMiddleware");
const {
  createBlog,
  findAllBlogs,
  findSingleBlog,
  findAuthorBlogs,
  deleteBlog,
  fetchAllFeatures,
  addToFeatures,
  removeFromFeatures,
} = require("./blogContoller");

const blogRouter = express.Router();

blogRouter.route("/createBlog").post(authenticateAuthor, createBlog);
blogRouter.route("/authorblogs").get(authenticateAuthor, findAuthorBlogs);
blogRouter.route("/feature").get(fetchAllFeatures);
blogRouter.route("/:id").get(findSingleBlog);
blogRouter.route("/pages/:page").get(findAllBlogs);
blogRouter.route("/:id").delete(deleteBlog);
blogRouter.route("/addfeature/:id").patch(addToFeatures);
blogRouter.route("/removefeature/:id").patch(removeFromFeatures);

module.exports = blogRouter;

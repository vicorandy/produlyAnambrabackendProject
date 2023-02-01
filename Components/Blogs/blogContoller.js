const Blog = require("./blogModel");

async function createBlog(req, res) {
  try {
    const { authorName, authorId } = req.user;
    const { blog } = req.body;

    if (!blog) {
      res.status(404);
      res.json({ message: "please add a blog to your request", ok: false });
      return;
    }

    const blogPost = await Blog.create({ authorId, authorName, blog });
    res.json({ blogPost, ok: true });
  } catch (error) {
    console.log(error);
  }
}

async function findSingleBlog(req, res) {
  try {
    const { id } = req.params;

    const blog = await Blog.findById({ _id: id });

    if (!blog) {
      res.status(404);
      res.json({ Message: `no blog found with the id ${id}` });
      return;
    }
    res.status(200);
    res.json({ blog });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404);
      res.json({ message: "no blog with the id", ok: false });
    }
  }
}
async function findAuthorBlogs(req, res) {
  try {
    const { authorId } = req.user;
    const data = await Blog.find({ authorId });
    res.status(200);
    res.json({ data, ok: true });
  } catch (error) {
    console.log(error);
  }
}
async function findAllBlogs(req, res) {
  try {
    const perPage = 6;
    const page = req.params.page - 1;
    const count = await Blog.find().count();

    const blogs = await Blog.find()
      .limit(perPage)
      .skip(perPage * page);
    res.status(200);
    res.json({ blogs, count });
  } catch (error) {
    console.log(error);
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findOneAndDelete({ _id: id });
    if (blog === null) {
      res.status(404);
      res.json({ message: `there is no blog with the id: ${id}` });
      return;
    }
    res.send({ message: "your blog was successfully deleted", ok: true });
  } catch (error) {
    console.log(error);
  }
}

async function fetchAllFeatures(req, res) {
  try {
    const featureBlogs = await Blog.find({ feature: true });
    res.status(200);
    res.json({ featureBlogs });
  } catch (error) {
    console.log(error);
  }
}
async function removeFromFeatures(req, res) {
  const { id } = req.params;
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    { feature: false },
    {
      new: true,
    }
  );
  if (!blog) {
    res.status(404);
    res.json({ message: `there is no blog with the id ${id}` });
  }
  res.status(200);
  res.json({ blog });
}
async function addToFeatures(req, res) {
  const { id } = req.params;

  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    { feature: true },
    {
      new: true,
    }
  );
  console.log(blog);
  if (!blog) {
    res.status(404);
    res.json({ message: `there is no blog with the id ${id}` });
  }
  res.status(200);
  res.json({ blog });
}

module.exports = {
  createBlog,
  findAllBlogs,
  findSingleBlog,
  deleteBlog,
  findAuthorBlogs,
  fetchAllFeatures,
  addToFeatures,
  removeFromFeatures,
};

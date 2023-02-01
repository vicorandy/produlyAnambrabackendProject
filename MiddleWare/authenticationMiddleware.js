const jwt = require("jsonwebtoken");

const authenticateAuthor = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400);
      res.json({ message: "no token provided" });
      return;
    }
    const token = authHeader.split(" ")[1];

    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    const { authorName, authorId } = payLoad;
    req.user = { authorName, authorId };
    next();
  } catch (error) {
    if (error.name === "jsonwebtokenError") {
      res.status(400);
      res.json({ message: "invalid author token" });
    }
  }
};

module.exports = authenticateAuthor;
